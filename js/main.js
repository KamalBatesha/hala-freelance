const langToggle = document.getElementById("langToggle");
  const enBtn = document.getElementById("enBtn");
  const arBtn = document.getElementById("arBtn");

let lang = "EN"; // default
  console.log(langToggle);
  

  langToggle.addEventListener("click", () => {
    if (lang === "EN") {
      // Switch to AR
      enBtn.classList.remove("bg-orange-500", "text-white");
      enBtn.classList.add("text-orange-500");
      arBtn.classList.remove("text-orange-500");
      arBtn.classList.add("bg-orange-500", "text-white");
      lang = "AR";
    //   document.documentElement.setAttribute("dir", "rtl");
    } else {
      // Switch to EN
      arBtn.classList.remove("bg-orange-500", "text-white");
      arBtn.classList.add("text-orange-500");
      enBtn.classList.remove("text-orange-500");
      enBtn.classList.add("bg-orange-500", "text-white");
      lang = "EN";
    //   document.documentElement.setAttribute("dir", "ltr");
    }
  });


// slider
const wraper = document.getElementById("wraper");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsContainer = document.getElementById("dots");
  const slides = wraper.children;

  let currentIndex = 0;

  function getSlidesPerPage() {
    if (window.innerWidth < 768) return 1;  // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3;                               // desktop
  }

  function updateSlider() {
    const slidesPerPage = getSlidesPerPage();
    const totalPages = Math.ceil(slides.length / slidesPerPage);

    // shift by full page
    wraper.style.left = `${currentIndex * -100}%`;

    // update dots
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div");
      dot.className = `w-3 h-3 rounded-full cursor-pointer ${i === currentIndex ? "bg-orange-500" : "bg-gray-300"}`;
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener("click", () => {
    const slidesPerPage = getSlidesPerPage();
    const totalPages = Math.ceil(slides.length / slidesPerPage);
    currentIndex = (currentIndex - 1 + totalPages) % totalPages;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    const slidesPerPage = getSlidesPerPage();
    const totalPages = Math.ceil(slides.length / slidesPerPage);
    currentIndex = (currentIndex + 1) % totalPages;
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);
  updateSlider();