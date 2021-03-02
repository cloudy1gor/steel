function menu() {
  const menu = document.querySelector(".btn--menu");
  const menuList = document.querySelector(".header__links");

  menu.addEventListener("click", () => {
    menuList.classList.toggle("header__links--active");
  });
}
export default menu;
