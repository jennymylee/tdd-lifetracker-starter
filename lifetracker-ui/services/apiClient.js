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
        const result = await axios.post(url, data, headers);
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
        console.log("this is the data", data);
        const result = await axios.post(url, data, headers);
        console.log("result from reg post", result.data);
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
          Authorization: `Bearer ${data}`,
        };
        // console.log("data--------", data);

        const result = await axios.get(url, { headers });
        return result.data;
      } catch (err) {
        return err;
      }
    } else if (endpoint == "nutrition" && method == "GET") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authentication: `Bearer ${this.token}`,
          user_id: data,
        };
        console.log("data from get nutrition:", data);

        const result = await axios.get(url, { headers });
        return result.data;
      } catch (err) {
        return err;
      }
    } else if (endpoint == "nutrition/:nutritionId") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        };
        const result = await axios.get(
          `http://localhost:3001/nutrition/${data}`,
          { headers }
        );
        return result.data;
      } catch (err) {
        return err;
      }
    } else if (endpoint == "nutrition" && method == "POST") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authentication: `Bearer ${this.token}`,
        };

        const result = await axios.post(url, data, { headers });
        return result.data;
      } catch (err) {
        return err;
      }
    } else if (endpoint == "activity") {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authentication: `Bearer ${this.token}`,
          user_id: data,
        };
        console.log("data from get activity:", data);

        const result = await axios.get(url, { headers });
        console.log("get activity RES:", result);
        return result.data;
      } catch (err) {
        return err;
      }
    }
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

  async getNutritionsFromUser(userId) {
    console.log("userId in getNutritionsFromUser in apiClient:", userId);
    return await this.request({
      endpoint: "nutrition",
      method: "GET",
      data: userId,
    });
  }

  async getNutritionById(nutritionId) {
    return await this.request({
      endpoint: "nutrition/:nutritionId",
      method: "GET",
      data: nutritionId,
    });
  }

  async postNutrition(item, userId) {
    return await this.request({
      endpoint: "nutrition",
      method: "POST",
      data: {
        user_id: userId,
        name: item.name,
        category: item.category,
        calories: item.calories,
        quantity: item.quantity,
        image_url: item.imageUrl,
      },
    });
  }

  async getActivityFromUser(userId) {
    return await this.request({
      endpoint: "activity",
      method: "GET",
      data: userId,
    });
  }
}
