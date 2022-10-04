const openForm = document.querySelector('.profile__change');
const formElement = document.querySelector('.popup');
const Form_active = 'popup_opened';
const closeProfileBtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

openForm.addEventListener('click', () => {
  formElement.classList.add(Form_active);
}); 

closeProfileBtn.addEventListener('click', (e) => {
  e.preventDefault(); 
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formElement.classList.remove(Form_active);
}); 

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  formElement.classList.remove(Form_active);
}
formElement.addEventListener('submit', formSubmitHandler); 