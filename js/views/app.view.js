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

            this.render();
        },
        render: function() {
            this.$el.html(AppTemplate);

            this.binding = rivets.bind(this.el, {
                model: this.model,
                view: this
            });
        },
        onKeyPress: function(e) {
            e.keyCode === 13 && this.model.addTodo();
        },
        remove: function() {
            this.binding && this.binding.unbind();
        }
    });
});
