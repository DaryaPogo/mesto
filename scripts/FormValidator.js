export class FormValidation {
  constructor(formValidationSelectors, popup) {
    this._formSelector = formValidationSelectors.formSelector;
    this._inputSelector = formValidationSelectors.inputSelector;
    this._submitButtonSelector = formValidationSelectors.submitButtonSelector;
    this._inactiveButtonClass = formValidationSelectors.inactiveButtonClass;
    this._inputErrorClass = formValidationSelectors.inputErrorClass;
    this._errorClass = formValidationSelectors.errorClass;
    this.popup = popup;
    this.inputs = Array.from(this.popup.querySelectorAll(this._inputSelector));
    this.formSubmitButton = this.popup.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _enableButton() {
    this.formSubmitButton.classList.remove(this._inactiveButtonClass);
    this.formSubmitButton.disabled = false;
  }

  disabledButton() {
    this.formSubmitButton.classList.add(this._inactiveButtonClass);
    this.formSubmitButton.disabled = true;
  }

  _chekInputValidity(inputElement, errorElement) {
    if (inputElement.validity.valid) {
      errorElement.classList.remove(this._errorClass);
      this._hideInputError(inputElement, errorElement);
    } else {
      errorElement.classList.add(this._errorClass);
      this._showInputError(inputElement, errorElement);
    }
  }

  _toggleButton(buttonState) {
    if (buttonState) {
      this.disabledButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInputs() {
    return this.inputs.some((input) => !input.validity.valid);
  }

  _handelFormSubmit(event) {
    event.preventDefault();
  }

  _handelFormInput(event) {
    const inputElement = event.target;
    const errorElement = this.popup.querySelector(
      `.input-error-${inputElement.name}`
    );
    const buttonState = this._hasInvalidInputs(this.inputs);
    this._chekInputValidity(inputElement, errorElement);
    this._toggleButton(buttonState);
  }

  enableValidation() {
    this.popup.addEventListener("submit", (event) =>
      this._handelFormSubmit(event)
    );
    this.inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) =>
        this._handelFormInput(event)
      );
    });
  }
}
