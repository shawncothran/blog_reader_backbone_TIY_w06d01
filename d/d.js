var App = {};
App.Models = {};
App.Views = {};
App.Collections = {};

App.Router = Backbone.Router.extend({
  routes: {
    '' : 'tweets',
    'login': 'login',
    'signup': 'signup',
    'user/:id': 'user'
  },
  tweets: function() {
    var tweetsView = new App.Views.TweetsView({
      collection: new App.Collections.Tweets()
    });
    tweetsView.collection.fetch({
      success: function(collection, data, options){
        tweetsView.render();
        $('main').html(tweetsView.el);
        console.log('tweets route')
      },
      error: function() {}})
  },
  login: function() {
    var loginView = new App.Views.LoginView({
      model: new App.Models.Session(),
      // password: 'coolpassword'
    });
    loginView.render();
    $('main').html(loginView.el);
  },
  signup: function() {
    console.log('signup route');
  },
  user: function() {
    console.log('user route');
  }
});

App.Views.LoginView = Backbone.View.extend({
  initialize: function(options) {
    // this.password = options.password;
    console.log('you made a login view', arguments);
  },
  tagName: 'form',
  template: _.template($('#loginTemplate').html()),
  render: function() {
    this.$el.html(this.template());
  },
  events: {
    'click #loginBtn' : 'logIn'
  },
  logIn: function(event) {
    event.preventDefault();
    var username = $('#loginEmail').val();
    var password = $('#loginPassword').val();
    this.model.set({
      password: password,
      username: username
    });
    this.model.save(null, {
      success: function(model, response, options) {
        $.ajaxSetup({
          headers: {
            Authorization: 'Bearer ' + response.access_token
          }
        });
        console.log('success', model, response);
        App.router.navigate('', {trigger: true});
      },
      error: function(model, response, options) {}
    });
  }
});

App.Models.Session = Backbone.Model.extend({
  url: 'https://twittertiy.herokuapp.com/oauth/token',
  defaults: {
    grant_type: 'password',
    username: '',
    password: ''
  }
});

App.Models.Tweet = Backbone.Model.extend({
  url: 'https://twittertiy.herokuapp.com/tweets'
});

$('document').ready(function() {
  App.router = new App.Router();
  Backbone.history.start();
})
