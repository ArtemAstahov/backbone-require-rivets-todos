define([
    "backbone",
    "rivets",
    "underscore",
    "collections/todos.collection",
    "text!templates/app.view.template.html"
], function(Backbone, rivets, _, TodosCollection, AppTemplate) {
    return Backbone.View.extend({
        initialize: function() {
            _.bindAll(this);

            // This will only get called once to render the template
            // and then bind our view with rivets
            this.render();
        },

        render: function() {
            this.$el.html(AppTemplate);

            // Binds the view to our model data
            this.binding = rivets.bind(this.el, {
                model: this.model,
                view: this
            });
        },
    
        // Add a todo when `enter` is pressed
        onKeyPress: function(e) {
            e.keyCode === 13 && this.model.addTodo();
        },

        // Send an update when we update a todo's status
        onTodoUpdate: function(e, view) {
            this.model.sendUpdate(view.todo);
        },

        remove: function() {
            // Unbind the from rivets when removing this view
            this.binding && this.binding.unbind();
        }
    });
});
