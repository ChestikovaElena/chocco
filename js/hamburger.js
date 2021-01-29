const hamburgerElement = document.querySelector("#hamburger");

hamburgerElement.addEventListener("click", () => {
  const overlayElement = document.querySelector("#overlay");

  hamburgerElement.classList.toggle("hamburger--active");
  overlayElement.classList.toggle("overlay--active");
})