define(["rivets"], function(rivets) {
    rivets.binders.input = {
        publishes: true,
        routine: rivets.binders.value.routine,
        bind: function(el) {
            el.addEventListener("input", this.publish);
        },
        unbind: function(el) {
            el.removeEventListener("input", this.publish);
        }
    };
});
