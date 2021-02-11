function modal(params) {
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
}

export default modal;
