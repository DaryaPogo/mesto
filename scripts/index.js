import { Card } from "./card.js";
import { FormValidation } from "./FormValidator.js";
import { formValidationSelectors } from "./constants.js";
import { initialCards } from "./cardMassiv.js";
import {
  popupProfileOpenBtn,
  popupPlaceOpenBtn,
  popupJob,
  popupName,
  profileName,
  profileJob,
  popupProfile,
  popupPlace,
  cardsWrapper,
  popupImageForm,
} from "./utils.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const formProfileValidator = new FormValidation(
  formValidationSelectors,
  popupProfile
);

formProfileValidator.enableValidation();

const popupProfileEvent = new Popup(popupProfile);
popupProfileEvent.setEventListeners();

const popupPlaceEvent = new Popup(popupPlace);
popupPlaceEvent.setEventListeners();

const popupImageEvent = new PopupWithImage(popupImageForm);
popupImageEvent.setEventListeners();

const popupProfileInfo = new UserInfo({ profileName, profileJob });

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item))
    },
  },
  cardsWrapper
);

const createCard = (item) => { 
  const card = new Card(item, "#card-template", popupImageEvent.openImg); 
  const element = card.create(); 
  return element;
}; 

const formPlaceValidator = new FormValidation(
  formValidationSelectors,
  popupPlace
);

formPlaceValidator.enableValidation();

const PopupWithFormProfile = new PopupWithForm(popupProfile, {
  handlerSubmit: (item) => {
    popupProfileInfo.setUserInfo({
      name: item.name,
      job: item.job,
    });
  },
});

PopupWithFormProfile.setEventListeners();

function openProfilePopup() {
  const { name, job } = popupProfileInfo.getUserInfo({});
  popupName.value = name;
  popupJob.value = job;
  popupProfileEvent.open();
}

function openPlacePopup() {
  popupPlaceEvent.open();
  formPlaceValidator.disabledButton();
}

const PopupWithFormPlace = new PopupWithForm(popupPlace, {
  handlerSubmit: (inputList) => {
    cardList.addNewCard(createCard({
      name: inputList.place,
      link: inputList.link,
    }));
  },
});

PopupWithFormPlace.setEventListeners();

cardList.renderer();

popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
