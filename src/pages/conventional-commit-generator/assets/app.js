const elType = document.getElementById("type");
const elScope = document.getElementById("scope");
const elGitmoji = document.getElementById("gitmoji");
const elGitmojis = document.getElementById("gitmojis");
const elDescription = document.getElementById("description");
const elOutput = document.getElementById("output");
const elCopy = document.getElementById("copy");
const elCopyCommit = document.getElementById("copy-commit");

const commitTypes = Object.freeze([
  {
    type: "feat",
    category: "Features",
    description: "A new feature",
  },
  {
    type: "fix",
    category: "Bug Fixes",
    description: "A bug fix",
  },
  {
    type: "docs",
    category: "Documentation",
    description: "Documentation only changes",
  },
  {
    type: "style",
    category: "Styles",
    description:
      "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)",
  },
  {
    type: "refactor",
    category: "Code Refactoring",
    description: "A code change that neither fixes a bug nor adds a feature",
  },
  {
    type: "perf",
    category: "Performance Improvements",
    description: "A code change that improves performance",
  },
  {
    type: "test",
    category: "Tests",
    description: "Adding missing tests or correcting existing tests",
  },
  {
    type: "build",
    category: "Build System",
    description:
      "Changes that affect the build system or external dependencies",
  },
  {
    type: "ci",
    category: "Continuous Integration",
    description: "Changes to our CI configuration files and scripts",
  },
  {
    type: "chore",
    category: "Chores",
    description: "Other changes that don't modify src or test files",
  },
  {
    type: "revert",
    category: "Reverts",
    description: "Reverts a previous commit",
  },
]);

for (const { type, category, description } of commitTypes) {
  const elTypeOption = document.createElement("option");
  elTypeOption.textContent = `${type}: ${category} (${description})`;
  elTypeOption.value = type;
  elType.append(elTypeOption);
}

async function fetchGitmoji() {
  const url =
    "https://raw.githubusercontent.com/carloscuesta/gitmoji/1e96bea76777bdc9a99842d61b013d990efd2d17/packages/gitmojis/src/gitmojis.json";
  const response = await (await fetch(url)).json();
  return response;
}

fetchGitmoji().then(({ gitmojis }) => {
  for (const { emoji, description } of gitmojis) {
    const elGitmojiOption = document.createElement("option");
    elGitmojiOption.textContent = `${description}`;
    elGitmojiOption.value = emoji;
    elGitmojis.append(elGitmojiOption);
  }
});

function updateOutput() {
  const type = elType.value;
  const scope = elScope.value;
  const gitmoji = elGitmoji.value;
  const description = elDescription.value;

  // prettier-ignore
  elOutput.textContent = `${type}${ !!scope ? `(${scope})` : ""}: ${gitmoji} ${description}`;
}

elType.oninput = updateOutput;
elScope.oninput = updateOutput;
elGitmoji.oninput = updateOutput;
elDescription.oninput = updateOutput;

elCopy.onclick = () => {
  navigator.clipboard
    .writeText(elOutput.textContent)
    .then(() => {
      toast.success("📋 Successfully copied commit message to clipboard");
    })
    .catch((error) => {
      toast.error(`❌ Failed to copy to clipboard: ${error}`);
    });
};

elCopyCommit.onclick = () => {
  const commitCmd = `git commit -m "${elOutput.textContent}"`;
  navigator.clipboard
    .writeText(commitCmd)
    .then(() => {
      toast.success("📋 Successfully copied commit command to clipboard");
    })
    .catch((error) => {
      toast.error(`❌ Failed to copy to clipboard: ${error}`);
    });
};
