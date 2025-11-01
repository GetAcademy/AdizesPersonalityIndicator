var STORAGE_KEY = "adizesBackupV2";

function saveBackup() {
  try {
    var state = {
      currentIndex: model && model.appState ? model.appState.currentIndex : 0,
      answers: model && model.appState && Array.isArray(model.appState.answers)
        ? model.appState.answers : []
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Ignorer lagringsfeil (privat modus o.l.)
  }
}

function deleteBackup() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

function readBackup() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    var obj = JSON.parse(raw);
    if (!obj || typeof obj.currentIndex !== "number" || !Array.isArray(obj.answers)) return null;
    return obj;
  } catch (e) {
    return null;
  }
}

// Registrer svar og flytt telleren til neste spørsmål. Tar backup.
function registerAnswer(questionIndex, answerIndex /* 0 eller 1 */) {
  if (!model || !model.appState) {
    throw new Error("Global 'model.appState' mangler.");
  }
  if (answerIndex !== 0 && answerIndex !== 1) {
    throw new Error("answerIndex må være 0 eller 1");
  }
  if (typeof questionIndex !== "number" || questionIndex < 0) {
    throw new Error("questionIndex må være et ikke-negativt tall");
  }

  // Sett svaret
  if (!Array.isArray(model.appState.answers)) model.appState.answers = [];
  model.appState.answers[questionIndex] = answerIndex;

  // Flytt videre til neste spørsmål
  var next = questionIndex + 1;
  if (typeof model.appState.currentIndex !== "number" || model.appState.currentIndex < next) {
    model.appState.currentIndex = next;
  }

  // Backup og re-render
  saveBackup();
  if (typeof render === "function") render();
}

// Gå tilbake ett spørsmål (min 0). Tar ny backup og re-render.
function back() {
  if (!model || !model.appState) {
    throw new Error("Global 'model.appState' mangler.");
  }
  var ci = Number(model.appState.currentIndex) || 0;
  model.appState.currentIndex = ci > 0 ? ci - 1 : 0;
  saveBackup();
  if (typeof render === "function") render();
}

// Slett alt og start på nytt (tøm svar, sett teller=0). Sletter backup. Re-render.
function restart() {
  if (!model) {
    throw new Error("Global 'model' mangler.");
  }
  model.appState = { currentIndex: 0, answers: [] };
  deleteBackup();
  if (typeof render === "function") render();
}

// Sjekk om det finnes backup i localStorage med minst ett svar
function hasBackupWithAnwers() { // følger ønsket stavemåte
  var b = readBackup();
  if (!b) return false;
  return b.answers.some(function (v) { return v === 0 || v === 1; });
}
