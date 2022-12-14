import { popupActiveClass } from "./utils.js";
export class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupSelector.classList.add(popupActiveClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupSelector.classList.remove(popupActiveClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popupSelector.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    })
    }
}
