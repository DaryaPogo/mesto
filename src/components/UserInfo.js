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
      avatar: this._avatar.src,
    };
  }

  setUserInfo(userData) {
    this.name.textContent = userData.name;
    this.job.textContent = userData.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
