import { Meteor } from 'meteor/meteor';
import { Shows } from '/imports/api/collections';
import harvester from '/imports/api/harvester';

Meteor.startup(() => {
  harvester()
});
