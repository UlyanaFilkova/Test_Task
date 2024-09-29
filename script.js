const images = document.querySelectorAll(".pdp__thumbnail img");

const lastIndex = 0;

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

const accordionItems = document.querySelectorAll('.customAccordion__item');

accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute('open');
      }
    });
  });
});