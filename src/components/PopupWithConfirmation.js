import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }

  setSubmitCallback(handelSubmit) {
    this.handelSubmit = handelSubmit;
  }

  setEventListeners() {
    this.popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handelSubmit();
    });
    super.setEventListeners();
  }
}
