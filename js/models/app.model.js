define([
    "backbone",
    "underscore",
    "collections/todos.collection"
], function(Backbone, _, TodosCollection) {
    return Backbone.Model.extend({
        defaults: {
            input: ""
        },
        initialize: function() {
            _.bindAll(this);

            this.set("todos", new TodosCollection(), {silent: true});
        },
        addTodo: function() {
            this.get("todos").add({
                value: this.get("input")
            });

            this.set("input", "");
        },
        reset: function() {
            this.get("todos").reset();
        }
    });
});
