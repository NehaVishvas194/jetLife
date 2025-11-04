// filter>booking page
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

function toggleCollapse(header) {
  const icon = header.querySelector(".toggle-icon");
  const content = header.nextElementSibling;

  icon.classList.toggle("rotate");

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

function setupDropdown(dropdownId, buttonId) {
  const dropdown = document.getElementById(dropdownId);
  const button = document.getElementById(buttonId);

  button.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

  dropdown.querySelectorAll(".dropdown-menu li").forEach((option) => {
    option.addEventListener("click", () => {
      button.textContent = option.textContent;
      dropdown
        .querySelectorAll(".dropdown-menu li")
        .forEach((div) => div.classList.remove("active"));
      option.classList.add("active");
      dropdown.classList.remove("open");
    });
  });
}

setupDropdown("filterDropdown", "filterBtn");
setupDropdown("sortDropdown", "sortBtn");
