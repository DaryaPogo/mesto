import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidator.js";
import { formValidationSelectors } from "../components/constants.js";
import { initialCards } from "../components/cardMassiv.js";
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
} from "../components/utils.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import './index.css'; // добавьте импорт главного файла стилей

const formProfileValidator = new FormValidation(
  formValidationSelectors,
  popupProfile
);

formProfileValidator.enableValidation();

const popupImageEvent = new PopupWithImage(popupImageForm);
popupImageEvent.setEventListeners();

const userInfo = new UserInfo({ profileName, profileJob });

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

const popupEditProfile = new PopupWithForm(popupProfile, {
  handlerSubmit: (item) => {
    userInfo.setUserInfo({
      name: item.name,
      job: item.job,
    });
  },
});

popupEditProfile.setEventListeners();

function openProfilePopup() {
  const { name, job } = userInfo.getUserInfo({});
  popupName.value = name;
  popupJob.value = job;
  popupEditProfile.open();
}

function openPlacePopup() {
  popupAddCard.open();
  formPlaceValidator.disabledButton();
}

const popupAddCard = new PopupWithForm(popupPlace, {
  handlerSubmit: (inputList) => {
    cardList.prependItem(createCard({
      name: inputList.place,
      link: inputList.link,
    }));
  },
});

popupAddCard.setEventListeners();

cardList.rendererItems();

popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
