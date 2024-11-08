const countries = [],
  favorites =
    typeof Storage !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites")) || []
      : alert("Sorry, your browser does not support Web Storage...");
let showOnlyFavorites = false;

async function fetchCountries() {
  const countriesListContainer = document.getElementById("countriesList");
  countriesListContainer.innerHTML = "<p>Loading countries...</p>";
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    countries.push(...response.data);
    displayCountries(countries);
  } catch (error) {
    console.error("Error fetching country data: ", error);
    countriesListContainer.innerHTML =
      "<p>Error loading countries. Please try again later.</p>";
  }
}

function displayCountries(countriesList) {
  const countriesListContainer = document.getElementById("countriesList");
  countriesListContainer.innerHTML = "";

  if (countriesList.length === 0) {
    countriesListContainer.innerHTML =
      '<p class="no-results">No countries found.</p>';
    return;
  }

  countriesList.forEach((country) => {
    const countryCard = document.createElement("div"),
      isFavorite = favorites.some(
        (fav) => fav.name.common === country.name.common
      );
    countryCard.classList.add("col-md-4", "col-sm-6", "mb-4");

    const flag =
        country.flags?.[1] ||
        "https://via.placeholder.com/200?text=Flag+Not+Available",
      flagImg = `<img src="${flag}" alt="Flag of ${country.name.common}" class="card-img-top">`,
      countryName = country.name.common || "Unknown",
      officialName = country.name.official || "N/A",
      region = country.region || "N/A",
      subregion = country.subregion || "N/A",
      population = country.population
        ? country.population.toLocaleString()
        : "N/A",
      area = country.area || "N/A",
      languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A",
      currencies = country.currencies
        ? Object.values(country.currencies)
            .map((curr) => curr.name)
            .join(", ")
        : "N/A";

    countryCard.innerHTML = `
      <div class="card country-card">
        ${flagImg}
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">${countryName}</h5>
            <button class="favorite-button ${
              isFavorite ? "favorited" : ""
            }" onclick="event.stopPropagation(); toggleFavorite('${countryName}')">
              ${isFavorite ? "★" : "☆"}
            </button>
          </div>
          <p class="card-text"><strong>Official Name:</strong> ${officialName}</p>
          <p class="card-text"><strong>Region:</strong> ${region}</p>
          <p class="card-text"><strong>Subregion:</strong> ${subregion}</p>
          <p class="card-text"><strong>Population:</strong> ${population}</p>
          <p class="card-text"><strong>Area:</strong> ${area} km²</p>
          <p class="card-text"><strong>Languages:</strong> ${languages}</p>
          <p class="card-text"><strong>Currencies:</strong> ${currencies}</p>
        </div>
      </div>
    `;

    countryCard.addEventListener("click", () => {
      if (country) {
        openCountryModal(country);
      }
    });
    countriesListContainer.appendChild(countryCard);
  });
}

async function getBorderingCountries(borders) {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all"),
      countriesData = response.data,
      borderingCountries = borders.map((borderCode) => {
        let borderCountry = countriesData.find(
          (country) => country.cca3 === borderCode
        );
        return borderCountry ? borderCountry.name.common : null;
      });

    return borderingCountries.filter((country) => country !== null).join(", ");
  } catch (error) {
    console.error("Error fetching bordering countries: ", error);
    return "Error fetching borders";
  }
}

