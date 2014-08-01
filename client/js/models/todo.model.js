define([
    "backbone"
], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            // We are using the timestamp as the UUID
            // to sync across clients.
            if (!this.get("timestamp")) {
                this.set("timestamp", Date.now(), {silent: true});
            }
        },
        defaults: {
            timestamp: null,
            value: "",
            done: false
        }
    });
});
