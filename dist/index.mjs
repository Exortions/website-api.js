// src/index.ts
import fetch from "node-fetch";
var BTEWebsiteApi = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = "http://buildtheearth.net/api";
    this.apiVersion = "v1";
    this.apiBaseUrl = `${this.apiUrl}/${this.apiVersion}`;
    this.apiHeaders = {
      "Host": "buildtheearth.net",
      "Accept": "application/json",
      "Authorization": `Bearer ${this.apiKey}`
    };
  }
  async get(url, params = {}) {
    const query = new URLSearchParams(params);
    const fullUrl = `${this.apiBaseUrl}${url}?${query.toString()}`;
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: this.apiHeaders
    });
    const json = await response.json();
    return json;
  }
  async post(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: this.apiHeaders,
      body: JSON.stringify(params)
    });
    const json = await response.json();
    return json;
  }
  async put(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: this.apiHeaders,
      body: JSON.stringify(params)
    });
    const json = await response.json();
    return json;
  }
  async delete(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await fetch(fullUrl, {
      method: "DELETE",
      headers: this.apiHeaders,
      body: JSON.stringify(params)
    });
    const json = await response.json();
    return json;
  }
  async getMembers() {
    const response = await this.get("/members");
    if (response.error) {
      throw new WebsiteApiError(response.error);
    }
    return response.members;
  }
  async getLocations() {
    const response = await this.get("/locations");
    if (response.error) {
      throw new WebsiteApiError(response.error);
    }
    return response.locations;
  }
  async getRegions(id) {
    const response = await this.get(`/locations/${id}/regions`);
    if (response.error) {
      throw new WebsiteApiError(response.error);
    }
    return response.regions;
  }
  async getApplications(applicationFilter = "pending") {
    const response = await this.get(`/applications/${applicationFilter}`);
    if (response.error) {
      throw new WebsiteApiError(response.error);
    }
    return response.applications;
  }
  async ping() {
    return (await this.get(`/ping`)).ping;
  }
};
var WebsiteApiError = class extends Error {
  constructor(message = "Unknown") {
    super(message);
    this.message = message;
  }
};
export {
  WebsiteApiError,
  BTEWebsiteApi as default
};
