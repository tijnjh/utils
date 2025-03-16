const elInsertExampleTextButton = document.getElementById(
  "insertExampleTextButton",
);
const elSourceTextArea = document.getElementById("sourceTextArea");
const elAddLanguageButton = document.getElementById("addLanguageButton");
const elOutputLanguagesContainer = document.getElementById(
  "outputLanguagesContainer",
);
const elTranslationForm = document.getElementById("translationForm");

const TRANSLATE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto";

let outputLanguageCount = 0;

elInsertExampleTextButton.onclick = () => {
  elSourceTextArea.value = exampleText;
  updateTranslations();
};

function createOutputLanguage() {
  outputLanguageCount++;
  const elLanguageContainer = document.createElement("div");
  elLanguageContainer.className = "language-output-container";

  const elTranslationOutput = document.createElement("pre");
  elTranslationOutput.className = "translation-output";
  elTranslationOutput.textContent = "Translation will appear here";

  const elLanguageInput = document.createElement("input");
  elLanguageInput.type = "text";
  elLanguageInput.placeholder = "Language code";
  elLanguageInput.className = "language-code";

  elLanguageContainer.append(elTranslationOutput);
  elLanguageContainer.append(elLanguageInput);

  if (outputLanguageCount > 1) {
    const elDeleteButton = document.createElement("button");
    elDeleteButton.textContent = "Remove";
    elDeleteButton.onclick = () => {
      elLanguageContainer.remove();
    };
    elLanguageContainer.append(elDeleteButton);
  }

  elOutputLanguagesContainer.append(elLanguageContainer);
}

createOutputLanguage();

elAddLanguageButton.onclick = createOutputLanguage;

let typingTimer;

async function updateTranslations() {
  const languageInputs = document.querySelectorAll(".language-code");
  const translationOutputs = document.querySelectorAll(".translation-output");

  for (let i = 0; i < languageInputs.length; i++) {
    translationOutputs[i].textContent = await translateText(
      elSourceTextArea.value,
      languageInputs[i].value,
    );
  }
}

elSourceTextArea.onkeyup = () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(updateTranslations, 1000);
};

async function translateText(text, targetLang) {
  const url = `${TRANSLATE_URL}&tl=${targetLang}&q=${encodeURIComponent(text)}`;

  try {
    const response = await (await fetch(url)).json();
    return response[0]?.map((x) => x[0]).join("") || "Translation unavailable";
  } catch (error) {
    console.error("Error during translation:", error);
    return "Translation failed due to an error.";
  }
}

const exampleText =
  "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.";
