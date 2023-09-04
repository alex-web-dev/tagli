window.addEventListener("load", () => {
  /* Menu */
  const $menu = document.querySelector(".menu");
  if ($menu) {
    const $menuToggle = $menu.querySelector(".menu__toggle");
    $menuToggle.addEventListener("click", () => {
      if ($menu.classList.contains('menu--active')) {
        $menu.classList.remove("menu--active");
        unlockBody();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        $menu.classList.add("menu--active");
        lockBody();
      }
    });

    $menu.addEventListener("click", (e) => {
      if ($menu === e.target && $menu.classList.contains("menu--active")) {
        $menu.classList.remove("menu--active");
        unlockBody();
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu__content") || e.target.classList.contains("menu__link")) {
        $menu.classList.remove("menu--active");
        unlockBody();
      }
    });
  }

  /* Range field */
  const $priceFilters = document.querySelectorAll(".range-field");
  $priceFilters.forEach(($filter) => {
    const $slider = $filter.querySelector(".range-field__slider");

    const data = {
      min: +$slider.dataset.min,
      max: +$slider.dataset.max,
      start: +$slider.dataset.start,
      step: +$slider.dataset.step,
    };

    noUiSlider.create($slider, {
      start: data.start,
      connect: "lower",
      step: data.step,
      range: {
        min: data.min,
        max: data.max,
      },
      format: {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return parseInt(value);
        },
      },
    });

    const $input = $filter.querySelector(".range-field__input");
    $input?.addEventListener("blur", () => {
      $slider.noUiSlider.set($input.value);
    });

    $slider.noUiSlider.on("update", (values) => {
      $input.value = `${values[0]}`;
    });
  });

  /* Accordion */
  const $accordions = document.querySelectorAll(".accordion");
  $accordions.forEach(($accordion) => {
    const $btn = $accordion.querySelector(".accordion__btn");
    const $content = $accordion.querySelector(".accordion__content");
    const $main = $accordion.querySelector(".accordion__main");

    $btn.addEventListener("click", () => {
      if (!$accordion.classList.contains("accordion--active")) {
        $btn.classList.add("accordion__btn--active");
        $accordion.classList.add("accordion--activating");
        $content.style.height = `${$main.getBoundingClientRect().height}px`;
      } else {
        $btn.classList.remove("accordion__btn--active");
        $content.style.height = `${$content.scrollHeight}px`;
        $accordion.classList.add("accordion--activating");
        setTimeout(() => ($content.style.height = "0px"));
      }
    });

    $content.addEventListener("transitionend", () => {
      $accordion.classList.remove("accordion--activating");

      if (!$accordion.classList.contains("accordion--active")) {
        $content.setAttribute("style", "");
        $accordion.classList.add("accordion--active");
      } else {
        $accordion.classList.remove("accordion--active");
      }
    });
  });

  /* Smoothscroll */
  const $anchors = document.querySelectorAll('a[href*="#"]');
  $anchors.forEach(($anchor) => {
    $anchor.addEventListener("click", (e) => {
      const id = $anchor.getAttribute("href");

      if (id[0] === "#") {
        e.preventDefault();
      }

      if (id === "#") {
        return;
      }

      const $elem = document.querySelector(id);
      if ($elem) {
        const offsetTop = $elem.getBoundingClientRect().top;
        window.scrollBy({ top: offsetTop, left: 0, behavior: "smooth" });
      }
    });
  });

  /* Popup */
  /* Popup */
  const $openBtns = document.querySelectorAll(".js-open-popup");
  $openBtns.forEach(($btn) => {
    $btn.addEventListener("click", () => {
      const name = $btn.dataset.popupName;
      const $popup = document.querySelector(`.popup[data-name="${name}"`);
      if (!name || !$popup) {
        return;
      }

      $popup.classList.add("popup--show");
      setTimeout(() => {
        $popup.classList.add("popup--active");
      }, 20);
      lockBody();
    });
  });

  const $popups = document.querySelectorAll(".popup");
  $popups.forEach(($popup) => {
    const $body = $popup.querySelector(".popup__body");
    const $closeBtn = $popup.querySelector(".popup__close");
    $closeBtn.addEventListener("click", () => {
      $body.addEventListener(
        "transitionend",
        () => {
          unlockBody();
          $popup.classList.remove("popup--show");
        },
        { once: true }
      );

      $popup.classList.remove("popup--active");
    });

    $popup.addEventListener("click", (e) => {
      if ($popup === e.target || e.target.classList.contains("popup__dialog")) {
        $body.addEventListener(
          "transitionend",
          () => {
            unlockBody();
            $popup.classList.remove("popup--show");
          },
          { once: true }
        );

        $popup.classList.remove("popup--active");
      }
    });
  });

  /* IMask.js */
  const $inputs = document.querySelectorAll(".js-imask");
  $inputs.forEach(($input) => {
    const mask = $input.dataset.mask;
    IMask($input, { mask });
  });

  /* Tippy.js */
  const $labels = document.querySelectorAll(".js-tippy");
  $labels.forEach(($label) => {
    const offset = [+$label.dataset.tippyOffsetY || 0, +$label.dataset.tippyOffsetX || 0];
    const theme = $label.dataset.tippyTheme || "";
    const content = `<span class="tippy-label">${$label.dataset.tippyText}</span>`;
    const placement = $label.dataset.tippyPlacement || "right-end";
    const maxWidth = $label.dataset.tippyMaxWidth || 350;

    tippy($label, {
      content,
      placement,
      offset,
      theme,
      allowHTML: true,
      maxWidth,
    });
  });

  /* Make section */
  const $makeSections = document.querySelectorAll(".make");
  $makeSections.forEach(($makeSection) => {
    const $slider = $makeSection.querySelector(".make__slider");
    const $prevBtn = $makeSection.querySelector(".make__slider-prev");
    const $nextBtn = $makeSection.querySelector(".make__slider-next");

    new Swiper($slider, {
      enabled: true,
      slidesPerView: 1,
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      grid: {
        fill: "row",
        rows: 2,
      },
      spaceBetween: 20,
      navigation: {
        clickable: true,
        prevEl: $prevBtn,
        nextEl: $nextBtn,
      },
      breakpoints: {
        641: {
          enabled: false,
          spaceBetween: 0,
          slidesPerView: "auto",
          grid: false,
        },
      },
    });
  });

  /* Projects section */
  const $projectsSections = document.querySelectorAll(".projects");
  $projectsSections.forEach(($projectsSection) => {
    const $slider = $projectsSection.querySelector(".projects__slider");
    const $prevBtn = $projectsSection.querySelector(".projects__slider-prev");
    const $nextBtn = $projectsSection.querySelector(".projects__slider-next");

    new Swiper($slider, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        clickable: true,
        prevEl: $prevBtn,
        nextEl: $nextBtn,
      },
      breakpoints: {
        991: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
        },
        641: {
          slidesPerView: 2,
          spaceBetween: 30,
          loop: true,
        },
      },
    });
  });

  /* Usage section */
  const $usageSections = document.querySelectorAll(".usage");
  $usageSections.forEach(($usageSection) => {
    const $slider = $usageSection.querySelector(".usage__slider");
    const $prevBtn = $usageSection.querySelector(".usage__slider-prev");
    const $nextBtn = $usageSection.querySelector(".usage__slider-next");

    new Swiper($slider, {
      enabled: true,
      slidesPerView: 1,
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      grid: {
        fill: "row",
        rows: 2,
      },
      spaceBetween: 25,
      navigation: {
        clickable: true,
        prevEl: $prevBtn,
        nextEl: $nextBtn,
      },
      breakpoints: {
        641: {
          enabled: false,
          spaceBetween: 0,
          slidesPerView: "auto",
          grid: false,
        },
      },
    });
  });

  /* Companies section */
  const $companiesSections = document.querySelectorAll(".companies");
  $companiesSections.forEach(($companiesSection) => {
    const $slider = $companiesSection.querySelector(".companies__slider");
    const $prevBtn = $companiesSection.querySelector(".companies__slider-prev");
    const $nextBtn = $companiesSection.querySelector(".companies__slider-next");

    new Swiper($slider, {
      enabled: true,
      slidesPerView: 3,
      spaceBetween: 40,
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        clickable: true,
        prevEl: $prevBtn,
        nextEl: $nextBtn,
      },
      breakpoints: {
        1340: {
          slidesPerView: 6,
          spaceBetween: 2,
        },
        1160: {
          slidesPerView: 6,
          spaceBetween: 2,
        },
        991: {
          slidesPerView: 5,
          spaceBetween: 2,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 2,
        },
      },
    });
  });
});

/* Helpers */
function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}

// const ABSOLUTE_ELEMS = '.header';

function lockBody() {
  const scrollbarWidthPX = `${getScrollbarWidth()}px`;

  document.body.classList.add("body--lock");
  document.body.style.paddingRight = scrollbarWidthPX;

  // const $absoluteElems = document.querySelectorAll(ABSOLUTE_ELEMS);
  // $absoluteElems.forEach($elem => $elem.style.paddingRight = scrollbarWidthPX);
}

function unlockBody() {
  document.body.classList.remove("body--lock");
  document.body.style.paddingRight = "";

  // const $absoluteElems = document.querySelectorAll(ABSOLUTE_ELEMS);
  // $absoluteElems.forEach($elem => $elem.style.paddingRight = '');
}
