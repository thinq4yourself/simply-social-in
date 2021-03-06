# ![Simply Social](project-logo.png)

> ### React + Redux social pattern based app based on simple API spec.

### [Simply Social demo app](https://simply-social-in.firebaseapp.com)

- **Demo URL**: `https://simply-social-in.firebaseapp.com`
- Username: `sampleuser@tester.com`
- Password: `testtest`

> This demo account is provided for quick access. 
>
> You can easily [create your account here](https://simply-social-in.firebaseapp.com/register).

## Getting started

> **Github repo**: https://github.com/thinq4yourself/simply-social-in

To get the app running locally:

- Clone this repo
- `yarn install` to install all required dependencies
- `yarn start` to start the local server (this project uses create-react-app)

```
$ git clone git@github.com:thinq4yourself/simply-social-in.git
$ cd simply-social-in
$ yarn install
$ yarn start
```

The local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure this port in the scripts section of [`package.json`](https://github.com/thinq4yourself/simply-social-in/blob/master/package.json). This app uses [cross-env](https://github.com/kentcdodds/cross-env) to set environment variable PORT for React scripts, which is a Windows-compatible way of setting environment variables.

If you want to change the API URL to a local server, simply edit [`src/services/api.js`](https://github.com/thinq4yourself/simply-social-in/blob/master/src/services/api.js) and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)


## Functionality overview

The example application is a social site (i.e. a twitter.com clone) called "Simply Social". It uses a custom API for all requests, including authentication. This API is defined in Redux and communication is done via promises, to save time in writing a whole set of sagas this simple approach was chosen although not ideal in real world scenario.

### General features:

- Authentication via JWT (login/signup/logout)
- User model (sign up & user profile screens)
- Posts model 
- Comments on posts
- Paginated lists of posts
- Favorite posts
- Video vs Image post using tags
- Follow other users

### The general page breakdown:

- Home page (URL: `/` )
    - List of posts 
    - List of posts pulled from either user feed, image, or by video feed 
    - Pagination for list of posts 
    - Add as Favorite
- Sign in/Sign up pages (URL: `/#/login`, `/register` )
    - Use `JWT` (store the token in localStorage)
- Profile page (URL: `/#/@username`, `/@username/favorites`, `/@username/followers` )
    - Show basic user info 
    - List of posts populated from author's created posts or author's favorited posts
    - Add as Favorite
- Editor page to create/edit posts (URL: `/editor`, `/editor/post-slug` )
- Post page (URL: `/post/post-slug`)
    - Delete post button (only shown to post's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)

<br />

## Stack highlights
- [React](https://reactjs.org/) + [Redux](http://redux.js.org/)
- Dynamic routing with [React Router Dom](https://reacttraining.com/react-router/core/guides/philosophy/dynamic-routing)
- [Semantic UI](http://react.semantic-ui.com/) for React
- [Faker API](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html#random) for smart demo data
  - Live Posts/User API for even smart demo data
- [Filestack](https://www.filestack.com) for image/video upload

## Redux Overview
The app is built as a Redux pure app. Since the app is small I used minimalistic configuration and pure containers. 

Here are some of the available Redux actions and reducers being dispatched. You can checkout all of them out in [`src/reducers/*`](#)

```
export const APP_LOAD = 'APP_LOAD';
export const REDIRECT = 'REDIRECT';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const LOGIN_PAGE_UNLOADED = 'LOGIN_PAGE_UNLOADED';
export const REGISTER_PAGE_UNLOADED = 'REGISTER_PAGE_UNLOADED';
export const ASYNC_START = 'ASYNC_START';
export const ASYNC_END = 'ASYNC_END';

...

See code repository for more at ./src/reducers/
```

## App Hosting
I chose to host this on Firebase via CDN and reduce the overheard of a Node server. As a real world example this is lower maintenance and less overhead for simple apps and landing pages 

I only had to focus on the React app that runs in the browser. This makes the build and deploy process much, much faster. 

Plus - Firebase comes packed with features like Auth, Node in the cloud (Functions), Analytics, and more.

> I have also [mirrored](#heroku-demo) this at Heroku to show the ease of either platform - as requested in the specs :) 

### Firebase Demo
> - Firebase Demo: https://simply-social-in.firebaseapp.com
> - Firebase Project: https://console.firebase.google.com/project/simply-social-in/
>   - Request access to audit if you like

--- 

### Heroku Demo
> - Heroku Demo: https://simply-social-in.herokuapp.com/
> - Heroku Project: https://dashboard.heroku.com/apps/simply-social-in
>   - Request access to audit if you like

---

#### Use cases

| Case  | Url/Page  | Class  |
|---|:-:|---|
| User profile  | [@sampleusertester](https://simply-social-in.firebaseapp.com/@sampleusertester)  | Profile.js  |
| Favorites  | [/@sampleusertester/favorite](https://simply-social-in.firebaseapp.com/@sampleusertester/favorites)  | [`ProfileFavorites.js`](#)  |
| Followers  | [/@sampleusertester/follower](https://simply-social-in.firebaseapp.com/@sampleusertester/followers)  | [`ProfileFollwers.js`](#)  |
| Home  | [/home](https://simply-social-in.firebaseapp.com/)  | [`Home/index.js`](#)  |
| Add message  | [/home](https://simply-social-in.firebaseapp.com/)  | [`Home/Banner.js`](#)  |
| View message  | [/post/this-is-my-message-21frvs](https://simply-social-in.firebaseapp.com/post/this-is-my-message-21frvs)  | [`Post/index.js`](#)  |
| Edit message  | [/editor/this-is-my-message-21frvs](https://simply-social-in.firebaseapp.com/editor/this-is-my-message-21frvs)  | [`Post/index.js`](#)  |
| Delete message  | [/editor/this-is-my-message-21frvs](https://simply-social-in.firebaseapp.com/editor/this-is-my-message-21frvs)  | [`Post/index.js`](#)  |
| User Settings  | [/settings](https://simply-social-in.firebaseapp.com/settings)  | [`Settings.js`](#)  |
| Login  | [/login](https://simply-social-in.firebaseapp.com/login)  | [`Login.js`](#)  |
| Register  | [/register](https://simply-social-in.firebaseapp.com/register)  | [`Register.js`](#)  |
| Favorite  | [/](https://simply-social-in.firebaseapp.com/)  | [`PostPreview.js`](#)  |
| Unfavorite  | [/register](https://simply-social-in.firebaseapp.com/)  | [`PostPreview.js`](#)  |


---

## Deploy

### To deploy to Firebase:
```
$ firebase login  # login to firebase toolbelt
$ yarn build
$ firebase deploy
```

### To deploy to Heroku:
[Zero-configuration Deploy to Heroku](https://blog.heroku.com/deploying-react-with-zero-configuration)
```
$ heroku login  # login to firebase toolbelt
$ yarn build
$ git push heroku master
```

---

#### Invision + Sketch mockups

> Invision Project (basic): https://invis.io/U6E2I8N9P
<a href="https://invis.io/U6E2I8N9P" target="_blank"><img  src="https://projects.invisionapp.com/static-signed/live-embed/146645980/259626938/1/latest/1L6KV1T5YoUr2aM6ht344jClEDzyVtZrIHuV3gxY9bsirSw1JNWpxlE7Or9tAlilEnmNJOwyEpCXhze7SVlELkmlEPwlE/Artboard-2x-Home.png" /></a>
