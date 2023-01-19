export class UserInfo {
  constructor(profileName, profileJob, popupAvatar) {
    this.name = profileName;
    this.job = profileJob;
    this._avatar = popupAvatar;
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
    }
  }

  setUserInfo(item) {
    this.name.textContent = item.name;
    this.job.textContent = item.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

}
