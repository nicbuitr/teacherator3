import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Criterias = new Mongo.Collection('criterias');

if (Meteor.isServer) {
  // This code only runs on the server
    Meteor.publish('criterias', function criteriasPublication() {
        return Criterias.find();
    });
}

// Deny all client-side updates on the Teachers collection, 
// just in case removing insecure and autopublish is not enough
Criterias.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});