# WikiMaps - A FSND project
### This one-page app displays Wikipedia pages about locations while displaying them on Google Maps.
This is a KnockoutJS web application, it uses ajax to use two different APIs.
The information is displayed in 'infoboxes' that shows on the map when you press a marker or a list item.


Furthermore you will be able to add your own marker, provided you are using a valid wikipedia url and valid lng:lat values.

# Requirements
This app is wrapped in Google's Web Starter Kit. The default documents for WSK are located in the WSK-documents folder.

---
- A copy of this repository
- [Node.js](https://nodejs.org), bring up a terminal and type `node --version` - _To mke sure its installed & updated to the latest version._
- [Gulp](http://gulpjs.com), bring up a terminal and type `gulp --version` - _To make sure its installed & updated to the latest version._


# Installing
The default instructions for WSK are located in the WSK-documents folder.

**While you're in the root of the project:**
- Open a terminal
- You need to make sure Gulp and NodeJS both are updated using `gulp --version && node --version`
- Run `sudo npm install --global gulp && npm install`
- That's it! You can now run `gulp serve` and your default browser will open a tab with the app running.
  - Go to http://localhost:3000
  
--- 

Whenever you make a change and save it, the browser will automatically update.
You can also access localhost:3000 on other devices while running gulp:serve!
- If you are unable to watch the webpage on other devices, make sure you are on the same network.
- If its still not working:
  - Install a tool like dev-ip with `npm install -g dev-ip`, then run `dev-ip`.
  - Copy one of the provided IP addresses and go to gulpfile.babel.js and locate the `serve` and `serve:dist` tasks.
  - Find the host value( host: 'IP-address' ), then change 'IP-address' to the one you've just copied.
  
  You can try gulp:serve again and just like that, the app should show on other devices.

If you are curious about how everything works, go read the documents that comes with WSK, in the WSK-documents folder. :)

# API

The API's used are:
- Google Maps
- Wikimedia

# Built with
- Javascript
- Node JS
- KnockoutJS
- Web Starter Kit
- Gulp
- Google Maps
  ### Using
  
- Webstorm - Coding
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
