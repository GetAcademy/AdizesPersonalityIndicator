// ai.js
// Første versjon uten API: vi genererer en ChatGPT-prompt basert på resultatene.
// Brukeren kan kopiere og åpne ChatGPT i ny fane for å lime inn prompten.
//
// Globale funksjoner som brukes av view.js:
// - buildResultsPayloadForAI()
// - buildPromptFromResults(payload)
// - copyPromptAndOpen(prompt)

function _rankForAI(score) {
  return Object.entries({ P: score.P, A: score.A, E: score.E, I: score.I })
    .sort((a,b)=>b[1]-a[1])
    .map(([t]) => t);
}

function buildResultsPayloadForAI() {
  const q = model.questions;
  const a = model.appState.answers;

  function scoreFor(groupFilter) {
    const sum = { P: 0, A: 0, E: 0, I: 0, total: 0 };
    q.forEach((qq, idx) => {
      if (groupFilter != null && String(qq.group) !== String(groupFilter)) return;
      const ans = a[idx];
      if (ans === 0 || ans === 1) {
        const t = qq.options[ans].trait;
        if (sum.hasOwnProperty(t)) {
          sum[t]++; sum.total++;
        }
      }
    });
    return sum;
  }

  const g1 = scoreFor(1);
  const g2 = scoreFor(2);

  return {
    groups: { "1": g1, "2": g2 },
    ranking: { "1": _rankForAI(g1), "2": _rankForAI(g2) },
    labels: {
      "1": "Meg på jobben (der andre har forventninger)",
      "2": "Der jeg kan være meg selv (uten forventninger)"
    },
    traitDescriptions: model.traitDescriptions
  };
}

function buildPromptFromResults(payload) {
  const g1 = payload.groups["1"];
  const g2 = payload.groups["2"];
  const order1 = payload.ranking["1"].map(t => payload.traitDescriptions[t]).join(" > ");
  const order2 = payload.ranking["2"].map(t => payload.traitDescriptions[t]).join(" > ");

  return `Du er en erfaren organisasjonspsykolog som bruker Adizes-modellen (P/A/E/I).
Lag en kort, personlig tolkning basert på disse resultatene. Skriv på norsk, profesjonelt og varmt.
Bruk overskrifter og punktlister der det passer. 200–350 ord totalt.

Rammer for tolkning:
- Det finnes TO grupper og dermed to analyser som skal skrives separat.
- Gruppe 1 = "Meg på jobben (der andre har forventninger)"
- Gruppe 2 = "Der jeg kan være meg selv (uten forventninger)"
- For hver gruppe: presenter rekkefølgen fra mest til minst dominerende, gi styrker for topp-trekket,
  potensielle overslag når det blir for dominerende, og pek på det minst dominerende trekket som
  et utviklingsområde (med konkrete ferdigheter man kan øve på).
- Avslutt med en kort SAMMENLIGNING av gruppe 1 vs gruppe 2 (grad av samsvar/avvik og mulige konsekvenser).

Resultater (poeng = antall valgte utsagn som peker på trekket):
Gruppe 1 – Meg på jobben
- Produsent (P): ${g1.P}
- Administrator (A): ${g1.A}
- Entreprenør (E): ${g1.E}
- Integrator (I): ${g1.I}
- Total besvart i gruppe 1: ${g1.total}
- Rekkefølge: ${order1}

Gruppe 2 – Der jeg kan være meg selv
- Produsent (P): ${g2.P}
- Administrator (A): ${g2.A}
- Entreprenør (E): ${g2.E}
- Integrator (I): ${g2.I}
- Total besvart i gruppe 2: ${g2.total}
- Rekkefølge: ${order2}`;
}

function copyPromptAndOpen(prompt) {
  if (!prompt) return;
  navigator.clipboard.writeText(prompt).then(function() {
    // Åpne ChatGPT i ny fane. Bruker limer inn selv.
    window.open("https://chat.openai.com", "_blank");
    //alert("Prompten er kopiert. Lim den inn i ChatGPT-vinduet og trykk Enter.");
  }).catch(function() {
    // Fallback: vis prompten i en prompt-boks (ikke ideelt, men bedre enn ingenting)
    const ok = confirm("Klarte ikke kopiere automatisk. Vil du åpne ChatGPT nå? Du kan kopiere og lime inn manuelt.");
    if (ok) window.open("https://chat.openai.com", "_blank");
  });
}
