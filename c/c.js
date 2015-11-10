// c) Create a "blog reading app", where you have a list of blog posts on the side
// and when you click on a post title, it opens that post in another view.
// You can use the data at http://tiny-starburst.herokuapp.com/collections/posts.

var App = {};
App.Models = {};
App.Views = {};
App.Collections = {};


/// routers ////////////


App.Router = Backbone.Router.extend({
  routes: {
    '' : 'posts',
    'post/:id' : 'post'
  },
  posts: function() {
    var postsView = new App.Views.PostsView({
      collection: new App.Collections.Posts()
    });
    postsView.collection.fetch({
      success: function(collection, data, options){
        postsView.render();
        $('main').html(postsView.el);
        console.log('posts route')
      }
  },
  post: function(){
    // App.Collections.Posts.fetch({
    //   success: function(){
    //     $('aside').html(feedView.el);
    //     console.log('post route')
    //   },
    // });
    //   var headerView = new HeaderView();
    //   headerView.render();
    //   $('.top').html(headerView.el);
  }
});


/// collections ////////////


App.Collections.Posts = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/postshawnie',
  model: App.Models.Post
});


/// models ////////////


App.Models.Post = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/postshawnie'
});


/// views ////////////


App.Views.PostsView = Backbone.View.extend({
  initialize: function(){
        this.render();
      },
  tagName: 'article',
  template: _.template($('aside').html()),
  render: function() {
    $('aside').html(this.$el.append(this.template()));
  },
  events: {
    'click #something' : 'post'
  },
  post: function(event) {
    event.preventDefault();

  }
});


/// instantiations ////////////


var personView = new App.Views.PersonView({
  model: new App.Models.Person()
});


/// listener ////////////


$('document').ready(function() {
  App.router = new App.Router();
  Backbone.history.start();
})
