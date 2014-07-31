define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            value: "",
            done: false
        }
    });
});
