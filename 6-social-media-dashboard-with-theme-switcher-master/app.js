const switchInput = document.getElementById("themeSwitch");
switchInput.addEventListener("click", () => {
  let isChecked = switchInput.getAttribute("checked");
  if (isChecked === "true") {
    document.getElementById("switcher-id").href = "./themes/light.css";
    switchInput.setAttribute("checked", false);
  } else if (isChecked === "false") {
    document.getElementById("switcher-id").href = "./themes/dark.css";
    switchInput.setAttribute("checked", true);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let isChecked = switchInput.getAttribute("checked");
  if (isChecked === true) {
    switchInput.setAttribute("checked", true);
    document.querySelector(" input:checked+.slider:before").style =
      "transform: translateX(145%)";
  }
});
