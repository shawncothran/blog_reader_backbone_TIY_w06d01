var App = {};
App.Models = {};
App.Views = {};

App.Models.Person = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peopleshawnie'
});

App.Views.PersonView = Backbone.View.extend({
  initialize: function(){
        this.render();
      },
  tagName: 'form',
  template: _.template($('#personTemplate').html()),
  render: function() {
    $('main').html(this.$el.html(this.template()));
  },
  events: {
    'click #postBtn' : 'post'
  },
  post: function(event) {
    event.preventDefault();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var address = $('#address').val();
    var phoneNumber = $('#phoneNumber').val();
    if (
      firstName.length != '',
      lastName.length != '',
      address.length != '',
      phoneNumber > 999999999 && phoneNumber < 10000000000
    ) {
      this.model.set({
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phoneNumber
      });
      this.model.save(null, {
        success: function(model, response, options) {
          console.log('success', model, response);
        }
      });
      var firstName = $('#firstName').val('');
      var lastName = $('#lastName').val('');
      var address = $('#address').val('');
      var phoneNumber = $('#phoneNumber').val('');
    }
    else {
      alert('Please fill this out completely before hitting "Post"');
    }
  }
});
var personView = new App.Views.PersonView({
  model: new App.Models.Person()
});
