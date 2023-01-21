export const popupProfileOpenBtn = document.querySelector(".profile__change");
export const popupPlaceOpenBtn = document.querySelector(".profile__submit");
export const popupActiveClass = "popup_opened";
export const popupName = document.querySelector(".popup__input_type_name");
export const popupJob = document.querySelector(".popup__input_type_job");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

export const popupProfile = document.querySelector(".popup-profile");
export const popupPlace = document.querySelector(".popup-place");
export const cardsWrapper = document.querySelector(".card__list");

export const popupImageForm = document.querySelector(".popup-image");

export const popupDelete = document.querySelector(".popup-delete-profile");
export const popupAvatar = document.querySelector(".profile__avatar");
export const popupAvatarBtn = document.querySelector(".profile__btn");
export const popupAvatarForm = document.querySelector(".popup-change-avatar");

export const formValidationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "20d35879-9615-41b1-8abb-77eae2aa9639",
    "Content-Type": "application/json",
  },
};
