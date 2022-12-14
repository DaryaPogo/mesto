export class UserInfo {
  constructor({profileName, profileJob}) {
    this.name = profileName;
    this.job = profileJob;
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
    }
  }

  setUserInfo({name, job}) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}
