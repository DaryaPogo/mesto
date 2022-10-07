const openFormBtn = document.querySelector(".profile__change");
const formElement = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const formActive = "popup_opened";
const closeProfileBtn = document.querySelector(".popup__close");
const popupName = document.querySelector(".popup__input_type_name");
const popupJob = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

function openForm() {
  formElement.classList.add(formActive);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}

function closePopup() {
  formElement.classList.remove(formActive);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
}

openFormBtn.addEventListener("click", openForm);
closeProfileBtn.addEventListener("click", closePopup);
form.addEventListener("submit", formSubmitHandler);
