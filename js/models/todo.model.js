define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            value: "",
            done: false
        },
        toggle: function() {
            this.set("done", !this.get("done"));
        }
    });
});
