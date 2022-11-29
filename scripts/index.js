import { Card } from "./card.js";
import { FormValidation } from "./FormValidator.js";
import { formValidationSelectors } from "./constants.js";
import { initialCards } from "./cardMassiv.js";
import {
  popupProfileOpenBtn,
  popupPlaceOpenBtn,
  popupActiveClass,
  popupName,
  popupJob,
  profileName,
  profileJob,
  formProfile,
  formPlace,
  popupPlaceName,
  popupLinkPlace,
  popupProfile,
  popupPlace,
  cardsWrapper,
  popupImageText,
  popupImage,
  popupImageForm,
} from './utils.js';

function openPopup(popup) {
  popup.classList.add(popupActiveClass);
  document.addEventListener("keydown", keyHandler);
}

const formProfileValidator = new FormValidation(
  formValidationSelectors,
  popupProfile
);
formProfileValidator.enableValidation();

const formPlaceValidator = new FormValidation(
  formValidationSelectors,
  popupPlace
);
formPlaceValidator.enableValidation();

function openProfilePopup() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function openPlacePopup() {
  openPopup(popupPlace);
  formPlaceValidator.disabledButton();
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
  const card = new Card(item, "#card-template", openPopup);
  const element = card.create();
  return element;
};

function prependCard(element) {
  cardsWrapper.prepend(element);
}

initialCards.forEach((element) => {
  cardsWrapper.append(createCard(element));
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
