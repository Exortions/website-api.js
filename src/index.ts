// @ts-ignore
import fetch from "node-fetch"


export default class BTEWebsiteApi {
    apiKey: string
    apiUrl: string
    apiVersion: string;
    apiBaseUrl: string;
    apiHeaders: Record<string, string>
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.apiUrl = "http://buildtheearth.net/api";
        this.apiVersion = "v1";
        this.apiBaseUrl = `${this.apiUrl}/${this.apiVersion}`;
        this.apiHeaders = {
            'Host': 'buildtheearth.net',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }
    

    async get(url: string, params: Record<string, string> = {} ) {
        const query = new URLSearchParams(params);
        const fullUrl = `${this.apiBaseUrl}${url}?${query.toString()}`;
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: this.apiHeaders
        });
        const json = await response.json();
        return json;
    }

    async post(url: string, params: Record<string, string> = {}) {
        const fullUrl = `${this.apiBaseUrl}${url}`;
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: this.apiHeaders,
            body: JSON.stringify(params)
        });
        const json = await response.json();
        return json;
    }

    async put(url: string, params: Record<string, string> = {}) {
        const fullUrl = `${this.apiBaseUrl}${url}`;
        const response = await fetch(fullUrl, {
            method: 'PUT',
            headers: this.apiHeaders,
            body: JSON.stringify(params)
        });
        const json = await response.json();
        return json;
    }

    async delete(url: string, params: Record<string, string> = {}) {
        const fullUrl = `${this.apiBaseUrl}${url}`;
        const response = await fetch(fullUrl, {
            method: 'DELETE',
            headers: this.apiHeaders,
            body: JSON.stringify(params)
        });
        const json = await response.json();
        return json;
    }

    /**
   * Fetch all members of a team.
   *
   * @return {Array<Member>} An array of member objects
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @since 1.0.0
   */

    async getMembers(): Promise<Array<Member>> {
        const response = await this.get('/members')
        if (response.error) {
            throw new WebsiteApiError(response.error);
        }
        return response.members;
    }

    /**
   * Fetch all locations of a team.
   *
   * @return {Array<Location>} An array of location objects
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @since 1.0.0
   */

    async getLocations(): Promise<Array<Location>> {
        const response = await this.get('/locations')
        if (response.error) {
            throw new WebsiteApiError(response.error);
        }
        return response.locations;
    }

    /**
   * Retrieve all region coordinates of a build.
   * 
   * @param {string} id The id of the build
   *
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @return {Array<Region>} An array of region file names
   * @since 1.0.0
   */

    async getRegions(id: string): Promise<Array<Region>> {
        const response = await this.get(`/locations/${id}/regions`)
        if (response.error) {
            throw new WebsiteApiError(response.error);
        }
        return response.regions;
    }

    /**
   * Retrieve all region coordinates of a build.
   * 
   * @param {string} applicationFilter The user id to be used to filter applications (not required)
   *
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @return {Array<ApplicationSubmission>} An array of application objects
   * @since 1.0.0
   */

    async getApplications(applicationFilter: Snowflake = "pending"): Promise<Array<ApplicationSubmission>> {
        const response = await this.get(`/applications/${applicationFilter}`);
        if (response.error) {
            throw new WebsiteApiError(response.error);
        }
        return response.applications;
    }


    /**
   * Ping
   *
   * @return {String} pong.
   * @since 1.0.0
   */

    async ping(): Promise<"pong"> {
        return (await this.get(`/ping`)).ping;
    }
}

export interface Member extends User {
    role: TeamRole
}

export interface Location {
    id: number
    name: string
    regions: number
    explansionPending: boolean
    note: string
}

export interface ApplicationSubmission {
    id: number
    user: User
    answers: Array<ApplicationQuestion>
    mediaUrl: string
}


export interface User {
    discordTag: String
    discordId: Snowflake
}

export interface ApplicationQuestion {
    id: number
    question: string
    answer: string
}



export type Region = string
export type Snowflake = string
export type TeamRole = "leader" | "coleader" | "reviewer" | "builder"

export class WebsiteApiError extends Error {
    constructor(message = "Unknown") {
        super(message);
        this.message = message;
    }
}