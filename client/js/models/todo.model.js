define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        defaults: function() {
            return {
                // We are using the timestamp as the UUID
                // to sync across clients.
                timestamp: Date.now(),
                value: "",
                done: false
            };
        }
    });
});
