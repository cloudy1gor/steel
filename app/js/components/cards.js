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
}

export default cards;