async function openCountryModal(country) {
  const borders =
      country.borders && country.borders.length > 0
        ? await getBorderingCountries(country.borders)
        : "No borders",
    capital = country.capital ? country.capital.join(", ") : "N/A",
    timezones = country.timezones ? country.timezones.join(", ") : "N/A",
    languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A",
    currencies = country.currencies
      ? Object.values(country.currencies)
          .map((curr) => `${curr.name} (${curr.symbol || ""})`)
          .join(", ")
      : "N/A",
    region = country.region || "N/A",
    subregion = country.subregion || "N/A",
    population = country.population
      ? country.population.toLocaleString()
      : "N/A",
    area = country.area ? country.area.toLocaleString() : "N/A",
    gini = country.gini && !isNaN(country.gini) ? `${country.gini}%` : "N/A",
    coatOfArmsURL = country.coatOfArms ? country.coatOfArms.png : null,
    coatOfArms = coatOfArmsURL
      ? `<img src="${coatOfArmsURL}" alt="Coat of Arms" class="img-fluid">`
      : "No coat of arms available",
    regionalBlocs =
      country.regionalBlocs && country.regionalBlocs.length > 0
        ? country.regionalBlocs.map((bloc) => bloc.name).join(", ")
        : "N/A",
    maps = country.maps ? country.maps.googleMaps : "No map available";

  document.getElementById("countryModalLabel").textContent =
    country.name?.common || "Country Details";

  document.getElementById("countryDetails").innerHTML = `
    <img src="${
      country.flags?.[1] ||
      "https://via.placeholder.com/200?text=Flag+Not+Available"
    }"
    alt="Flag of ${country.name?.common}" class="img-fluid mb-3">
    <p><strong>Official Name:</strong> ${country.name?.official || "N/A"}</p>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Subregion:</strong> ${subregion}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Area:</strong> ${area} km²</p>
    <p><strong>Languages:</strong> ${languages}</p>
    <p><strong>Currencies:</strong> ${currencies}</p>
    <p><strong>Timezone(s):</strong> ${timezones}</p>
    <p><strong>Borders:</strong> ${borders}</p>
    <p><strong>Gini Index:</strong> ${gini}</p>
    <p><strong>Regional Blocs:</strong> ${regionalBlocs}</p>
    <p><strong>Coat of Arms:</strong> ${coatOfArms}</p>
    <p><strong>Maps:</strong> <a href="${maps}" target="_blank">View on Google Maps</a></p>
    <button class="card-button" onclick="window.open('https://en.wikipedia.org/wiki/${
      country.name.common
    }', '_blank')">
      Learn More
    </button>`;

  new bootstrap.Modal(document.getElementById("countryModal")).show();
}

function showFavorites() {
  showOnlyFavorites = !showOnlyFavorites;
  document.getElementById("showFavoritesButton").textContent = showOnlyFavorites
    ? "Show All"
    : "Show Favorites";

  displayCountries(showOnlyFavorites ? favorites : countries);
}
function toggleFavorite(countryName) {
  const country = countries.find((c) => c.name.common === countryName),
    favoriteIndex = favorites.findIndex(
      (fav) => fav.name.common === countryName
    );

  if (favoriteIndex === -1) {
    favorites.push(country);
  } else {
    favorites.splice(favoriteIndex, 1);
  }

  typeof Storage !== "undefined"
    ? localStorage.setItem("favorites", JSON.stringify(favorites))
    : alert("Sorry, your browser does not support Web Storage...");

  displayCountries(countries);
}

function searchCountries() {
  const searchTerm = document
      .getElementById("searchInput")
      .value.trim()
      .toLowerCase(),
    filteredCountries = countries.filter(
      (country) =>
        country.name?.common.toLowerCase().includes(searchTerm) ||
        country.name?.official.toLowerCase().includes(searchTerm)
    );

  displayCountries(filteredCountries);
}

function sortCountries() {
  const sortedCountries = [...(showOnlyFavorites ? favorites : countries)];

  switch (document.getElementById("sortOptions").value) {
    case "name":
      sortedCountries.sort((a, b) =>
        (a.name?.common || "").localeCompare(b.name?.common || "")
      );
      break;
    case "population":
      sortedCountries.sort((a, b) => (b.population || 0) - (a.population || 0));
      break;
    case "area":
      sortedCountries.sort((a, b) => (b.area || 0) - (a.area || 0));
      break;
    case "region":
      sortedCountries.sort((a, b) =>
        (a.region || "").localeCompare(b.region || "")
      );
      break;
    case "languages":
      sortedCountries.sort((a, b) => {
        let languagesA = Object.values(a.languages || {}).join(", "),
          languagesB = Object.values(b.languages || {}).join(", ");
        return languagesA.localeCompare(languagesB);
      });
      break;
    case "currencies":
      sortedCountries.sort((a, b) => {
        let currenciesA = Object.values(a.currencies || {})
            .map((curr) => curr.name)
            .join(", "),
          currenciesB = Object.values(b.currencies || {})
            .map((curr) => curr.name)
            .join(", ");
        return currenciesA.localeCompare(currenciesB);
      });
      break;
    default:
      break;
  }
  displayCountries(sortedCountries);
}

fetchCountries();
