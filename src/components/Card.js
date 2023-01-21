export class Card {
  constructor(data, cardTemplate, openPopup, userId, onRemove, onLike) {
    this.userId = userId;
    this.data = data;
    this._handleImageClick = openPopup;
    this._getTemplate(cardTemplate);
    this._onRemove = onRemove;
    this._handleRemove = this._handleRemove.bind(this);
    this._onLike = onLike;
    this._handleLike = this._handleLike.bind(this);
  }

  _handleLike() {
    this._checkIsLiked();
    this._onLike(this);
  }

  handleLikeClick(data) {
    this.data = data;
    this._likes = this.data.likes;
    this._elementLikeQuantity.textContent = this._likes.length;
    this._checkIsLiked();
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleRemove() {
    this._onRemove(this);
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
    this._elementLike = this._element.querySelector(".card__like");
    this._elementDelete = this._element.querySelector(".card__delete");
    this._elementLikeQuantity = this._element.querySelector(
      ".card__like-quantity"
    );
    this._elementLikeQuantity.textContent = this.data.likes.length;
    this._elementName.textContent = this.data.name;
    this._elementImage.src = this.data.link;
    this._elementImage.alt = this.data.name;
    this._checkDeleteButton();
    this._setListeners();
    this._checkIsLiked();
    return this._element;
  }

  compareId() {
    if (this.data.likes.find((like) => like._id === this.userId))
    return true
  }

  _checkIsLiked() {
    if (this.compareId()) {
      this._elementLike.classList.add("card__like_active");}
    else{
      this._elementLike.classList.remove("card__like_active");}
  }

  _checkDeleteButton() {
    if (this.userId !== this.data.owner._id) {
      this._elementDelete.remove(".card__delete");
    }
  }

  _setListeners() {
    this._elementLike.addEventListener("click", () => this._handleLike());
    this._elementDelete.addEventListener("click", () => this._handleRemove());
    this._elementImage.addEventListener("click", () =>
      this._handleImageClick(this.data)
    );
  }
}
