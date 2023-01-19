export class Card {
  constructor(data, cardTemplate, openPopup, userId, onRemove, api) {
    this.userId = userId;
    this.data = data;
    this._openPopup = openPopup;
    this._getTemplate(cardTemplate);
    this._onRemove = onRemove;
    this.handleRemove = this.handleRemove.bind(this);
    this._api = api;
  }

  clickLike() {
    if (this.data.likes.find((like) => like._id === this.userId)) {
      this._api.cardDeleteLike(this.data._id).then((data) => {
        this.data = data;
        this._likes = this.data.likes;
        this._elementLikeQuantity.textContent = this._likes.length;
        this._elementLike.classList.remove("card__like_active");
      });
    } else {
      this._api
        .cardLike(this.data._id)
        .then((data) => {
          this.data = data;
          this._likes = this.data.likes;
          this._elementLikeQuantity.textContent = this._likes.length;
          this._elementLike.classList.add("card__like_active");
        })
        .catch((err) => console.log(err));
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleRemove() {
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
    this._removeTrash();
    this._setListeners();
    this._hasActiveLike();
    return this._element;
  }

  _hasActiveLike() {
    if (this.data.likes.find((like) => like._id === this.userId)) {
      this._elementLike.classList.add("card__like_active");
    } else {
      this._elementLike.classList.remove("card__like_active");
    }
  }
  
  _removeTrash() {
    if (this.userId != this.data.owner._id) {
      this._elementDelete.remove(".card__delete");
    }
  }

  _setListeners() {
    this._elementLike.addEventListener("click", () => this.clickLike());
    this._elementDelete.addEventListener("click", () => this.handleRemove());
    this._elementImage.addEventListener("click", () =>
      this._openPopup(this.data)
    );
  }
}
