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
            var input = this.get("input");

            if (input === "") {
                return;
            }

            this.get("todos").add({value: input});
            this.set("input", "");
        },
        reset: function() {
            this.get("todos").reset();
        }
    });
});
