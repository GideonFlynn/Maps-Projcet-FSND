# WikiMaps - A FSND project
### This one-page app displays Wikipedia pages about locations while displaying them on Google Maps.
This is a KnockoutJS web application, it uses ajax to use two different APIs.
The information is displayed in 'infoboxes' that shows on the map when you press a marker or a list item.


Furthermore you will be able to add your own marker, provided you are using a valid wikipedia url and valid lng:lat values.

# Requirements
This app is wrapped in Google's Web Starter Kit. The default documents for WSK are located in the WSK-documents folder.

---
- A copy of this repository
- [Node.js](https://nodejs.org), bring up a terminal and type `node --version` - _Make sure you have updated to the latest version._
- [Gulp](http://gulpjs.com), bring up a terminal and type `gulp --version` - _Make sure you have updated to the latest version._


# Installing

**While you're in the root of the project:**
- Open a terminal
- Make sure Gulp and NodeJS both are updated using `gulp --version && node --version`
- `$ npm install --global gulp && npm install`
- That's it! You can now run `gulp serve` and your default browser will open a tab with the app running. 
- `vagrant up`
  ###### This might take a while, go grab some water or do some exercises
  ###### Congratulations! You are now able to access the vagrant folder inside your 'box'
  ## Running
  - `vagrant up`
  - `vagrant ssh`
    - `cd /vagrant`
  


# API
Go to the [API docs](https://documenter.getpostman.com/view/2229326/item-catalog/6fSWmNf), they are generated with Postman.

An alternative is downloading [the Postman app](https://www.getpostman.com/) and pressing this button:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4263598c8bd1b5ce049e)

The API's used are:
- Google Maps
- Wikimedia

# Built with
- Javascript
  - KnockoutJS
- Web starter Kit
- Google Maps
  ### Using
- Webstorm - Coding
- Postman - APIs
- Webflow - Looks

# Contribution
All contributions a greatly appreciated.
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

# Acknowledgements
Udacity's Full-Stack Nanodegree(FSND) is the reason this project exists.

All the people who spend their time writing great documentation
and all of those amazing people answering questions on Stack Overflow and many other places on the internet. Without you, coding would be extremely exhausting.
