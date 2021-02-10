window.addEventListener("DOMContentLoaded", () => {
  //TODO Табы
  // задачи:
  // 1 - функция которая будет скрывать табы
  // 2 - показать нужный таб
  // 3 -назначить обработчик события на меню которое и будет манипулировать этими функциями

  const tabs = document.querySelectorAll(".tabheader__item");
  const tabContent = document.querySelectorAll(".tabcontent");
  const tabsParrent = document.querySelector(".tabheader__items");

  // скрываем ненужные таьы
  function hideTabContent() {
    // перебераем псевдомассив
    tabContent.forEach((item) => {
      // скоываем табы
      // item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  // показываем нужные табы
  function showTabContent(i = 0) {
    // tabContent[i].style.display = "block";
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  // назначаем событие клика
  tabsParrent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //TODO таймер обратного отсчета

  const deadline = "2021-02-09"; // отправная точка

  function getTimeRemaing(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()); // количество милисекунд до которого нужно досчитать, получим разницу в милисекундах
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // количество дней перевели из милисекунд
    const hours = Math.floor(((t / 1000) * 60 * 60) % 24); // количество часов не больше чем 24
    const minutes = Math.floor((t / 1000 / 60) % 60); // количество минут не больше чем 60
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  // добавляем нули перед числами
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`; // строку превращаем в число
    } else {
      return num;
    }
  }

  // устанавливаем таймер на страницу
  function setClock(selector, endtime) {
    const timer = document.querySelector(".timer");
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // убираем мигание в верстке
    // получаем функцию, которая будет обновлять таймер каждую секунду
    function updateClock(params) {
      const t = getTimeRemaing(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  // TODO модальное окно
  // //  1 вариант без добавления класа hide к modal
  // const modalTrigger = document.querySelector("[data-modal]"),
  //   modal = document.querySelector(".modal"),
  //   modalCloseBtn = document.querySelector("[data-close]");

  // modalTrigger.addEventListener("click", () => {
  //   modal.classList.add("show");
  //   modal.classList.remove("hide");
  //   // фиксируем страницу за модальным окном
  //   document.body.style.overflow = "hidden";
  // });

  // modalCloseBtn.addEventListener("click", () => {
  //   modal.classList.add("hide");
  //   modal.classList.remove("show");
  //   document.body.style.overflow = "";
  // });

  // // 2 вариант Toogle с добавлением класса hide к modal
  // const modalTrigger = document.querySelector("[data-modal]"),
  //   modal = document.querySelector(".modal"),
  //   modalCloseBtn = document.querySelector("[data-close]");

  // modalTrigger.addEventListener("click", () => {
  //   // фиксируем страницу за модальным окном
  //   modal.classList.toggle("show"); // если такой класс есть он его уберет, а если нет добавит
  //   document.body.style.overflow = "hidden";
  // });

  // modalCloseBtn.addEventListener("click", () => {
  //   modal.classList.toggle("show");
  //   document.body.style.overflow = "";
  // });

  // 3 варинат назначаем на все кнопки с data-modal событие
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function openModal(params) {
    // modal.classList.add("show");
    // modal.classList.remove("hide");
    modal.style.display = "block";
    // фиксируем страницу за модальным окном
    document.body.style.overflow = "hidden";
    // если модальное окно было ранее открыто оно не вызывается
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => [btn.addEventListener("click", openModal)]);

  // dry не повторяй участки кода
  function closeModal(params) {
    // modal.classList.add("hide");
    // modal.classList.remove("show");
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener("click", closeModal); // closeModal передаем как название

  // действия по закрытию модального окна при клике вне окна
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(); // вызываем
    }
  });
  // при нажатии на esc закрываем модальное окно
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // модальное окно появляется когда пользыватель пролистал страницу или через промежуток времени
  const modalTimerId = setTimeout(openModal, 5000);

  function showModalBtScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalBtScroll);
    }
  }

  window.addEventListener("scroll", showModalBtScroll);

  // TODO используем классы для карточек

  class MenuCard {
    constructor(src, alt, title, description, price, parrentSelector, ...rest) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.rest = rest; // массив
      // берем DOM элемент
      this.parrent = document.querySelector(parrentSelector);
      this.prise = price;
      this.transfer = 28;
      this.changeToUAH();
    }
    // метод для конвертации валют
    changeToUAH() {
      this.price = this.transfer;
    }

    // для формирования верстки
    render() {
      const element = document.createElement("div");
      // если в массиве ...rest нет ни одного элемента, то ставим класс по умолчанию
      if (this.rest.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.rest.forEach((restName) => {
          element.classList.add(restName);
        });
      }
      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
        `;
      this.parrent.append(element);
    }
  }

  // создаем новый обьект и вызываем метод render()
  const div = new MenuCard(
    "images / tabs / vegy.jpg",
    "vergy",
    "Меню Фитнес",
    "это новый подход к приготовлению блюд",
    8,
    ".menu .container",
    "menu__item",
    "test-class"
  );
  div.render();

  // TODO отправка данных на сервер (AJAX)
  // берем несколько форм на сайте и отправляем данные в server.php
  // чтобы проверить нужен локальный сервер

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка",
    success: "Мы с вами свяжумся",
    fail: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postData(item);
  });

  // // постинг данных через XMLHttpRequest()
  // function postData(form) {
  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();

  //     const statusMessage = document.createElement("div");
  //     statusMessage.classList.add("status");
  //     statusMessage.textContent = message.loading;
  //     form.append(statusMessage);

  //     // Когда используется связка XMLHttpRequest (обьекта) и FormData - заголовок устанавливать не нужно, он установится автоматически
  //     // из-за этого мы не получили данные на сервере
  //     const request = new XMLHttpRequest();
  //     request.open("POST", "server.php");

  //     // request.setRequestHeader("Content-type", "multipart/form-data"); // для PHP
  //     request.setRequestHeader("Content-type", "application/json"); // для JSON (нужно указать заголовок)
  //     const formData = new FormData(form);

  //     // для JSON превращаем FormData
  //     const objec = {};
  //     formData.forEach(function (value, key) {
  //       objec[key] = value;
  //     });
  //     // конвертация в JSON
  //     const json = JSON.stringify(objec);

  //     request.send(formData);

  //     request.addEventListener("load", () => {
  //       if (request.status == 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         // Сьрасываем форму и удаляем блок
  //         form.reset();
  //         setTimeout(() => {
  //           statusMessage.remove;
  //         }, 3000);
  //       } else {
  //         statusMessage.textContent = message.fail;
  //       }
  //     });
  //   });
  // }

  // TODO постинг данных через fetch()
  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const formData = new FormData(form);

      // для JSON превращаем FormData
      const objec = {};
      formData.forEach(function (value, key) {
        objec[key] = value;
      });

      fetch("server.php", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(objec), // конвертация в JSON
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          statusMessage.textContent = message.success;
          // Сбрасываем форму и удаляем блок
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        })
        .catch(() => {
          statusMessage.textContent = message.fail;
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  // TODO слайдер 1 вариант

  // const slides = document.querySelectorAll(".offer__slide"),
  //   prev = document.querySelector(".offer__slider-prev"),
  //   next = document.querySelector(".offer__slider-next"),
  //   total = document.querySelector("#total"),
  //   current = document.querySelector("#current");

  // let slideIndex = 1;

  // showSlides(slideIndex);

  // // добавляем 0 перед нумерацией слайдов
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }

  // // показ и скрытие файлов
  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));

  //   slides[slideIndex - 1].style.display = "block";

  //   // нумерация слайдов
  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // // клики по стрелкам
  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });
  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });

  // TODO слайдер 2 вариант
  // нужно добавть обертку для слайдов

  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // иногда у нас нет доступа к стилям
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // Калькулятор

  const result = document.querySelector(".calculating__result span");
  let sex = "female",
    height,
    weight,
    age,
    ratio = 1.375;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____"; // Можете придумать что угодно
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
        } else {
          sex = e.target.getAttribute("id");
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
});
