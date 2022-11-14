(() => {
  // src/scripts/functions.js
  var myPopupOverlay = new popupOverlay();
  var myGallery = new gallery();
  var mySetAnchorsEvents = new setAnchorsEvents();
  function addClassOnClick(itemClick, classToItem, nameOfClass) {
    document.querySelector(itemClick).addEventListener("click", () => {
      document.querySelectorAll(classToItem).forEach((item) => {
        item.classList.toggle(nameOfClass);
      });
    });
  }
  function addClassOnScroll(item, topOffset, nameOfClass) {
    window.addEventListener("scroll", function() {
      if (scrollY > topOffset) {
        document.querySelector(item).classList.add(nameOfClass);
      } else {
        document.querySelector(item).classList.remove(nameOfClass);
      }
    });
    if (scrollY > topOffset) {
      document.querySelector(item).classList.add(nameOfClass);
    }
  }
  function setAnchorsEvents() {
    let scrollElements = document.querySelectorAll("a[href^='#']");
    scrollElements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();
        const link = event.target.getAttribute("href") || event.target.parentElement.getAttribute("href") || event.target.firstElementChild.getAttribute("href");
        if (link === "#")
          return;
        const linkTarget = document.getElementById(link.substring(1));
        if (!linkTarget)
          return;
        const currentScrollTop = window.scrollY, targetScrollTop = linkTarget.offsetTop - 50;
        const burgerElem = document.querySelector("._menu-opened");
        if (burgerElem)
          burgerElem.classList.remove("_menu-opened");
        animate({
          duration: 600,
          timing: easeOut,
          draw: function(progress) {
            window.scrollTo(
              0,
              currentScrollTop - (currentScrollTop - targetScrollTop) * progress
            );
          }
        });
      });
    });
  }
  function scrollToTop() {
    let $scrollTopElement = document.querySelector(".scroll-top");
    window.addEventListener("scroll", function() {
      let hasClass = $scrollTopElement.classList.contains("_active"), isScrolled = scrollY > 35;
      if (isScrolled && !hasClass) {
        $scrollTopElement.classList.add("_active");
      } else if (!isScrolled && hasClass) {
        $scrollTopElement.classList.remove("_active");
      }
    });
    $scrollTopElement.addEventListener("click", () => {
      let currentScrollTop = window.scrollY;
      animate({
        duration: 600,
        timing: easeOut,
        draw: function(progress) {
          window.scrollTo(0, currentScrollTop - currentScrollTop * progress);
        }
      });
    });
    if (scrollY > 35 && !$scrollTopElement.classList.contains("_active")) {
      $scrollTopElement.classList.add("_active");
    }
  }
  function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate2(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction < 0)
        timeFraction = 0;
      if (timeFraction > 1)
        timeFraction = 1;
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate2);
      }
    });
  }
  function easeOut(timeFraction) {
    return Math.pow(timeFraction, 1 / 5);
  }
  function myLazyLoad() {
    const lazyObjects = document.querySelectorAll("[data-lazyload]");
    if (!lazyObjects.length)
      return;
    if ("IntersectionObserver" in window) {
      const options = {
        rootMargin: "50px",
        threshold: [0, 0.5]
      };
      lazyObjects.forEach((item) => {
        const observer = new IntersectionObserver(manageIntersection, options);
        observer.observe(item);
        function manageIntersection(entries, observer2) {
          entries.forEach((item2) => {
            if (item2.isIntersecting) {
              replaceAttributes(item2.target);
              observer2.disconnect();
            }
            return;
          });
        }
      });
      return true;
    } else {
      lazyObjects.forEach((item) => replaceAttributes(item));
      return true;
    }
    function replaceAttributes(item) {
      if (item.hasAttribute("data-src")) {
        item.setAttribute("src", item.getAttribute("data-src"));
        item.removeAttribute("data-src");
      }
    }
  }
  function gallery() {
    const galleryObjects = document.querySelectorAll("[data-gallery]");
    if (!galleryObjects.length)
      return;
    const galleryWrapper = document.createElement("div");
    const closeButton = document.createElement("button");
    const galleryClassActive = "my-gallery_active";
    galleryWrapper.className = "my-gallery";
    closeButton.type = "button";
    closeButton.className = "my-gallery__close";
    closeButton.innerHTML = "<span class='sr-only'>\u0417\u0430\u043A\u0440\u044B\u0442\u044C</span>";
    document.body.appendChild(galleryWrapper);
    galleryWrapper.appendChild(closeButton);
    const galleryImage = new Image();
    this.show = () => galleryWrapper.classList.add(galleryClassActive);
    this.hide = () => galleryWrapper.classList.remove(galleryClassActive);
    closeButton.addEventListener("click", () => {
      myPopupOverlay.hide();
      this.hide();
    });
    galleryWrapper.addEventListener("click", () => {
      myPopupOverlay.hide();
      this.hide();
    });
    galleryObjects.forEach((elem) => {
      const imageElement = elem.querySelector("img");
      if (!imageElement)
        return;
      const imageLink = imageElement.getAttribute("data-src") || imageElement.getAttribute("src") || "images/placeholder.svg";
      const imageSource = imageLink.replace("/thumbnails", "");
      elem.addEventListener("click", (event) => {
        this.showGalleryElement(event, imageSource);
      });
      elem.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
          this.showGalleryElement(e, imageSource);
        }
      });
    });
    this.showGalleryElement = (event, imageSource) => {
      event.preventDefault();
      myPopupOverlay.show();
      galleryImage.onload = () => galleryWrapper.appendChild(galleryImage);
      galleryImage.src = imageSource;
      galleryImage.alt = event.target.alt;
      this.show();
    };
  }
  function popupOverlay() {
    const name = "popup-overlay";
    this.element = document.querySelector(`.${name}`);
    const elementClassActive = `${name}_active`;
    const bodyElement = document.body, headerElement = document.querySelector("header");
    this.show = () => {
      let scrollWidth = window.innerWidth - document.body.clientWidth;
      this.element.classList.add(elementClassActive);
      bodyElement.style = `overflow: hidden; margin-right: ${scrollWidth}px`;
      headerElement.style = `padding-right: ${scrollWidth}px`;
    };
    this.hide = () => {
      this.element.classList.remove(elementClassActive);
      setTimeout(() => {
        bodyElement.style = "";
        headerElement.style = "";
      }, 300);
    };
  }

  // src/scripts/main.js
  document.addEventListener("DOMContentLoaded", function() {
    addClassOnScroll(".header", 170, "_scrolled");
    addClassOnClick(".burger", ".header", "_menu-opened");
    myLazyLoad();
    scrollToTop();
    myGallery;
    mySetAnchorsEvents;
    const myPopupOverlay2 = myPopupOverlay;
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
      emptyName: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F",
      emptyPhone: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
      emptyWebsite: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
      emptyEmail: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 email",
      wrongPhone: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
      wrongWebsite: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
      wrongEmail: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 email"
    };
    const topUpAccountButton = document.querySelector(
      "button[name=top-up-account]"
    );
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
    popupCloseButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        myPopupOverlay2.hide();
        thankYouPopopup.classList.remove(popupClassActive);
        topUpPopopup.classList.remove(popupClassActive);
      });
    });
    myPopupOverlay2.element.addEventListener("click", () => {
      myPopupOverlay2.hide();
      thankYouPopopup.classList.remove(popupClassActive);
      topUpPopopup.classList.remove(popupClassActive);
    });
    if (formElements) {
      formElements.forEach((elem) => {
        const elemLabel = elem.previousElementSibling || elem.nextElementSibling;
        if (!elemLabel.classList.contains("form__label_placeholder"))
          return;
        changePlaceholderState(elem.value, elemLabel);
        elem.addEventListener(
          "focusin",
          (e) => changePlaceholderState(elem.value, elemLabel, e.type)
        );
        elem.addEventListener(
          "focusout",
          (e) => changePlaceholderState(elem.value, elemLabel, e.type)
        );
      });
    }
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
        myPopupOverlay2.show();
        topUpPopopup.classList.add(popupClassActive);
      });
    }
    function submitForm(form) {
      const formRequiredElements = form.querySelectorAll("[data-required]"), formName = form.name;
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
            currentElement.nextElementSibling
          ];
          const emptyParams = [
            currentElement,
            currentElementSiblings,
            inputClassValid,
            inputClassError
          ];
          const errorParams = [
            currentElement,
            currentElementSiblings,
            inputClassError,
            inputClassValid
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
            case `${formName}-website`:
              if (!validateWebsite(currentElement.value)) {
                setValidationClasses(emptyParams, "wrong");
                break;
              }
            default:
              setValidationClasses(errorParams);
              break;
          }
        });
        elemsWithErrors = document.querySelectorAll(
          "[data-required].form__input_error"
        ).length;
        if (elemsWithErrors)
          return;
        myPopupOverlay2.show();
        thankYouPopopup.classList.add(popupClassActive);
        const data = new FormData(form);
        let dataArray = [];
        console.info("%c\u0414\u0430\u043D\u043D\u044B\u0435 \u0444\u043E\u0440\u043C\u044B", "color: chartreuse; font-size: 160%");
        for (const [name, value] of data) {
          dataArray.push([name, value]);
          console.log(
            `\u042D\u043B\u0435\u043C\u0435\u043D\u0442: "${name}"; \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: %c"${value}"%c.`,
            "color: burlywood; font-style: italic; font-size: 120%"
          );
        }
        console.info("\u041C\u0430\u0441\u0441\u0438\u0432: ", dataArray);
        formRequiredElements.forEach((e2) => {
          e2.classList.remove(inputClassValid);
        });
        form.reset();
      });
    }
    function changePlaceholderState(elemValue, label, event = "init") {
      if (!elemValue && event == "init" || !!elemValue && event == "focusout") {
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
      if (!currentAnswerButton && !currentAnswerWrapper)
        return;
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
      if (curEl.classList.contains(msgRemove))
        curEl.classList.remove(msgRemove);
      if (!curEl.classList.contains(msgAdd))
        curEl.classList.add(msgAdd);
      curElSibl.forEach((e) => {
        setErrorMessage(e, curEl, errorType);
      });
    }
    function setErrorMessage(curElLabel, curEl, errorType) {
      if (curElLabel.classList.contains(inputMessageClassActive) && curEl.classList.contains(inputClassValid) && !errorType) {
        curElLabel.classList.remove(inputMessageClassActive);
        curElLabel.textContent = "";
        return;
      }
      const isElemHasClass = curElLabel.classList.contains(inputMessageClass), elementType = curEl.name.split("-")[1];
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
        let x1 = y.match(/^(\+\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
        let phoneArray = "", mre = 1;
        if (x1 === null || !x1[mre]) {
          phoneArray = "";
        } else if (x1[mre] && !x1[mre + 1]) {
          phoneArray = `${x1[mre]}`;
        } else if (x1[mre] && x1[mre + 1] && !x1[mre + 2]) {
          phoneArray = `${x1[mre]} (${x1[mre + 1]}`;
        } else if (x1[mre] && x1[mre + 1] && x1[mre + 2] && !x1[mre + 3]) {
          phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}`;
        } else if (x1[mre] && x1[mre + 1] && x1[mre + 2] && x1[mre + 3] && !x1[mre + 4]) {
          phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}-${x1[mre + 3]}`;
        } else {
          phoneArray = `${x1[mre]} (${x1[mre + 1]}) ${x1[mre + 2]}-${x1[mre + 3]}-${x1[mre + 4]}`;
        }
        e.target.value = phoneArray;
      });
    }
  });
})();
//# sourceMappingURL=main.js.map
