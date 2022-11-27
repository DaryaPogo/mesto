import { Card } from "./createCard.js";
import { FormValidation } from "./FormValidator.js";
import { formValidationSelectors } from "./constants.js";
import { initialCards } from "./card.js";
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
const cardsWrapper = document.querySelector(".card__list");

const popupImageText = document.querySelector(".popup__image-text");
const popupImage = document.querySelector(".popup__image");
const popupImageForm = document.querySelector(".popup-image");

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
  popupPlaceName.reset();
  popupLinkPlace.reset();
};

popupPlace.addEventListener("mousedown", closeHandler);
popupImageForm.addEventListener("mousedown", closeHandler);
popupProfile.addEventListener("mousedown", closeHandler);
popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", placeSubmit);
