import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Shows = new Mongo.Collection('shows');

if (Meteor.isServer) {
  Meteor.publish('shows', function () {
    return Shows.find()
  });
}

export default Shows
