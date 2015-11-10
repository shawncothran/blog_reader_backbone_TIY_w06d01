var App = {};
App.Models = {};
App.Views = {};

App.Models.Post = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/postshawnie'
});

App.Views.PostView = Backbone.View.extend({
  initialize: function(){
        this.render();
      },
  tagName: 'form',
  template: _.template($('#postTemplate').html()),
  render: function() {
    $('main').html(this.$el.html(this.template()));
  },
  events: {
    'click #postBtn' : 'post'
  },
  post: function(event) {
    console.log('yesssssss');
    event.preventDefault();
    var title = $('#postTitle').val();
    var body = $('#postBody').val();
    this.model.set({
      title: title,
      body: body
    });
    this.model.save(null, {
      success: function(model, response, options) {
        console.log('success', model, response);
      }
    });
    var title = $('#postTitle').val('');
    var body = $('#postBody').val('');
  }
});
var postView = new App.Views.PostView({
  model: new App.Models.Post()
});
