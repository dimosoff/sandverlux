document.addEventListener("DOMContentLoaded", function () {
  myFunctions.addClassOnScroll(".header", 170, "_scrolled");
  myFunctions.addClassOnClick(".burger", ".header", "_menu-opened");
  myFunctions.myLazyLoad();
  myFunctions.scrollToTop();
  myFunctions.myGallery;
  myFunctions.mySetAnchorsEvents;
  const myPopupOverlay = myFunctions.myPopupOverlay;

  const thankYouPopopup = document.querySelector(".thank-you-popup");
  const topUpPopopup = document.querySelector(".top-up-popup");
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  const popupClassActive = "popup_active";

  const forms = document.querySelectorAll("form.form");
  const formElements = document.querySelectorAll(".form__input");

  const inputMessageClass = "form__error-message";
  const inputMessageClassActive = `${inputMessageClass}_active`;

  const inputClass = "form__input";
  const inputClassError = `${inputClass}_error`;
  const inputClassValid = `${inputClass}_valid`;

  const errorMessages = {
    emptyName: "Введите имя",
    emptyPhone: "Введите телефон",
    emptyWebsite: "Введите телефон",
    emptyEmail: "Введите email",
    wrongPhone: "Неверный телефон",
    wrongWebsite: "Неверный телефон",
    wrongEmail: "Неверный email",
  };

  const topUpAccountButton = document.querySelector(
    "button[name=top-up-account]"
  );

  //faq list collapse
  const allFaqItems = document.querySelectorAll(".faq-item");

  if (allFaqItems.length) {
    allFaqItems.forEach((item) => {
      const answerButton = item.querySelector(".faq-item__button");
      const answerWrapper = item.querySelector(".faq-item__answer-wrapper");

      answerButton.addEventListener("click", () => {
        faqCollapseAnimation(answerButton, answerWrapper);
      });
      answerButton.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          e.preventDefault();
          faqCollapseAnimation(answerButton, answerWrapper);
        }
      });
    });
  }

  //popup click events

  popupCloseButtons.forEach((elem) => {
    elem.addEventListener("click", () => {
      myPopupOverlay.hide();
      thankYouPopopup.classList.remove(popupClassActive);
      topUpPopopup.classList.remove(popupClassActive);
    });
  });

  myPopupOverlay.element.addEventListener("click", () => {
    myPopupOverlay.hide();
    thankYouPopopup.classList.remove(popupClassActive);
    topUpPopopup.classList.remove(popupClassActive);
  });

  // "contacts" form placeholder state movement //

  if (formElements) {
    formElements.forEach((elem) => {
      const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
      if (!elemLabel.classList.contains("form__label_placeholder")) return;

      changePlaceholderState(elem.value, elemLabel);

      elem.addEventListener("focusin", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
      elem.addEventListener("focusout", (e) =>
        changePlaceholderState(elem.value, elemLabel, e.type)
      );
    });
  }

  // slider //

  const doorPriceSlider = document.getElementById("door-price-slider");
  const doorPriceMinInput = document.querySelector(
    "input[name=door-price-min]"
  );
  const doorPriceMaxInput = document.querySelector(
    "input[name=door-price-max]"
  );

  noUiSlider.create(doorPriceSlider, {
    start: [
      +doorPriceMinInput.value || 0,
      +doorPriceMaxInput.dataset.max || 100,
    ],
    step: 1,
    format: {
      to: function (value) {
          return parseInt(value);
      },
      from: function (value) {
          return parseInt(value);
      }
    },
    connect: true,
    range: {
      min: +doorPriceMinInput.dataset.min || 0,
      max: +doorPriceMaxInput.dataset.max || 100,
    },
  });

  doorPriceSlider.noUiSlider.on("update", function (values, handle) {
    let value = values[handle];

    if (handle) {
      doorPriceMaxInput.value = value;
    } else {
      doorPriceMinInput.value = value;
    }
  });

  doorPriceMinInput.addEventListener("change", function () {
    doorPriceSlider.noUiSlider.set([this.value, null]);
  });
  doorPriceMaxInput.addEventListener("change", function () {
    doorPriceSlider.noUiSlider.set([null, this.value]);
  });

  // our-goods swiper //

  const ogFilterButtons = document.querySelectorAll(".our-goods__button");
  let ogSlides = null;
  ogFilterButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      showCorrectCategory(event.currentTarget.value);
      switchCategoryButton(event.currentTarget);
    })
  );

  function showCorrectCategory(category) {
    if (ogSlides === null) return;
    ogSlides.forEach((slide) => addCategoryClass(slide, category));
  }

  function addCategoryClass(slide, buttonCategory) {
    const slideCategories = slide.dataset.slideCategory.split(",");
    slide.classList.remove("our-goods__slide-show");
    if (!slideCategories.includes(buttonCategory)) return;
    slide.classList.add("our-goods__slide-show");
  }

  function switchCategoryButton(button) {
    ogFilterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  }

  // eslint-disable-next-line no-unused-vars, no-undef
  const swiper = new Swiper(".our-goods__swiper", {
    modules: [Navigation],
    loop: false,
    loopAdditionalSlides: 2,
    rewind: false,
    grabCursor: true,
    slidesPerView: 5,
    spaceBetween: 60,
    //autoHeight: true,
    setWrapperSize: true,
    wrapperClass: "our-goods__swiper-wrapper",

    //pagination: {
    //  el: '.swiper-pagination',
    //},

    navigation: {
      nextEl: ".our-goods__nav-btn_next",
      prevEl: ".our-goods__nav-btn_prev",
      lockClass: "our-goods__nav-btn_lock",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
    on: {
      init: function () {
        updateSliderLockedState(this);
        ogSlides = this.slides;
        showCorrectCategory("bestseller");
      },
      observerUpdate: function () {
        console.log("observerUpdate");
      },
      lock: function () {
        console.log("lock");
      },
      // update: function () {
      //   console.log('update');
      // },
    },
  });

  function updateSliderLockedState(slider) {
    slider.isLocked
      ? slider.el.classList.add("locked")
      : slider.el.classList.remove("locked");
  }

  // form validation //

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validateWebsite = (website) => {
    return website.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/
    );
  };

  if (forms) {
    forms.forEach((form) => {
      submitForm(form);
    });
  }

  if (topUpAccountButton) {
    topUpAccountButton.addEventListener("click", () => {
      myPopupOverlay.show();
      topUpPopopup.classList.add(popupClassActive);
    });
  }

  function submitForm(form) {
    const formRequiredElements = form.querySelectorAll("[data-required]"),
      formName = form.name;

    const phoneElement = form.querySelector(`#${formName}-phone`);

    if (phoneElement) {
      validatePhoneNumber(phoneElement);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let elemsWithErrors = 0;

      formRequiredElements.forEach((currentElement) => {
        const currentElementSiblings = [
          currentElement.previousElementSibling,
          currentElement.nextElementSibling,
        ];
        const emptyParams = [
          currentElement,
          currentElementSiblings,
          inputClassValid,
          inputClassError,
        ];
        const errorParams = [
          currentElement,
          currentElementSiblings,
          inputClassError,
          inputClassValid,
        ];

        if (!currentElement.value) {
          setValidationClasses(emptyParams, "empty");
          return;
        }

        switch (currentElement.id) {
          case `${formName}-email`:
            if (!validateEmail(currentElement.value)) {
              setValidationClasses(emptyParams, "wrong");
              break;
            }
          // eslint-disable-next-line no-fallthrough
          case `${formName}-website`:
            if (!validateWebsite(currentElement.value)) {
              setValidationClasses(emptyParams, "wrong");
              break;
            }
          // eslint-disable-next-line no-fallthrough
          default:
            setValidationClasses(errorParams);
            break;
        }
      });

      elemsWithErrors = document.querySelectorAll(
        "[data-required].form__input_error"
      ).length;

      if (elemsWithErrors) return;

      myPopupOverlay.show();
      thankYouPopopup.classList.add(popupClassActive);

      const data = new FormData(form);
      let dataArray = [];
      console.info("%cДанные формы", "color: chartreuse; font-size: 160%");
      for (const [name, value] of data) {
        dataArray.push([name, value]);
        console.log(
          `Элемент: "${name}"; значение: %c"${value}"%c.`,
          "color: burlywood; font-style: italic; font-size: 120%"
        );
      }
      console.info("Массив: ", dataArray);

      formRequiredElements.forEach((e) => {
        e.classList.remove(inputClassValid);
      });
      form.reset();
    });
  }

  function changePlaceholderState(elemValue, label, event = "init") {
    if (
      (!elemValue && event == "init") ||
      (!!elemValue && event == "focusout")
    ) {
      return;
    }

    const placeholderClassActive = "form__label_placeholder_active";

    switch (event) {
      case "init":
      case "focusin":
        label.classList.add(placeholderClassActive);
        break;
      case "focusout":
        label.classList.remove(placeholderClassActive);
        break;
    }
  }

  function faqCollapseAnimation(currentAnswerButton, currentAnswerWrapper) {
    if (!currentAnswerButton && !currentAnswerWrapper) return;
    const currentAnswerItem = currentAnswerButton.parentElement;

    if (!currentAnswerItem.classList.contains("_active")) {
      allFaqItems.forEach((e) => {
        e.classList.add("_not-active");
        e.classList.remove("_active");
        e.querySelector(".faq-item__answer-wrapper").removeAttribute("style");
      });

      currentAnswerItem.classList.add("_active");
      currentAnswerItem.classList.remove("_not-active");
      currentAnswerWrapper.style.height = `${currentAnswerWrapper.firstElementChild.offsetHeight}px`;
    } else {
      allFaqItems.forEach((e) => {
        e.classList.remove("_active", "_not-active");
        e.querySelector(".faq-item__answer-wrapper").removeAttribute("style");
      });
    }
  }

  function setValidationClasses(elemParams, errorType = "") {
    const curEl = elemParams[0];
    const curElSibl = elemParams[1];
    const msgRemove = elemParams[2];
    const msgAdd = elemParams[3];

    if (curEl.classList.contains(msgRemove)) curEl.classList.remove(msgRemove);
    if (!curEl.classList.contains(msgAdd)) curEl.classList.add(msgAdd);

    curElSibl.forEach((e) => {
      setErrorMessage(e, curEl, errorType);
    });
  }

  function setErrorMessage(curElLabel, curEl, errorType) {
    if (
      curElLabel.classList.contains(inputMessageClassActive) &&
      curEl.classList.contains(inputClassValid) &&
      !errorType
    ) {
      curElLabel.classList.remove(inputMessageClassActive);
      curElLabel.textContent = "";
      return;
    }

    const isElemHasClass = curElLabel.classList.contains(inputMessageClass),
      elementType = curEl.name.split("-")[1];

    if (isElemHasClass && errorType == "empty") {
      curElLabel.classList.add(inputMessageClassActive);

      switch (elementType) {
        case `name`:
          curElLabel.textContent = errorMessages.emptyName;
          break;
        case `email`:
          curElLabel.textContent = errorMessages.emptyEmail;
          break;
        case `website`:
          curElLabel.textContent = errorMessages.emptyWebsite;
          break;
        case `phone`:
          curElLabel.textContent = errorMessages.emptyPhone;
          break;
      }
      return;
    }
    if (isElemHasClass && errorType == "wrong") {
      curElLabel.classList.add(inputMessageClassActive);
      switch (curEl.id) {
        case `email`:
          curElLabel.textContent = errorMessages.wrongEmail;
          break;
        case `website`:
          curElLabel.textContent = errorMessages.wrongWebsite;
          break;
        case `phone`:
          curElLabel.textContent = errorMessages.wrongPhone;
          break;
      }
      return;
    }
  }

  function validatePhoneNumber(inputElement) {
    inputElement.addEventListener("input", (e) => {
      let y = e.target.value.replace(/((?!\+)\D+)+/g, "");
      //let x1 = y.match(/^(\+7{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      let x1 = y.match(/^(\+\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      let phoneArray = "",
        mre = 1; /*matched RegEx*/

      if (x1 === null || !x1[mre]) {
        phoneArray = "";
      } else if (x1[mre] && !x1[mre + 1]) {
        phoneArray = `${x1[mre]}`;
      } else if (x1[mre] && x1[mre + 1] && !x1[mre + 2]) {
        phoneArray = `${x1[mre]} (${x1[mre + 1]}`;
      } else if (x1[mre] && x1[mre + 1] && x1[mre + 2] && !x1[mre + 3]) {
        phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}`;
      } else if (
        x1[mre] &&
        x1[mre + 1] &&
        x1[mre + 2] &&
        x1[mre + 3] &&
        !x1[mre + 4]
      ) {
        phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}-${
          x1[mre + 3]
        }`;
      } else {
        phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}-${
          x1[mre + 3]
        }-${x1[mre + 4]}`;
      }
      e.target.value = phoneArray;
    });
  }
});

import * as myFunctions from "./functions.js";
import noUiSlider from "nouislider/dist/nouislider.mjs";
// eslint-disable-next-line no-unused-vars
import Swiper, { Navigation, Pagination } from "swiper";
