export class Card {
  constructor(data, cardTemplate, openPopup) {
    this.data = data;
    this._openPopup = openPopup;
    this._getTemplate(cardTemplate);
  }

  _clickLike() {
    this._elementLike.classList.toggle("card__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate(cardTemplate) {
    this.cardTemplate = document
      .querySelector(cardTemplate)
      .content.querySelector(".card__item");
  }

  create() {
    this._element = this.cardTemplate.cloneNode(true);
    this._elementName = this._element.querySelector(".card__text");
    this._elementImage = this._element.querySelector(".card__image");
    this._elementDelete = this._element.querySelector(".card__delete");
    this._elementLike = this._element.querySelector(".card__like");

    this._elementName.textContent = this.data.name;
    this._elementImage.src = this.data.link;
    this._elementImage.alt = this.data.name;

    this._setListeners();

    return this._element;
  }

  _setListeners() {
    this._elementLike.addEventListener("click", () => this._clickLike());
    this._elementDelete.addEventListener("click", () => this._deleteCard());
    this._elementImage.addEventListener("click", () => this._openPopup(this.data));
  }
}
