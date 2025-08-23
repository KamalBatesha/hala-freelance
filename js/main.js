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

  window.addEventListener("resize", () => {
    updateSlider();
    gelaryUi("all");
  });
updateSlider();
  

// gelary

const gelary = [
  {
    id: 1,
    category: "app",
    img: "./assets/app.jpg",
    title: "App",
    titleAR: "تطبيق",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    textAR: "لوريم ايبسوم دولار سيت أميت",
  },
  {
    id: 2,
    category: "Web",
    img: "./assets/website.jpg",
    title: "Website",
    titleAR: "موقع ويب",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    textAR: "لوريم ايبسوم دولار سيت أميت",
    tags: ["HTML", "Css", "Js"]
  },
  {
    id: 3,
    category: "software",
    img: "./assets/software.jpg",
    title: "Software",
    titleAR: "برنامج",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    textAR: "لوريم ايبسوم دولار سيت أميت",
  }
]

function gelaryUi(category) {
  let gelaryDom = document.getElementById("gelaryDom");
  let gelaryItems=[]
  if (category == "all") {
    gelaryItems = gelary
  }else{
    
    gelaryItems = gelary.filter((item) => item.category === category);
  }

  console.log(gelaryItems);
  
  gelaryDom.innerHTML = `
  ${gelaryItems.map((item,i) => {
    return `
    <div class="${`flex-1 md:max-w-[50%] lg:max-w-[33.33%]  opacity-80 hover:opacity-100 hover:scale-110 transition duration-400  ${window.innerWidth < 768 && i < 2 ? "text-[#FF8C00]" : "text-white"}`}">
    
            <img src="${item.img}" alt="labtop image" class="w-full object-cover object-center rounded-2xl h-[400px]">
            <h3 class="font-bold text-4xl mt-4">${lang == "EN" ? item.title : item.titleAR}</h3>
            <p class="text-lg font-light mt-3">${lang == "EN" ? item.text : item.textAR}</p>
            <div class="flex gap-2 items-center mt-4">
            ${item.tags ? item.tags.map((tag) => {
              return `
              <span class="block px-4 py-3 border border-white rounded-2xl text-white">${tag}</span>
              `
            }).join("") : ""}
            </div>
        </div>

    `
  }).join("")}
  `
}

gelaryUi("all")

const categoryBtnS=document.querySelectorAll("#gelaryCategory span")
categoryBtnS.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    gelaryUi(btn.getAttribute("category"))
    e.target.classList.add("text-[#FF8C00]")
    categoryBtnS.forEach((btn) => {
      if (btn !== e.target) {
        btn.classList.remove("text-[#FF8C00]")
      }
    })
  })
})