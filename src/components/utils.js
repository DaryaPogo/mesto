export const popupProfileOpenBtn = document.querySelector(".profile__change");
export const popupPlaceOpenBtn = document.querySelector(".profile__submit");
export const popupActiveClass = "popup_opened";
export const popupName = document.querySelector(".popup__input_type_name");
export const popupJob = document.querySelector(".popup__input_type_job");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const formProfile = document.querySelector(".popup__form-profile");

export const formPlace = document.querySelector(".popup__form-place");
export const popupPlaceName = document.querySelector(".popup__input_type_place");
export const popupLinkPlace = document.querySelector(".popup__input_type_link");

export const popupProfile = document.querySelector(".popup-profile");
export const popupPlace = document.querySelector(".popup-place");
export const cardsWrapper = document.querySelector(".card__list");

export const popupImageText = document.querySelector(".popup__image-text");
export const popupImage = document.querySelector(".popup__image");
export const popupImageForm = document.querySelector(".popup-image");

export const formValidationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
