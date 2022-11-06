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
const btnAddPlace = popupPlace.querySelector(".popup__button");
const cardList = document.querySelector(".card__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__item");

const popupImageText = document.querySelector(".popup__image-text");
const popupImage = document.querySelector(".popup__image");
const popupImageForm = document.querySelector(".popup-image");
const popupImageClose = document.querySelector(".popup__close-image-form");

const popupProfileClose = document.querySelector(".popup__close-profile");
const popupPlaceClose = document.querySelector(".popup__close-place");

function openPopup(popup) {
  popup.classList.add(popupActiveClass);
  popup.addEventListener("mousedown", overlayHandler);
}

function openProfilePopup() {
  openPopup(popupProfile);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function openPlacePopup() {
  openPopup(popupPlace);
  disabledButton(btnAddPlace, "popup__button_disabled");
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

const overlayHandler = (event) => {
  if (event.target.classList.contains("popup_opened") || event.target.classList.contains("popup__close")) {
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
  const element = cardTemplate.cloneNode(true);
  const elementName = element.querySelector(".card__text");
  const elementImage = element.querySelector(".card__image");
  const elementDelete = element.querySelector(".card__delete");
  const elementLike = element.querySelector(".card__like");

  elementName.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;

  elementLike.addEventListener("click", () => clickLike(elementLike));
  elementDelete.addEventListener("click", () => deleteCard(element));
  elementImage.addEventListener("click", () =>
    openImage(elementName, elementImage)
  );
  return element;
};

//добавляем новую карточку первой
function prependCard(element) {
  cardList.prepend(element);
}

//вставляем массив карточек
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

const clickLike = (elementLike) => {
  elementLike.classList.toggle("card__like_active");
};

const deleteCard = (element) => {
  element.remove();
};

const openImage = (elementName, elementImage) => {
  openPopup(popupImageForm);
  popupImage.src = elementImage.src;
  popupImageText.textContent = elementName.textContent;
  popupImage.alt = elementName.textContent;
};

document.addEventListener("keydown", keyHandler);
popupProfileOpenBtn.addEventListener("click", openProfilePopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
formProfile.addEventListener("submit", handleProfileFormSubmit);
formPlace.addEventListener("submit", placeSubmit);
