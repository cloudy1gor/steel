function tabs(params) {
  //TODO Табы
  // задачи:
  // 1 - функция которая будет скрывать табы
  // 2 - показать нужный таб
  // 3 -назначить обработчик события на меню которое и будет манипулировать этими функциями

  const tabs = document.querySelectorAll(".preview__tab");
  const tabContent = document.querySelectorAll(".preview__content");
  const tabsParrent = document.querySelector(".preview__nav");

  // скрываем ненужные таьы
  function hideTabContent() {
    // перебераем псевдомассив
    tabContent.forEach((item) => {
      // скрываем табы
      // item.style.display = "none";
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("preview__tab--active");
    });
  }

  // показываем нужные табы
  function showTabContent(i = 0) {
    // tabContent[i].style.display = "block";
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("preview__tab--active");
  }

  hideTabContent();
  showTabContent();

  // назначаем событие клика
  tabsParrent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("preview__tab")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
export default tabs;
