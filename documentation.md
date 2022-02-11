## API Documentation
_Please read https://github.com/BuildTheEarth/build-team-api as well_

*Object definitions can be found in the [typings](dist/index.d.ts)

### Getting started
To create a instance you must provide a token for the https://buildtheearth.net API.
```js
const websiteApi = new BTEWebsiteAPI("token")
```

### Methods
____

**getMembers**:
_Get members of a team._

returns - An array of member objects*

throws - WebsiteApiError, if anything invalid/nonexistant was requested

____

**getLocations**:
_Get locations of team._

returns - An array of location objects*

throws - WebsiteApiError, if anything invalid/nonexistant was requested

____

**getRegions**:
_Get regions of a build._

param - String, the id of the build to get regions for

returns - An array of strings that represent region names*

throws - WebsiteApiError, if anything invalid/nonexistant was requested

____

**getApplications**:
_Get applications of a team._

param - (OPTIONAL) String, the id of the user to filter applications for

returns - An array of strings that represent region names*

throws - WebsiteApiError, if anything invalid/nonexistant was requested

____

**ping:** Pong!🏓
