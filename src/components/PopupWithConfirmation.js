import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupElement, { handelSubmit }) {
    super(popupElement);
    this.handelSubmit = this.handelSubmit;
  }

  open() {
    super.open();
  }

  handleSubmitConfirm(submit) {
    this.handelSubmit = submit;
    this.setEventListeners();
  }

  setEventListeners() {
    this.popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handelSubmit();
    });
    super.setEventListeners();
  }
}
