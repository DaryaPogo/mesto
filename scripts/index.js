const openForm = document.querySelector('.profile__change');
const formElement = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const formActive = 'popup_opened';
const closeProfileBtn = document.querySelector('.popup__close');
const popupName = document.querySelector('.popup__input[name="name"]');
const popupJob = document.querySelector('.popup__input[name="job"]');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

openForm.addEventListener('click', () => {
  formElement.classList.add(formActive);
}); 

function closePopupBtn () {
  formElement.classList.remove(formActive);
};
closeProfileBtn.addEventListener('click', closePopupBtn); 

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopupBtn();
}
form.addEventListener('submit', formSubmitHandler); 