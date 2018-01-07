import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import validUrl from "valid-url";
import TokenGenerator from "uuid-token-generator";

const tokenGenerator = new TokenGenerator(256, TokenGenerator.BASE16);

Meteor.methods({
  'links.insert': function(payload) {
    // first validate URL
    check(payload, Match.Where(payload => validUrl.isUri(payload)));

    // save URL by generating a token
    const token = tokenGenerator.generate().substring(0, 7);
    Links.insert({ url: payload, token, clicks: 0 });
  },

  'link.remove': function (payload) {
    Links.remove(payload);
  }
});


export const Links = new Mongo.Collection('links');