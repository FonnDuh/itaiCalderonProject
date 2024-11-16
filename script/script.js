const topTop = document.querySelector(".to-top"),
  scrollContainer = () => {
    return document.documentElement || document.body;
  };

if (window.location.pathname.endsWith("index.html")) {
  document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > 120) {
      topTop.classList.remove("hidden");
    } else {
      topTop.classList.add("hidden");
    }
  });
  (function () {
    emailjs.init("WW9nXm0FlOZqhUIDI");
  })();
  document.getElementById("new-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formElement = document.getElementById("new-form"),
      feedbackMessageElement = document.getElementById("feedback-msg");

    feedbackMessageElement.classList.remove("success-message", "error-message");
    feedbackMessageElement.textContent = "שולח...";

    feedbackMessageElement.style.display = "block";

    emailjs.sendForm("service_zjypz7f", "template_y6hue9a", formElement).then(
      (response) => {
        feedbackMessageElement.classList.add("success-message");
        feedbackMessageElement.textContent = "ההודעה נשלחה בהצלחה!";

        setTimeout(() => {
          feedbackMessageElement.style.display = "none";
        }, 5000);

        formElement.reset();
        console.log("SUCCESS!", response);
      },
      (error) => {
        feedbackMessageElement.classList.add("error-message");
        feedbackMessageElement.textContent = "נראה שמשהו השתבש, אנא נסה שנית.";

        setTimeout(() => {
          feedbackMessageElement.style.display = "none";
        }, 5000);

        console.log("FAILURE...", error);
      }
    );
  });
}

document.querySelectorAll(".projectLink").forEach((button) => {
  button.addEventListener("click", function () {
    window.location.href = `landing_Page.html?name=${encodeURIComponent(
      this.getAttribute("data-name")
    )}&brief=${encodeURIComponent(
      this.getAttribute("data-brief")
    )}&image=${encodeURIComponent(
      this.getAttribute("data-image")
    )}&link=${encodeURIComponent(
      this.getAttribute("data-link")
    )}&zip=${encodeURIComponent(
      this.getAttribute("data-zip")
    )}&lang=${encodeURIComponent(this.getAttribute("data-lang"))}`;
  });
});

function getQueryParams() {
  const params = {},
    pairs = window.location.search.substring(1).split("&");
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
    projectLang = params.lang ? params.lang.split(",") : [];

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
