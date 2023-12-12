const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const slideImageContainer = document.querySelector(
  ".hero-image-and-navigation"
);

let current = 0;
const showNextSlide = () => {
  current++;
  slideImageContainer.style.backgroundImage = `url(images/desktop-image-hero-${current}.jpg)`;

  if (current >= 3) current = 0;
};

const showPrevSlide = () => {
  current--;
  slideImageContainer.style.backgroundImage = `url(images/desktop-image-hero-${current}.jpg)`;

  //   if (current <= 1) current = 4;
};

// setInterval(showNextSlide, 6000);
nextBtn.addEventListener("click", showNextSlide);
// prevBtn.addEventListener("click", showPrevSlide);
