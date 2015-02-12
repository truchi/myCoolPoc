
Players = new Meteor.Collection("players");
if (Meteor.isClient) {
    Session.setDefault("sort", {score: -1, name: 1});
    Template.leaderboard.players = function () {
        return Players.find({}, {sort: Session.get("sort")});
    };
    /* Descirbes in English how the list is sorted */

    Template.leaderboard.selected_name = function () {
        var player = Players.findOne(Session.get("selected_player"));
        return player && player.name;
    };
    Template.player.selected = function () {
        return Session.equals("selected_player", this._id) ? "warning" : '';
    };
    /* When you press the button, add 5 points to the player */
    Template.leaderboard.events({
        'click #increment': function () {
            Players.update(Session.get("selected_player"), {$inc: {score: 1}});
        },
        'click #ace': function () {
            Players.update(Session.get("selected_player"), {$inc: {"actions.ace": 1}});
        },
        'click #smash': function () {
            Players.update(Session.get("selected_player"), {$inc: {"actions.smash": 1}});
        },
        'click #volley': function () {
            Players.update(Session.get("selected_player"), {$inc: {"actions.volley": 1}});
        },
        'click #reset': function () {
            Players.update(Session.get("selected_player"), {$set :{score: 0, "actions.ace":0, "actions.smash":0, "actions.volley":0}});
        },
        'click #name': function () {
            var sort = Session.get("sort");
            sort = {"name" : sort.name * -1, score: sort.score }
            Session.set("sort", sort);
        }
    });
    /* When you click a player, select it */
    Template.player.events({
        'click': function () {
            Session.set("selected_player", this._id);
        }
    });
}
// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Players.find().count() === 0) {
            var names = [
                "Raphael Nadal"
                ];
            for (var i = 0; i < names.length; i++)
                Players.insert({name: names[i], score: 0, actions: {ace:0, smash:0, volley:0}});
        }
    });
}