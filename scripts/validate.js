const showInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (inputElement, errorElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const disabledButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

const toggleButton = (
  formSubmitButtonElement,
  formSubmitButtonClass,
  buttonState
) => {
  if (buttonState) {
    disabledButton(formSubmitButtonElement, formSubmitButtonClass);
  } else {
    enableButton(formSubmitButtonElement, formSubmitButtonClass);
  }
};

const hasInvalidInputs = (inputs) => {
  return inputs.some((input) => !input.validity.valid);
};

const chekInputValidity = (
  inputElement,
  errorElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.valid) {
    errorElement.classList.remove(errorClass);
    hideInputError(inputElement, errorElement, inputErrorClass);
  } else {
    errorElement.classList.add(errorClass);
    showInputError(inputElement, errorElement, inputErrorClass);
  }
};

const handelFormSubmit = (event) => {
  event.preventDefault();
};

const handelFormInput = (
  event,
  formElement,
  inputErrorClass,
  formSubmitButtonElement,
  inactiveButtonClass,
  inputs,
  errorClass
) => {
  const inputElement = event.target;
  const errorElement = formElement.querySelector(
    `.input-error-${inputElement.name}`
  );
  const buttonState = hasInvalidInputs(inputs);
  chekInputValidity(inputElement, errorElement, inputErrorClass, errorClass);
  toggleButton(formSubmitButtonElement, inactiveButtonClass, buttonState);
};

const enableValidation = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
}) => {
  const form = Array.from(document.querySelectorAll(formSelector));
  form.forEach((formElement) => {
    formElement.addEventListener("submit", handelFormSubmit);
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const formSubmitButton = formElement.querySelector(submitButtonSelector);
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", (event) =>
        handelFormInput(
          event,
          formElement,
          inputErrorClass,
          formSubmitButton,
          inactiveButtonClass,
          inputs,
          errorClass
        )
      );
    });
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
