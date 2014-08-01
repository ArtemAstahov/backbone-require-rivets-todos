define([
    "backbone",
    "models/todo.model"
], function(Backbone, TodoModel) {
    return Backbone.Collection.extend({
        model: TodoModel
    });
});
