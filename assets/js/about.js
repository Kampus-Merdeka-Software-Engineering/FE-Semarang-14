// Slider
function handleScreenWidth() {
    const screenWidth = window.innerWidth;
    let slideInterval;
  
    if (screenWidth <= 768) {
      clearInterval(slideInterval);
      let currentSlide = 0;
  
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
  
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
      });
  
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
      });
  
      function showSlide(n) {
        const slides = document.querySelectorAll(".card");
  
        if (n < 0) {
          currentSlide = slides.length - 1;
        } else if (n >= slides.length) {
          currentSlide = 0;
        } else {
          currentSlide = n;
        }
  
        slides.forEach((slide, index) => {
          if (index === currentSlide) {
            slide.style.display = "block";
          } else {
            slide.style.display = "none";
          }
        });
      }
  
      window.addEventListener("load", showSlide(currentSlide));
      slideInterval = setInterval(() => {
        nextBtn.click();
      }, 5000);
    } else {
      clearInterval(slideInterval);
      const cards = document.querySelectorAll(".card");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const cardsPerPage = 3;
      let currentIndex = 0;
  
      function showCards() {
        cards.forEach((card, index) => {
          card.style.display = "none";
          const adjustedIndex =
            (index + cards.length - currentIndex) % cards.length;
          if (adjustedIndex >= 0 && adjustedIndex < cardsPerPage) {
            card.style.display = "block";
          }
        });
      }
  
      function goToNextPage() {
        currentIndex = (currentIndex + 3) % cards.length;
        showCards();
      }
  
      function goToPrevPage() {
        currentIndex = (currentIndex - 3 + cards.length) % cards.length;
        showCards();
      }
  
      nextBtn.addEventListener("click", goToNextPage);
      prevBtn.addEventListener("click", goToPrevPage);
  
      window.addEventListener("load", showCards());
      window.addEventListener("load", goToNextPage());
      window.addEventListener("load", goToPrevPage());
      slideInterval = setInterval(goToNextPage, 5000);
    }
  }
  
  window.addEventListener("resize", handleScreenWidth);
  
  handleScreenWidth();
  