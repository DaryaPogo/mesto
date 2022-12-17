import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupElement) {
      super(popupElement);
      this._popupImageText = this.popupElement.querySelector(".popup__image-text");
      this._popupImage = this.popupElement.querySelector(".popup__image");
  }
  
  openImg = (data) => {
    this._popupImage.src = data.link;
    this._popupImageText.textContent = data.name;
    this._popupImage.alt = data.name;
    super.open();
  }
}