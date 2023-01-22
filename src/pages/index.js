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
  apiConfig,
} from "../utils/utils.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { API } from "../components/API.js";

import "./index.css"; // добавьте импорт главного файла стилей
import { data } from "autoprefixer";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

const api = new API(apiConfig);
let userId;

Promise.all([api.getInfo(), api.getCards()])
  .then(([user, data]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsSection.rendererItems(data);
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

const cardsSection = new Section(
  {
    renderer: (data) => {
      cardsSection.addItem(createCard(data));
    },
  },
  cardsWrapper
);

const popupDeleteCard = new PopupWithConfirmation(popupDelete, {
  handelSubmit: (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupDeleteCard.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    popupImageEvent.open,
    userId,
    () => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitCallback(() => {
        api
          .deleteCard(card.data._id)
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    () => {
      if (card.isLiked()) {
        api
          .cardDeleteLike(data._id)
          .then((data) => card.updateLikes(data))
          .catch((err) => {
            console.log(err);
          });
      } else
        api
          .cardLike(data._id)
          .then((data) => card.updateLikes(data))
          .catch((err) => {
            console.log(err);
          });
    }
  );
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
    popupEditProfile.setIsLoading(true);
    api
      .editProfile(item)
      .then((item) => {
        userInfo.setUserInfo(item);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditProfile.setIsLoading(false));
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
  formPlaceValidator.disableButton();
}

const popupAddCard = new PopupWithForm(popupPlace, {
  handlerSubmit: (inputList) => {
    popupAddCard.setIsLoading(true);
    api
      .addNewCard(inputList)
      .then((inputList) => {
        cardsSection.prependItem(createCard(inputList));
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddCard.setIsLoading(false));
  },
});

popupAddCard.setEventListeners();

function openPopupAvatar() {
  popupChangeAvatar.open();
  formAvatarValidator.disableButton();
}

const formAvatarValidator = new FormValidation(
  formValidationSelectors,
  popupAvatarForm
);

formAvatarValidator.enableValidation();

const popupChangeAvatar = new PopupWithForm(popupAvatarForm, {
  handlerSubmit: (data) => {
    popupChangeAvatar.setIsLoading(true);
    api
      .changeAvatar(data)
      .then((avatar) => {
        userInfo.setUserAvatar(avatar);
        popupChangeAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupChangeAvatar.setIsLoading(false));
  },
});

popupChangeAvatar.setEventListeners();

popupAvatarBtn.addEventListener("click", openPopupAvatar);
popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
