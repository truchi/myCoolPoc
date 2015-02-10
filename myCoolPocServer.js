/**
 * Created by moonatique on 2/10/15.
 */
Actions = new Mongo.Collection('actions');

if (Meteor.isServer) {
    Meteor.startup(function () {
        if(Actions.find().count()===0){
            Actions.insert({
                'ACE':0,
                'SMATCH':0,
                'RIGHT':0
            });
        }
    });
}