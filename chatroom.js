Chat = new Mongo.Collection('chat');

Meteor.methods({
  addMessage: function(text) {
    Chat.insert({
      text: text,
      dateIn: new Date(),
      userId: Meteor.userId(),
      userName: Meteor.user().username
    });
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('chat');

  Template.body.helpers({
    messages: function() {
      return Chat.find();
    }
  });

  Template.body.events({
    'submit .messageBox': function(event) {
      Meteor.call('addMessage', event.target.text.value);
      event.target.text.value = '';
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.publish('chat', function() {
    return Chat.find();
  });
}