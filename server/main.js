import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

import { Links } from "../imports/collections/links";


Meteor.startup(() => {
  Meteor.publish('links', function () {
    return Links.find({});
  });
});


function onRoute(req, res, next) {
  // take the token out of url and find a match in our links collection
  const link = Links.findOne({ token: req.params.token });
  if (link) {
    // update its counter
    Links.update(link, { $inc: { clicks: 1 } });
    // if we find a link obj - redirect user
    res.writeHead(307, { 'Location': link.url });
    res.end();
  } else {
    // otherwise send the user to the normal react-app
    next();
  }
}


const middleware = ConnectRoute(function (router) {
  router.get('/:token', onRoute);
});


WebApp.connectHandlers.use(middleware);