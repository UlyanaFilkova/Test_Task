// слайдер
const images = document.querySelectorAll(".pdp__thumbnail img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    const currentIndex = parseInt(image.getAttribute("data-index"));
    const carouselItems = document.querySelectorAll(".carousel__item");

    carouselItems[currentIndex].scrollIntoView({
      block: "nearest",
      inline: "center",
    });

    const indicators = document.querySelectorAll(".carousel__indicatorItem");
    indicators.forEach((indicator, i) => {
      if (i === currentIndex) {
        indicator.classList.add("carousel__indicatorItem--active");
      } else {
        indicator.classList.remove("carousel__indicatorItem--active");
      }
    });
  });

  image.addEventListener("mouseover", () => {
    const currentIndex = parseInt(image.getAttribute("data-index"));
    const carouselItems = document.querySelectorAll(".carousel__item");

    carouselItems[currentIndex].scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  });

  image.addEventListener("mouseout", () => {
    const activeIndicator = document.querySelector(
      ".carousel__indicatorItem--active"
    );
    const activeIndex = parseInt(activeIndicator.getAttribute("data-index"));
    const carouselItems = document.querySelectorAll(".carousel__item");

    carouselItems[activeIndex].scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  });
});

// список  информации об одежде
const accordionItems = document.querySelectorAll(".customAccordion__item");

accordionItems.forEach((item) => {
  item.addEventListener("click", () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute("open");
      }
    });
  });
});

// кнопки размера
const sizeSelectors = document.querySelectorAll(".js-sizeSelector");

sizeSelectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    sizeSelectors.forEach((otherSelector) => {
      otherSelector.classList.remove("pdp__size--clicked");
    });

    selector.classList.add("pdp__size--clicked");

    const selectedSizeDisplayValue = document.querySelector(
      ".js-selectedSizeDisplayValue"
    );
    selectedSizeDisplayValue.textContent =
      selector.querySelector("span").textContent;
  });
});

const carouselImages = document.querySelectorAll(".carousel__image");

carouselImages.forEach((image) => {
  image.addEventListener("mouseover", () => {
    image.style.cursor = "zoom-in";
    image.classList.add("zoomActive");
  });

  image.addEventListener("mouseout", () => {
    image.style.cursor = "default";
    image.classList.remove("zoomActive");
  });

  image.addEventListener("click", (event) => {
    if (image.classList.contains("zoomed")) {
      image.classList.remove("zoomed");
      image.style.cursor = "zoom-in";
    } else {
      image.classList.add("zoomed");
      image.style.cursor = "zoom-out";
    }
  });
});

const wishlistButton = document.querySelector(".pdp__wishlist");

wishlistButton.addEventListener("click", () => {
  const addText = wishlistButton.querySelector(".wishlistText--add");
  const removeText = wishlistButton.querySelector(".wishlistText--remove");

  if (addText.style.display === "none") {
    addText.style.display = "block";
    removeText.style.display = "none";
  } else {
    addText.style.display = "none";
    removeText.style.display = "block";
  }
});
