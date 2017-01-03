import { Meteor } from 'meteor/meteor';
import { <%= collectionName %> } from '../<%= fileName %>.js';

Meteor.startup(() => {
    if (<%= collectionName %>.find().count() === 0) {
        
    }
});
