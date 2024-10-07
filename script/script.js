const topTop = document.querySelector(".to-top"),
  showOnPx = 120,
  scrollContainer = () => {
    return document.documentElement || document.body;
  };

if (window.location.pathname.endsWith("index.html")) {
  document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > showOnPx) {
      topTop.classList.remove("hidden");
    } else {
      topTop.classList.add("hidden");
    }
  });
}

document.querySelectorAll(".projectLink").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.getAttribute("data-name"),
      brief = this.getAttribute("data-brief"),
      image = this.getAttribute("data-image"),
      link = this.getAttribute("data-link"),
      zip = this.getAttribute("data-zip"),
      lang = this.getAttribute("data-lang");

    window.location.href = `landing_Page.html?name=${encodeURIComponent(
      name
    )}&brief=${encodeURIComponent(brief)}&image=${encodeURIComponent(
      image
    )}&link=${encodeURIComponent(link)}&zip=${encodeURIComponent(
      zip
    )}&lang=${encodeURIComponent(lang)}`;
  });
});

function getQueryParams() {
  const params = {},
    queryString = window.location.search.substring(1),
    pairs = queryString.split("&");
  pairs.forEach((pair) => {
    let [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
}

function displayProject() {
  const params = getQueryParams(),
    projectName = params.name || "שם פרוייקט",
    projectBriefing = params.brief || "תיאור פרוייקט",
    projectImage = params.image || "https://via.placeholder.com/250",
    projectLink = params.link || "#",
    projectZip = params.zip || "#",
    projectLang = params.lang
      ? params.lang.split(",").map((lang) => lang.trim())
      : [];

  const nameElement = document.getElementById("project-name"),
    briefingElement = document.getElementById("project-briefing"),
    imageElement = document.getElementById("project-image"),
    linkElement = document.getElementById("project-link"),
    zipElement = document.getElementById("project-zip"),
    iconList = document.getElementById("iconList"),
    languageMap = {
      HTML: { img: "images/img-HTML.png", alt: "HTML Icon" },
      CSS: { img: "images/img-CSS.png", alt: "CSS Icon" },
      Bootstrap: { img: "images/img-Bootstrap.png", alt: "Bootstrap Icon" },
      SASS: { img: "images/img-SASS.png", alt: "SASS Icon" },
      JS: { img: "images/img-JS.png", alt: "Javascript Icon" },
      OOP: { img: "images/img-OOP.png", alt: "OOP Icon" },
      ES6: { img: "images/img-ES6.png", alt: "ES6 Icon" },
      TypeScript: {
        img: "images/img-TypeScript.png",
        alt: "TypeScript Icon",
      },
      API: { img: "images/img-API.png", alt: "API Icon" },
      React: { img: "images/img-React.png", alt: "React Icon" },
      NodeJS: { img: "images/img-NodeJS.png", alt: "NodeJS Icon" },
    };

  nameElement.innerText = projectName;
  briefingElement.innerText = projectBriefing;
  imageElement.src = projectImage;
  linkElement.href = projectLink;
  zipElement.href = "files/" + projectZip;

  projectLang.forEach((lang) => {
    if (languageMap[lang]) {
      let iconContainer = document.createElement("div");
      iconContainer.className = "icon-container";

      let img = document.createElement("img");
      img.src = languageMap[lang].img;
      img.alt = languageMap[lang].alt;

      iconContainer.appendChild(img);
      iconList.appendChild(iconContainer);
    } else {
      console.warn(`Language not found in map: ${lang}`);
    }
  });
}
