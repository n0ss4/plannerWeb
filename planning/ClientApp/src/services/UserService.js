export default class UserService {
  // Initializing important variables
  constructor(domain) {
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUsers() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    headers["Authorization"] = "Bearer " + this.getToken();

    return fetch("/api/usuarios", {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }
}
