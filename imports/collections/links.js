import {Mongo} from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import validUrl from "valid-url";

Meteor.methods({
  'links.insert': function(payload) {
    check(payload, Match.Where(payload => validUrl.isUri(payload)));
  }
});

export const Links = new Mongo.Collection('links');