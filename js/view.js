// view.js

function _fmt(ts) {
  if (!ts) return "ukjent tidspunkt";
  try {
    return new Date(ts).toLocaleString('no-NO');
  } catch(e) {
    return ts;
  }
}

// Vises først når man laster siden
function renderStart() {
  const app = document.getElementById("app");
  const hasBackup = hasBackupWithAnwers();

  let html = `
    <h1>Adizes personlighetstest</h1>
    <p>Testen måler fire roller i Adizes-modellen: Produsent (P), Administrator (A), Entreprenør (E) og Integrator (I).</p>
    <p>For hvert spørsmål velger du mellom to utsagn som passer best.</p>
    <div style="text-align:center;margin-top:2rem;">
      <button onclick="startNewTest()">Start ny test</button>
  `;

  if (hasBackup) {
    const backup = readBackup();
    const answeredCount = backup.answers.filter(v => v === 0 || v === 1).length;
    const total = model.questions.length;
    const allAnswered = answeredCount >= total && backup.answers.every(v => v === 0 || v === 1);
    const lastTs = backup.completedAt || backup.lastAnsweredAt;

    if (allAnswered) {
      // Gå rett til resultat
      model.appState = {
        currentIndex: total,
        answers: backup.answers || [],
        lastAnsweredAt: backup.lastAnsweredAt,
        completedAt: backup.completedAt
      };
      render();
      return;
    } else {
      html += `<button onclick="continueTest()">Fortsett der du slapp</button>`;
      html += `<p style="margin-top:1rem;">Du har besvart <b>${answeredCount}</b> av <b>${total}</b> spørsmål. Siste svar: <b>${_fmt(lastTs)}</b>.</p>`;
    }
  }

  html += `</div>`;
  app.innerHTML = html;
}

function startNewTest() {
  restart();
  render();
}

function continueTest() {
  const backup = readBackup();
  if (!backup) {
    renderStart();
    return;
  }
  model.appState = {
    currentIndex: backup.currentIndex || 0,
    answers: backup.answers || [],
    lastAnsweredAt: backup.lastAnsweredAt,
    completedAt: backup.completedAt
  };

  // Finn første ubesvarte spørsmål
  const q = model.questions;
  const a = model.appState.answers;
  const firstUnanswered = a.findIndex(v => v !== 0 && v !== 1);
  model.appState.currentIndex = firstUnanswered >= 0 ? firstUnanswered : q.length;

  render();
}

// Hoved-render (spørsmål eller oppsummering)
function render() {
  const app = document.getElementById("app");
  const q = model.questions;
  const s = model.appState;

  if (!q || !s) {
    app.innerHTML = "<p>Modellen mangler nødvendig data.</p>";
    return;
  }

  // Ferdig – vis oppsummering per gruppe + ChatGPT-prompt
  if (s.answers.length >= q.length && s.answers.every(a => a === 0 || a === 1)) {
    app.innerHTML = renderSummaryByGroup();
    return;
  }

  const i = s.currentIndex || 0;
  const question = q[i];
  if (!question) {
    app.innerHTML = renderSummaryByGroup();
    return;
  }

  app.innerHTML = `
    <h1>Adizes personlighetstest</h1>
    <h3>Spørsmål ${i + 1} av ${q.length}</h3>
    <p>${question.text}</p>
    <div class="options">
      <div class="option" onclick="registerAnswer(${i},0)">
        ${question.options[0].text}
      </div>
      <div class="option" onclick="registerAnswer(${i},1)">
        ${question.options[1].text}
      </div>
    </div>
    <div style="text-align:center;">
      ${i > 0 ? `<button onclick="back()">Tilbake</button>` : ""}
      <button onclick="restart()">Start på nytt</button>
    </div>
  `;
}

// ---- Oppsummering per gruppe ----

function _scoreFor(questions, answers, groupFilter) {
  const sum = { P: 0, A: 0, E: 0, I: 0, total: 0 };
  questions.forEach((q, idx) => {
    if (groupFilter != null && String(q.group) !== String(groupFilter)) return;
    const ans = answers[idx];
    if (ans === 0 || ans === 1) {
      const t = q.options[ans].trait;
      if (sum.hasOwnProperty(t)) {
        sum[t]++;
        sum.total++;
      }
    }
  });
  return sum;
}

function _rank(score) {
  return Object.entries({ P: score.P, A: score.A, E: score.E, I: score.I })
    .sort((a,b)=>b[1]-a[1]);
}

function _desc(trait) {
  const d = {
    P: "<b>Produsent</b>: Handlingsorientert, effektiv, leverer resultater. Risiko: kan bli utålmodig, overkjøre prosess og mennesker.",
    A: "<b>Administrator</b>: Struktur, kvalitet og forutsigbarhet. Risiko: kan bli rigid, detaljstyrende og treg i endring.",
    E: "<b>Entreprenør</b>: Idéskapende, mulighetsorientert, tar initiativ. Risiko: kan bli utålmodig med drift og oppfølging.",
    I: "<b>Integrator</b>: Relasjonsbygger, samler laget, skaper psykologisk trygghet. Risiko: kan unngå nødvendig konfrontasjon."
  };
  return d[trait] || "";
}

function renderSummaryByGroup() {
  const q = model.questions;
  const a = model.appState.answers;

  const g1 = _scoreFor(q, a, 1); // Meg på jobben
  const g2 = _scoreFor(q, a, 2); // Der jeg kan være meg selv
  const all = _scoreFor(q, a, null);

  const r1 = _rank(g1);
  const r2 = _rank(g2);

  const labels = {
    1: "Meg på jobben (der andre har forventninger)",
    2: "Der jeg kan være meg selv (uten forventninger)"
  };

  function block(title, score, rank) {
    const total = score.total || 1;
    return `
      <section class="summary">
        <h2>${title}</h2>
        ${rank.map(([t, v]) => {
          const p = Math.round(100 * v / total);
          return `<div class="trait-result">${model.traitDescriptions[t]}: ${v} poeng (${p}%)</div>`;
        }).join("")}
        ${rank[0] ? `<p>${_desc(rank[0][0])}</p>` : ""}
      </section>
    `;
  }

  // Bygg prompt til ChatGPT
  const payload = buildResultsPayloadForAI();
  const prompt = buildPromptFromResults(payload);
  const finishedTs = model.appState.completedAt || model.appState.lastAnsweredAt;

  return `
    <h1>Resultat</h1>
    <p>Totalt besvart: <b>${all.total}</b> av <b>${q.length}</b>. ${finishedTs ? `Siste fullførte svar: <b>${_fmt(finishedTs)}</b>` : ""}</p>
    <div class="grid-2">
      ${block(labels[1], g1, r1)}
      ${block(labels[2], g2, r2)}
    </div>
    <section style="margin-top:1.25rem;">
      <h2>ChatGPT-tolkning</h2>
      <p>Klikk for å kopiere prompten og åpne ChatGPT. Lim inn og trykk Enter.</p>
      <textarea readonly style="width:100%;height:220px;padding:0.75rem;border-radius:8px;border:1px solid #ccc;">${prompt.replace(/</g,"&lt;")}</textarea>
      <div style="text-align:center;margin-top:0.75rem;">
        <button onclick="copyPromptAndOpen(document.querySelector('textarea').value)">Kopier & åpne ChatGPT</button>
      </div>
    </section>
    <div style="text-align:center;margin-top:1rem;">
      <button onclick="restart()">Ta testen på nytt</button>
    </div>
  `;
}
