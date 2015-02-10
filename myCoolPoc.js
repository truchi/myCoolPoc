if (Meteor.isClient) {
    var actions = {
        'ACE':0,
        'SMATCH':0,
        'RIGHT':0
    }
    Actions.insert(actions);
  Session.setDefault('action', actions);

  Template.hello.helpers({
      action: function () {
          return Session.get('action');
      }
  });

  Template.hello.events({
    'click #right': function () {
      // increment the counter when button is clicked
        var actions = Session.get('action');
        actions.RIGHT++;
        Session.set('action', actions);
    },
      'click #ace':function(){
          var actions = Session.get('action');
          actions.ACE++;
          Session.set('action', actions);
      },
      'click #smatch':function(){
          var actions = Session.get('action');
          actions.SMATCH++;
          Session.set('action', actions);
      }
  });
}

