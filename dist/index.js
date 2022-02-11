var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  WebsiteApiError: () => WebsiteApiError,
  default: () => BTEWebsiteApi
});
var import_node_fetch = __toESM(require("node-fetch"));
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
    const response = await (0, import_node_fetch.default)(fullUrl, {
      method: "GET",
      headers: this.apiHeaders
    });
    const json = await response.json();
    return json;
  }
  async post(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await (0, import_node_fetch.default)(fullUrl, {
      method: "POST",
      headers: this.apiHeaders,
      body: JSON.stringify(params)
    });
    const json = await response.json();
    return json;
  }
  async put(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await (0, import_node_fetch.default)(fullUrl, {
      method: "PUT",
      headers: this.apiHeaders,
      body: JSON.stringify(params)
    });
    const json = await response.json();
    return json;
  }
  async delete(url, params = {}) {
    const fullUrl = `${this.apiBaseUrl}${url}`;
    const response = await (0, import_node_fetch.default)(fullUrl, {
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
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebsiteApiError
});
