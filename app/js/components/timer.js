function timer(params) {
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
}
export default timer;
