# Fire Hydrant AR

This is a quick example of webAR using [ar.js](https://ar-js-org.github.io/AR.js/) in geolocation mode to pull data from an API, and then display it in a mobile browser.

The user location is pulled and fed to the City of Edmonton's OpenData API, returning the closest 10 fire hydrants to the user, and then they are displayed around the user, assuming they are in Edmonton.

Since the accuracy of mobile devices can be anywhere from 2-10 meters, and fire hydrants are much smaller than that, this isn't a really useful project, because the shown locations of the hydrants will be off by the accuracy of the user's GPS coordinates.

But it is fun, and can show what geolocated AR on mobile can acomplish, and it can only get better.
