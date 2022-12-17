import { popupActiveClass } from "./utils.js";
export class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupElement.classList.add(popupActiveClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove(popupActiveClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("popup_opened") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    })
    }
}
