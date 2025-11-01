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

  // Ferdig – vis oppsummering
  if (s.answers.length >= q.length && s.answers.every(a => a === 0 || a === 1)) {
    app.innerHTML = renderSummary();
    return;
  }

  const i = s.currentIndex || 0;
  const question = q[i];
  if (!question) {
    app.innerHTML = renderSummary();
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

function renderSummary() {
  const q = model.questions;
  const a = model.appState.answers;
  const traits = { P: 0, A: 0, E: 0, I: 0 };

  q.forEach((question, index) => {
    const ans = a[index];
    if (ans === 0 || ans === 1) {
      const t = question.options[ans].trait;
      if (traits.hasOwnProperty(t)) traits[t]++;
    }
  });

  const sorted = Object.entries(traits).sort((a, b) => b[1] - a[1]);
  const [topTrait] = sorted[0];
  const total = q.length;
  const answeredCount = a.filter(v => v === 0 || v === 1).length;
  const finishedTs = model.appState.completedAt || model.appState.lastAnsweredAt;

  const desc = {
    P: "<b>Produsent</b>: Handlingsorientert, praktisk, effektiv og fokusert på resultater. Trives med å få ting gjort og levere konkret verdi.",
    A: "<b>Administrator</b>: Strukturert, planmessig og opptatt av kvalitet, detaljer og regler. Sørger for at ting blir gjort riktig.",
    E: "<b>Entreprenør</b>: Kreativ, visjonær og idérik. Tenker nytt, ser muligheter og trives med endring og risiko.",
    I: "<b>Integrator</b>: Samarbeidsorientert, empatisk og sosial. Bygger relasjoner og sørger for samhold og trivsel i teamet."
  };

  let html = `
    <h1>Resultat</h1>
    <div class="summary">
      <p>Du har besvart <b>${answeredCount}</b> av <b>${total}</b> spørsmål.</p>
      ${finishedTs ? `<p>Sist fullførte svar: <b>${_fmt(finishedTs)}</b></p>` : ""}
      ${sorted.map(([t, val]) => {
        const percent = Math.round(100 * val / total);
        return `<div class="trait-result">${model.traitDescriptions[t]}: ${val} poeng (${percent}%)</div>`;
      }).join("")}
      <h2>Din mest fremtredende type er: ${model.traitDescriptions[topTrait]}</h2>
      <p>${desc[topTrait]}</p>
      <button onclick="restart()">Ta testen på nytt</button>
    </div>
  `;
  return html;
}
