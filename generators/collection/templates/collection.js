import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const <%= collectionName %> = new Mongo.Collection('<%= collectionName %>');

<%= collectionName %>.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

<%= collectionName %>.schema = new SimpleSchema({

});

<%= collectionName %>.attachSchema(<%= collectionName %>.schema);

<%= collectionName %>.publicFields ={

};

<%= collectionName %>.helpers({

});
