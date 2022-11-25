import { Card } from "./card.js";
import { FormValidation } from "./validate.js";
export { popupImageForm, popupImageText, popupImage };

const popupProfileOpenBtn = document.querySelector(".profile__change");
const popupPlaceOpenBtn = document.querySelector(".profile__submit");
const popupActiveClass = "popup_opened";
const popupName = document.querySelector(".popup__input_type_name");
const popupJob = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form-profile");

const formPlace = document.querySelector(".popup__form-place");
const popupPlaceName = document.querySelector(".popup__input_type_place");
const popupLinkPlace = document.querySelector(".popup__input_type_link");

const popupProfile = document.querySelector(".popup-profile");
const popupPlace = document.querySelector(".popup-place");
const cardList = document.querySelector(".card__list");

const popupImageText = document.querySelector(".popup__image-text");
const popupImage = document.querySelector(".popup__image");
const popupImageForm = document.querySelector(".popup-image");

const formElement = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const initialCards = [
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

function openPopup(popup) {
  popup.classList.add(popupActiveClass);
  document.addEventListener("keydown", keyHandler);
}

const validationpopupProfile = new FormValidation(formElement, popupProfile);
validationpopupProfile.enableValidation();

const validationpopupPlace = new FormValidation(formElement, popupPlace);
validationpopupPlace.enableValidation();

function openProfilePopup() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function openPlacePopup() {
  openPopup(popupPlace);
  validationpopupPlace.disabledButton();

}

function closePopup(popup) {
  popup.classList.remove(popupActiveClass);
  document.removeEventListener("keydown", keyHandler);
}

const keyHandler = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const closeHandler = (event) => {
  if (
    event.target.classList.contains("popup_opened") ||
    event.target.classList.contains("popup__close")
  ) {
    closePopup(event.currentTarget);
  }
};

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(popupProfile);
}

const addElement = (item) => {
  const element = createCard(item);
  prependCard(element);
};

const createCard = (item) => {
  const card = new Card(item, openPopup);
  const element = card.create();
  return element;
};

function prependCard(element) {
  cardList.prepend(element);
}

initialCards.forEach((element) => {
  cardList.append(createCard(element));
});

const placeSubmit = (event) => {
  event.preventDefault();
  addElement({
    name: popupPlaceName.value,
    link: popupLinkPlace.value,
  });

  closePopup(popupPlace);
  popupPlaceName.value = "";
  popupLinkPlace.value = "";
};

popupPlace.addEventListener("mousedown", closeHandler);
popupImageForm.addEventListener("mousedown", closeHandler);
popupProfile.addEventListener("mousedown", closeHandler);
popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", placeSubmit);
