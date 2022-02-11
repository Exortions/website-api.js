declare class BTEWebsiteApi {
    apiKey: string;
    apiUrl: string;
    apiVersion: string;
    apiBaseUrl: string;
    apiHeaders: Record<string, string>;
    constructor(apiKey: string);
    get(url: string, params?: Record<string, string>): Promise<any>;
    post(url: string, params?: Record<string, string>): Promise<any>;
    put(url: string, params?: Record<string, string>): Promise<any>;
    delete(url: string, params?: Record<string, string>): Promise<any>;
    /**
   * Fetch all members of a team.
   *
   * @return {Array<Member>} An array of member objects
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @since 1.0.0
   */
    getMembers(): Promise<Array<Member>>;
    /**
   * Fetch all locations of a team.
   *
   * @return {Array<Location>} An array of location objects
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @since 1.0.0
   */
    getLocations(): Promise<Array<Location>>;
    /**
   * Retrieve all region coordinates of a build.
   *
   * @param {string} id The id of the build
   *
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @return {Array<Region>} An array of region file names
   * @since 1.0.0
   */
    getRegions(id: string): Promise<Array<Region>>;
    /**
   * Retrieve all region coordinates of a build.
   *
   * @param {string} applicationFilter The user id to be used to filter applications (not required)
   *
   * @throws {WebsiteApiError} If anything invalid/nonexistant was requested
   * @return {Array<ApplicationSubmission>} An array of application objects
   * @since 1.0.0
   */
    getApplications(applicationFilter?: Snowflake): Promise<Array<ApplicationSubmission>>;
    /**
   * Ping
   *
   * @return {String} pong.
   * @since 1.0.0
   */
    ping(): Promise<"pong">;
}
interface Member extends User {
    role: TeamRole;
}
interface Location {
    id: number;
    name: string;
    regions: number;
    explansionPending: boolean;
    note: string;
}
interface ApplicationSubmission {
    id: number;
    user: User;
    answers: Array<ApplicationQuestion>;
    mediaUrl: string;
}
interface User {
    discordTag: String;
    discordId: Snowflake;
}
interface ApplicationQuestion {
    id: number;
    question: string;
    answer: string;
}
declare type Region = string;
declare type Snowflake = string;
declare type TeamRole = "leader" | "coleader" | "reviewer" | "builder";
declare class WebsiteApiError extends Error {
    constructor(message?: string);
}

export { ApplicationQuestion, ApplicationSubmission, Location, Member, Region, Snowflake, TeamRole, User, WebsiteApiError, BTEWebsiteApi as default };
