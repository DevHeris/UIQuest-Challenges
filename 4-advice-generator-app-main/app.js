// Get references to HTML elements
const adviceID = document.getElementById("id");
const adviceEl = document.querySelector(".advice");
const diceWrapper = document.querySelector(".dice");
const dice = document.querySelector(".dice");

// Define an asynchronous function to fetch advice from an API
const fetchAdvice = async () => {
  // Add a spinning animation to the dice element
  dice.classList.add("spin");

  try {
    // Make a GET request to the advice API
    const response = await fetch("https://api.adviceslip.com/advice");
    // Parse the JSON response
    const { slip } = await response.json();
    // Return the advice slip
    return slip;
  } catch (error) {
    // Log an error message if fetching advice fails
    console.log("Error fetching advice: ", error);
  }
};

// Define an asynchronous function to display advice
const showAdvice = async () => {
  // Call the fetchAdvice function to get an advice slip
  const slip = await fetchAdvice();

  // Update the content of HTML elements with the advice slip information
  adviceID.textContent = slip.id;
  adviceEl.innerHTML = `"${slip.advice}"`;

  // Remove the spinning animation from the dice element
  dice.classList.remove("spin");
};

// Add a click event listener to the diceWrapper element, triggering the showAdvice function
diceWrapper.addEventListener("click", showAdvice);