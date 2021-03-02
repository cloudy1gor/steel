function cards(params) {
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
        <img src="${this.src}" alt="${this.alt} loading="lazy"">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.prise}</span> грн</div>
        </div>
        `;
      this.parrent.append(element);
    }
  }

  // создаем новый обьект и вызываем метод render()
  const div = new MenuCard(
    "images/menu/1.jpg",
    "Десерт",
    "Фрутовый тост",
    "Только натуральный сахар и мед, недно и сладко",
    "70",
    ".menu .container",
    "menu__item",
    "test-class"
  );
  const div3 = new MenuCard(
    "images/menu/3.jpg",
    "Десерт",
    "Лосось в апельсиновом соусе",
    "Апельсин раскрывает истинный вкус лосося",
    220,
    ".menu .container",
    "menu__item",
    "test-class"
  );
  const div2 = new MenuCard(
    "images/menu/2.jpg",
    "Десерт",
    "Салат свежесть",
    "Пряные травы в сочитании с свежим сыром саздают невообразмый вкус",
    140,
    ".menu .container",
    "menu__item",
    "test-class"
  );
  div.render();
  div2.render();
  div3.render();
}

export default cards;
