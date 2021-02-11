function clicks(params) {
  const contacts = document.querySelector(".header__contacts"),
    list = document.querySelector(".header__inner");

  contacts.addEventListener("click", () => {
    list.classList.toggle("show");
  });
}
export default clicks;
