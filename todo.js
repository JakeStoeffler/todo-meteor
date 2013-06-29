Todos = new Meteor.Collection("todos");

if (Meteor.isClient) {
  Template.list.todos = function () {
    console.log("YO");
    return Todos.find({}, {sort: ['done', 'title']}).fetch();
  };

  Template.list.events({
    'click #add-todo' : function (e, tmpl) {
      var title = tmpl.find('#todo-title').value;
      if (title) {
        Todos.insert({title: title, done: false});
        tmpl.find('#todo-title').value = "";
      }
      e.preventDefault();
    },
    'click .del-todo' : function (e) {
      var id = $(e.target).closest('[data-id]').attr('data-id');
      Todos.remove(id);
    },
    'click .done-todo' : function (e) {
      console.log("click done");
      var id = $(e.target).closest('[data-id]').attr('data-id'),
        todo = Todos.findOne(id);
      Todos.update(id, {$set: {done: todo.done ? false : true}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
