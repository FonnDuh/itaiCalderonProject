document.querySelectorAll(".projectLink").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.getAttribute("data-name"),
      brief = this.getAttribute("data-brief"),
      image = this.getAttribute("data-image"),
      link = this.getAttribute("data-link"),
      zip = this.getAttribute("data-zip");

    // Redirect to landing page with query parameters
    window.location.href = `landing_Page.html?name=${encodeURIComponent(
      name
    )}&brief=${encodeURIComponent(brief)}&image=${encodeURIComponent(
      image
    )}&link=${encodeURIComponent(link)}&zip=${encodeURIComponent(zip)}`;
  });
});

function getQueryParams() {
  const params = {},
    queryString = window.location.search.substring(1),
    pairs = queryString.split("&");
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
}

function displayProject() {
  const params = getQueryParams(),
    projectName = params.name || "שם פרוייקט",
    projectBriefing = params.brief || "תיאור פרוייקט",
    projectImage = params.image || "https://via.placeholder.com/500",
    projectLink = params.link || "#",
    projectZip = params.zip || "#";

  document.getElementById("project-name").innerText = projectName;
  document.getElementById("project-briefing").innerText = projectBriefing;
  document.getElementById("project-image").src = projectImage;
  document.getElementById("project-link").href = projectLink;
  document.getElementById("project-zip").href = "../../files/" + projectZip;
}
