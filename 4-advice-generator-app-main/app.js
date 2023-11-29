const adviceID = document.getElementById("id");
const adviceEl = document.querySelector(".advice");
const diceWrapper = document.querySelector(".dice-wrapper");
const dice = document.querySelector(".dice");

const fetchAdvice = async () => {
  dice.classList.add("spin");

  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const { slip } = await response.json();
    return slip;
  } catch (error) {
    console.log("Error fetching advice : ", error);
  }
};

const showAdvice = async () => {
  const slip = await fetchAdvice();

  adviceID.textContent = slip.id;
  adviceEl.innerHTML = `"${slip.advice}"`;
  dice.classList.remove("spin");
};

diceWrapper.addEventListener("click", showAdvice);
