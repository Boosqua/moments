# Submission Requirements
## Project Description

## DESCRIPTION:

Photo Dojo is online photo portfolio where anyone can create photo albums to share privately or with the community. Photo Dojo is currently divided into different sections, the landing page and the users album collection. 

The landing page is home to a carousel of "Trending Albums" and gallery of recently uploaded images. These albums and images are shared publicly by the users of Photo Dojo, and in the future users will be able to like or save images for later viewing. A search bar will also be added to allow users to search for specific albums or albums created by specific users. 

If the User is logged in they have access to the "My Albums" page where they can view a gallery of their albums or create new albums. in the future, the gallery will allow users to share private albums, delete albums, upload additional images, change cover photos, and much more. 

## DEVELOPMENT:
Photo was designed using and MVC framework similar to Ruby on Rails, and adopting some Rails naming conventions. Much like the way Rails Model class handles db queries and associations, the User, Album, and Image classes handle all the postgresql queries and return the appropriate data objects. The controller classes are where HTTP request are received by different methods via routes( which currently live in app.js but should be moved to config). Once a request is received, it is sent to the appropriate User method, and once a data object is returned to the controller, the controller send the result back with an appropriate status code. 

## VIEWS USER FLOW

The Views are hosed in two main components, Landing and AlbumsCrud. Both components receive routing help via the NavBar component. Landing handles the logic for user login registration and logout. The navbar displays different buttons depending on whether a user is logged in, and different routes require user authentication( logged in users can't find the login screen and logged out users can't create albums). Landing also handles the public eye candy, grabbing the most recently created album cover photos for a carousel, and a number of recently uploaded photos for public image gallery. The purpose of this page to expose users to new photographers in different ways. 

AlbumsCrud is basically a functional CRUD component where Photo Dojo renders the users albums, allows a user to create new albums and images, and will eventually allow users to delete and update albums. AlbumCrud's create functionality is intentionally minimalistic and straight forward. There three form types; album creation where an album is titled and marked as public or private, cover photo where a cover photo is uploaded and previewed before database upload, and an image upload where multiple images can be uploaded at once and previewed. 


## Project Requirements
Please list examples of how your project meets the following requirements below:
- [X] Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js.


- [X] Create an application that can be interacted with in a minimum of three different ways by the user.
   User creation and authentication.
   Album creation and storage
   Album gallery views
   Public album presentation and image gallery
- [X] Use of at least one Service.
   All image hosting is thanks to AWS
- [X] The usage of a specified architectural pattern (MVC, MVP, MVVM,  etc.)
   Backend was intended to be a sudo Ruby on Rails clone
- [X] Use of a [REST API](https://medium.com/@arteko/the-best-way-to-use-rest-apis-in-swift-95e10696c980).
   The backend follows REST convention: get request pull information through index or find actions and return the data in an appropriate form, post is used for creation actions, delete removes items from the database, and patch updates the appropriate entries. 
- [X] Usage of at least 5 UI components from the [material-ui/@core](https://material-ui.com/) library (if you are not using React, a comparable UI library is acceptable)
   Components used: 
      Button
      Typography
      TextField
      Checkbox
      Button
      GridList
      GridListTile
      ButtonGroup
      ThemeProvider
      Drawer
- [X] An example of a reusable UI component that you have created and used in the app. This should be different than the 5 UI components from the vendor library.
   The album preview component is a reusable UI component that requires an image url, and has options for album title, size, and onclick event. It uses the image proportions to create an well scaled album preview for the purposed of integration in the carousel, user's album's and future features. 
