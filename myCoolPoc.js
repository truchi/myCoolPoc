Players = new Mongo.Collection('players');

if (Meteor.isClient) {
//    Meteor.subscribe('player','Nadal');
    Session.setDefault('player', 'Nadal');

  Template.hello.helpers({
      player: function () {
          return Session.get('player');
      }
  });

  Template.hello.events({
    'click #right': function () {
        var p = Players.findOne(Session.get('player'));
        console.log(p);
        p.actions.right++;
        Players.update(p);
        Session.set('player', p);
    },
      'click #ace':function(){
          var p = Session.get('player');
          p.actions.ace++;
          Players.update(p);
          Session.set('player', p);
      },
      'click #smash':function(){
          var p = Session.get('player');
          p.actions.smash++;
          Players.update(p);
          Session.set('player', p);
      }
  });
}
if (Meteor.isServer) {
    Meteor.startup(function () {
        if(Players.find().count()===0){
            Players.insert({
                'name':'Nadal',
                'actions': {
                    'ace': 0,
                    'smash': 0,
                    'right': 0
                }
            });
            Players.insert({
                'name':'Federer',
                'actions': {
                    'ace': 0,
                    'smash': 0,
                    'right': 0
                }
            });
            /*Meteor.publish('player',function(player){
                return Players.findOne({name:player});
            });
            */
        }

    });
}
