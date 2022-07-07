import axios from "axios";

export default class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    window.localStorage.setItem("lifetracker_token", token);
  }

  async request({ endpoint, method = "GET", data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    if (endpoint == "auth/login") {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const result = await axios.post(url, data, { headers });
        window.localStorage.removeItem("lifetracker_token");
        console.log("auth/login res", result);
        window.localStorage.setItem("lifetracker_token", result.data.token);
        return result.data;
      } catch (err) {
        console.log("apiclient login err", err);
        window.localStorage.removeItem("lifetracker_token");
        return err;
      }
    } else if (endpoint == "auth/register") {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const result = await axios.post(url, data, { headers });
        this.login({ email: data.email, password: data.password });
        return result.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    } else if (endpoint == "auth/me") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authentication: `Bearer ${data}`,
        };

        const result = await axios.get(url, headers);
        return result.data;
      } catch (err) {
        return err;
      }
    }

    // const headers = {
    //   "Content-Type": "application/json",
    // };

    // if (this.token) {
    //   headers["Authorization"] = `Bearer ${this.token}`;
    // }

    // try {
    //   const res = await axios({ url, method, data, headers });
    //   return { data: res.data, error: null };
    // } catch (err) {
    //   console.error({ errorResponse: error.response });
    //   const message = error?.response?.data?.error?.message;
    //   return { data: null, error: message || String(error) };
    // }
  }

  async login(credentials) {
    return await this.request({
      endpoint: "auth/login",
      method: "POST",
      data: credentials,
    });
  }

  async signup(credentials) {
    return await this.request({
      endpoint: "auth/register",
      method: "POST",
      data: credentials,
    });
  }

  async fetchUserFromToken() {
    console.log("this.token", this.token);
    return await this.request({
      endpoint: "auth/me",
      method: "GET",
      data: this.token,
    });
  }
}
