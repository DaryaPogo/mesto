const openPopupProfileBtn = document.querySelector(".profile__change");
const openPopupPlaceBtn = document.querySelector(".profile__submit");
const popupActiveClass = "popup_opened";
const popupName = document.querySelector(".popup__input_type_name");
const popupJob = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formProfile = document.querySelector(".popup__form-profile");

const formPlace = document.querySelector(".popup__form-place");
const popupPlaceName = document.querySelector(".popup__input_type_place");
const popupLinkPlace = document.querySelector(".popup__input_type_link");

const closePopupBtn = document.querySelector(".popup__close");

const popupProfile = document.querySelector(".popup-profile");
const popupPlace = document.querySelector(".popup-place");

const card = document.querySelector(".card__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__item");

const popupImageText = document.querySelector(".popup__image-text");
const popupImage = document.querySelector(".popup__image");
const popupImageForm = document.querySelector(".popup__image-form");
const popupImageClose = document.querySelector(".popup__close-image-form");

const closePopupProfile = document.querySelector(".popup__close-profile");
const closePopupPlace = document.querySelector(".popup__close-place");

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
}

function openProfilePopup() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function openPlacePopup() {
  openPopup(popupPlace);
  popupPlaceName.value = "";
  popupLinkPlace.value = "";
}

function closePopup(popup) {
  popup.classList.remove(popupActiveClass);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(popupProfile);
}

const cardElement = (item) => {
  const element = cardTemplate.cloneNode(true);
  const elementName = element.querySelector(".card__text");
  const elementImage = element.querySelector(".card__image");
  const elementDelete = element.querySelector(".card__delete");
  const elementLike = element.querySelector(".card__like");
  const elementSource = element.querySelector(".card__image");

  elementName.textContent = item.name;
  elementSource.src = item.link;

  elementLike.addEventListener("click", () => clickLike(elementLike));
  elementDelete.addEventListener("click", () => deleteCard(element));
  elementImage.addEventListener("click", () =>
    openImage(elementName, elementSource)
  );
  createNewCard(element);
  return element;
};

const placeSubmit = (event, element) => {
  event.preventDefault();
  cardElement({
    name: popupPlaceName.value,
    link: popupLinkPlace.value,
  });
  closePopup(popupPlace);
};

function createNewCard(element) {
  card.prepend(element);
}

initialCards.forEach((element) => {
  card.append(cardElement(element));
});

const clickLike = (elementLike) => {
  elementLike.classList.toggle("card__like_active");
};

const deleteCard = (element) => {
  element.remove();
};

const openImage = (elementName, elementSource) => {
  openPopup(popupImageForm);
  popupImage.src = elementSource.src;
  popupImageText.textContent = elementName.textContent;
};

openPopupProfileBtn.addEventListener("click", openProfilePopup);
openPopupPlaceBtn.addEventListener("click", openPlacePopup);
closePopupPlace.addEventListener("click", () => {
  closePopup(popupPlace);
});
closePopupProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});
popupImageClose.addEventListener("click", () => {
  closePopup(popupImageForm);
});
formProfile.addEventListener("submit", formSubmitHandler);
formPlace.addEventListener("submit", placeSubmit);
