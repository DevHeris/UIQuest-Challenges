const switchInput = document.getElementById("themeSwitch");

// let style = localStorage.getItem("style");

// if (style == null) {
//   setTheme("light");
// } else {
//   setTheme(style);
// }

// function setTheme(theme) {
//   if (theme == "light") {
//     document.getElementById("switcher-id").href = "./themes/light.css";
//   } else if (theme == "dark") {
//     document.getElementById("switcher-id").href = "./themes/dark.css";
//   }

//   localStorage.setItem("style", theme);
// }

// switchInput.addEventListener("click", () => {
//   if (style == null) {
//     setTheme("light");
//   } else {
//     setTheme(style);
//   }
// });

// document.addEventListener('DOMContentLoaded',()=>{

// })

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
  // document.querySelector(" input:checked+.slider:before").style =
  //   "transform: translateX(145%)";
  let isChecked = switchInput.getAttribute("checked");
  if (isChecked === true) {
    switchInput.setAttribute("checked", true);
    document.querySelector(" input:checked+.slider:before").style =
      "transform: translateX(145%)";
  }
});
