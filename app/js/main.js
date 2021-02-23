import AOS from "aos";

import tabs from "./components/tabs";
import modal from "./components/modal";
import timer from "./components/timer";
import cards from "./components/cards";
import calculate from "./components/calculat";
import data from "./components/data";
import slider from "./components/slider";
import clicks from "./components/click";

window.addEventListener("DOMContentLoaded", () => {
  AOS.init();

  tabs();
  modal();
  timer();
  cards();
  calculate();
  data();
  slider();
  clicks();
});
