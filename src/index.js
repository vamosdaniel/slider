import "./styles.scss";

import normalizeWheel from "normalize-wheel";
import AutoBind from "auto-bind";

class App {
  constructor() {
    AutoBind(this);

    this.slider = document.querySelector(".slider");
    this.sliderFirst = document.querySelector(".first-slider");
    this.sliderSecond = document.querySelector(".second-slider");

    this.scroll = {
      current: 0,
      target: 0,
      ease: 0.1
    };

    this.addEvents();
    this.onResize();
    this.createRAF();
  }

  addEvents() {
    window.addEventListener("mousewheel", this.onMouseWheel);
    window.addEventListener("resize", this.onResize);
  }

  onMouseWheel(event) {
    const normalized = normalizeWheel(event);
    const { pixelY } = normalized;

    this.scroll.target += pixelY;
  }

  onResize() {
    this.sliderBounds = this.slider.getBoundingClientRect();
  }

  createRAF() {
    requestAnimationFrame(this.update);
  }

  update() {
    this.scroll.current +=
      (this.scroll.target - this.scroll.current) * this.scroll.ease;

    // arbitrary value to allow more scroll
    const multipliedScroll = this.scroll.current * 1.5;
    const multipliedIndex = (multipliedScroll / this.sliderBounds.width) * 2;
    this.multiplier = Math.floor(multipliedIndex);

    this.sliderFirst.style.transform = `translateX(${
      -multipliedScroll + (this.multiplier * this.sliderBounds.width) / 2
    }px)`;

    this.sliderSecond.style.transform = `translateX(${
      -multipliedScroll + (this.multiplier * this.sliderBounds.width) / 2
    }px)`;

    requestAnimationFrame(this.update);
  }
}

new App();
