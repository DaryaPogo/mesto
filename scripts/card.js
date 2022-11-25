import{popupImageForm, popupImageText, popupImage} from './index.js'

export class Card {

  constructor(data, openPopup) {
    this.data = data;
    this.openPopup = openPopup;
    this.getTemplate();
  }
  
  _clickLike() {
    this.elementLike.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this.element.remove();
  }

  getTemplate() {
    this.template = document
      .querySelector("#card-template")
      .content.querySelector(".card__item");
  }

  create() {
    this.element = this.template.cloneNode(true);
    this.elementName = this.element.querySelector(".card__text");
    this.elementImage = this.element.querySelector(".card__image");
    this.elementDelete = this.element.querySelector(".card__delete");
    this.elementLike = this.element.querySelector(".card__like");

    this.elementName.textContent = this.data.name;
    this.elementImage.src = this.data.link;
    this.elementImage.alt = this.data.name;

    this._setListeners();
    
    return this.element;
  }

  _openImage() {
    this.openPopup(popupImageForm);
    popupImage.src = this.elementImage.src;
    popupImageText.textContent = this.elementName.textContent;
    popupImage.alt = this.elementName.textContent;
  }

  _setListeners() {
    this.elementLike.addEventListener("click", () =>
      this._clickLike()
    );
    this.elementDelete.addEventListener("click", () =>
      this._deleteCard()
    );
    this.elementImage.addEventListener("click", () =>
      this._openImage()
    );
  }

}
