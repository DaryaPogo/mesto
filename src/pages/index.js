import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidator.js";
import {
  formValidationSelectors,
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
  popupDelete,
  popupAvatar,
  popupAvatarBtn,
  popupAvatarForm,
} from "../components/utils.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { API } from "../components/API.js";

import "./index.css"; // добавьте импорт главного файла стилей
import { data } from "autoprefixer";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "20d35879-9615-41b1-8abb-77eae2aa9639",
    "Content-Type": "application/json",
  },
};

const api = new API(apiConfig);
let userId;

api.getInfo().then((user) => (userId = user._id));

Promise.all([api.getInfo(), api.getCards()])
  .then(([user, data]) => {
    userInfo.setUserInfo(user);
    cardList.rendererItems(data);
    userInfo.setUserAvatar(user);
  })
  .catch((err) => {
    console.log(err);
  });

const formProfileValidator = new FormValidation(
  formValidationSelectors,
  popupProfile
);

formProfileValidator.enableValidation();

const popupImageEvent = new PopupWithImage(popupImageForm);
popupImageEvent.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob, popupAvatar);

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  cardsWrapper
);

const popupDeleteCard = new PopupWithConfirmation(popupDelete, {
  handelSubmit: (card) => {
    api.deleteCard(card._id)
        .then(() => {
            popupDeleteCard.close();
        })
        .catch((err) => {
            console.log(err);
        })
}
});

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    popupImageEvent.openImg,
    userId,
    async () => {
      popupDeleteCard.open();
      popupDeleteCard.handleSubmitConfirm(() => {
        api.deleteCard(card.data._id)
            .then(() => {
                card.deleteCard();
                popupDeleteCard.close();
            })
            .catch((err) => {
                console.log(err) })
      })
  },
    api
  )
  const element = card.create();
  return element;
}

const formPlaceValidator = new FormValidation(
  formValidationSelectors,
  popupPlace
);

formPlaceValidator.enableValidation();



const popupEditProfile = new PopupWithForm(popupProfile, {
  handlerSubmit: (item) => {
    popupEditProfile.serverUpload(true);
    api
      .editProfile(item)
      .then((item) => {
        userInfo.setUserInfo(item);
      })
      .catch((err) => console.log(err))
      .finally(popupEditProfile.serverUpload(false));
  },
});

popupEditProfile.setEventListeners();

function openProfilePopup() {
  const user = userInfo.getUserInfo();
  popupName.value = user.name;
  popupJob.value = user.job;
  popupEditProfile.open();
}

function openPlacePopup() {
  popupAddCard.open();
  formPlaceValidator.disabledButton();
}

const popupAddCard = new PopupWithForm(popupPlace, {
  handlerSubmit: (inputList) => {
    popupAddCard.serverUpload(true);
    api
      .addNewCard(inputList)
      .then((inputList) => cardList.prependItem(createCard(inputList)))
      .catch((err) => console.log(err))
      .finally(popupAddCard.serverUpload(false));
  },
});

popupAddCard.setEventListeners();

function openPopupAvatar() {
  popupChangeAvatar.open();
  formAvatarValidator.disabledButton();
}

const formAvatarValidator = new FormValidation(
  formValidationSelectors,
  popupAvatarForm
);

formAvatarValidator.enableValidation();

const popupChangeAvatar = new PopupWithForm(popupAvatarForm, {
  handlerSubmit: (data) => {
    popupChangeAvatar.serverUpload(true);
    api
      .changeAvatar(data)
      .then((avatar) =>
        userInfo.setUserAvatar(avatar).catch((err) => console.log(err))
      )
      .catch((err) => console.log(err))
      .finally(popupChangeAvatar.serverUpload(false));
  },
});

popupChangeAvatar.setEventListeners();

popupAvatarBtn.addEventListener("click", openPopupAvatar);
popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
