const elInput = document.getElementById("input");
const elOutput = document.getElementById("output");

elInput.oninput = (e) => {
  let value = e.target.value;
  value = value.split("\n");
  value = value.filter((line) => !line.startsWith("//"));
  value = value.map((line) => line.split("//")[0]);
  value = value.map((line) => line.replace(/\/\*[\s\S]*?\*\//g, ""));
  value = value.map((line) => line.replace(/\/\/[^\n]*\n/, ""));
  value = value.join("\n");
  elOutput.innerText = value;
};
