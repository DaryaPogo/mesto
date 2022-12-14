import { Popup } from "./Popup.js";
import {  popupImageText, popupImage } from "./utils.js"
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
  }
  
  openImg = (data) => {
    popupImage.src = data.link;
    popupImageText.textContent = data.name;
    popupImage.alt = data.name;
    super.open();
  }
}