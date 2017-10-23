# ![Simply Social](project-logo.png)

> ### React + Redux social pattern based app based on simple API spec.

#### Invision + Sketch mockups

<a href="https://invis.io/U6E2I8N9P" target="_blank"><img  src="https://projects.invisionapp.com/static-signed/live-embed/146645980/259626938/1/latest/1L6KV1T5YoUr2aM6ht344jClEDzyVtZrIHuV3gxY9bsirSw1JNWpxlE7Or9tAlilEnmNJOwyEpCXhze7SVlELkmlEPwlE/Artboard-2x-Home.png" /></a>

### [Demo](https://simply-social-in.firebaseapp.com)&nbsp;&nbsp;&nbsp;&nbsp;[Simply Social](https://github.com/thinq4yourself/simply-social-in)

- Username: `sampleuser@tester.com`
- Password: `testtest`

> This demo account is provided for 1uick access. 
> You can easily [create your account here]().

There are also may be some notes in [**the wiki**](https://github.com/thinq4yourself/simply-social-in/wiki) on  the various patterns used in this codebase and how they work.


## Getting started

You can view a live demo over at https://simply-social-in.firebaseapp.com

To get the frontend running locally:

- Clone this repo
- `yarn install` to install all required dependencies
- `yarn start` to start the local server (this project uses create-react-app)

Local web server will use port 4100 instead of standard React's port 3000 to prevent conflicts with some backends like Node or Rails. You can configure port in scripts section of `package.json`: this app uses [cross-env](https://github.com/kentcdodds/cross-env) to set environment variable PORT for React scripts, which is a Windows-compatible way of setting environment variables.

If you want to change the API URL to a local server, simply edit `src/api.js` and change `API_ROOT` to the local server's URL (i.e. `http://localhost:3000/api`)


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

- Home page (URL: /#/ )
    - List of posts
    - List of posts pulled from either user feed, image, or by video feed
    - Pagination for list of posts
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Profile page (URL: /#/@username, /#/@username/favorites, /#/@username/followers )
    - Show basic user info
    - List of posts populated from author's created posts or author's favorited posts
- Editor page to create/edit posts (URL: /#/editor, /#/editor/post-slug )
- Post page (URL: /#/post/post-slug )
    - Delete post button (only shown to post's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)

<br />

## Stack highlights
- React + Redux
- Redux Router (dom)
- Semantic UI for React
- [Faker API](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html#random) for smart demo data
  - Live Posts/User API for even smart demo data
- Filepicker for image/video upload

## App Hosting
- I chose to host this on Firebase via CDN and reduce the overheard of a Node server. 
 - For one - performance is better for lightweight React apps that run only in the browser. 
 - Also comes packed with features like Auth, Node in the cloud (Functions), Analytics, and more.
- I have mirrored this at Heroku to show the slower to render version, but as requested in the specs :) 
 
> - Firebase Demo: https://simply-social-in.firebaseapp.com
> - Firebase Project: https://console.firebase.google.com/project/simply-social-in/
>   - Request access to audit if you like

--- 

> Heroku: 

## Deploy

To deploy to Firebase:
```
$ firebase login  # login to firebase toolbelt
$ 