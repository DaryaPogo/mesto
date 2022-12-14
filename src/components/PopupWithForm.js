import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, {handlerSubmit}) {
    super(popupElement);
    this._popupform = popupElement.querySelector('.popup__form');
    this._handlerSubmit = handlerSubmit;
    this._inputList = Array.from(this.popupElement.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this.popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlerSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupform.reset();
  }
}