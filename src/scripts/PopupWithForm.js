import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handlerSubmit}) {
    super(popupSelector);
    this._popupform = popupSelector.querySelector('.popup__form');
    this._handlerSubmit = handlerSubmit;
    this._inputList = Array.from(this.popupSelector.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this.popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handlerSubmit(this._getInputValues());
      this.close();
      this._popupform.reset();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
  }
}