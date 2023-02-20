# 365 Talent Wrapper

The goal of the project was to demonstrate the capacity of interacting with the 365 API through another API.

Nothing's easier.

[Talent Wrapper class](./services/TalentWrapper.ts) provide you everything you need to archive your goal.

## Roadmap

### Features
 - [x] User login
 - [x] 365 Talents partner login
 - [ ] 365 Talents user login

### Partner routes
 - [x] /v1/skills
 - [x] /v1/skills/categories
 - [x] /v1/users
 - [x] /v1/users/active
 - [ ] /v1/user/validateCharter
 - [ ] /v1/opportunities/{id}

### User routes
- [x] /v1/suggestion
- [x] /v1/users/me
- [ ] /v1/users/me/document/{typeId}
- [x] /v1/opportunities/suggested
- [x] /v1/opportunities/types

## Usage

First things first, you need to import and instantiate the TalentWrapper class.
Reminder that this class have a dependency. ([APIWrapper.ts](./libs/APIWrapper.ts)) in the [libs](./libs) folder)

```typescript
import {TalentWrapper} from "./services/TalentWrapper";

const talentWrapper = new TalentWrapper('url_of_365_talents_API', true);
```

The first argument is the url of the 365Talents API you need to contact.
Second argument is optional, but define whether you are willing to contact the API as a partner.
I recommend setting it to `true` for clarity.

Second step is to set the credentials you have. Without them, it will be impossible to contact the API.

```typescript
talentWrapper.setPartnerCredential('cool_login_they_gave_you', 'super_secured_password');
```

Next, you should be able to contact the API for the first time.
Two context exists; Requesting as a partner and requesting as a user.

Note that for the next steps you will need to be in an async context.

### Requesting as a partner

Nothing else is required that the step before. You can use all functions tagged earlier in this README.

Example: 
```typescript
const skillsCategories = await talentWrapper.getSkillsCategories();
```

### Requesting as a user

In order to request as a user you will need to signin first.
You need to provide a clientId (user identifier) to the function `userAuthenticate`.

```typescript
const userLogin = await talentWrapper.userAuthenticate('best_user_id');
```

The user login variable will contain a JWT related to a user.
You are now able to use the second part of tha API and request for user data.

As each request to the 365Talents API can be for a different user don't forget to set the `userToken` like such:
```typescript
talentWrapper.userToken = 'astonishing_token';
```

After you can use any implemented request.

Example:
```typescript
const opportunities = await talentWrapper.getUserOpportunities();
```

Enjoy! :)
