define([
    "backbone",
    "underscore",
    "collections/todos.collection"
], function(Backbone, _, TodosCollection) {
    return Backbone.Model.extend({
        defaults: {
            input: "",
            clients: 0
        },
        initialize: function() {
            _.bindAll(this);

            var todosCollection = new TodosCollection();

            this.socket = io.connect("http://localhost");

            // Listen for all our socket events
            this.socket.on("connection", this._onSocketConnection);
            this.socket.on("add", this._onNewTodo);
            this.socket.on("update", this._onUpdateTodo);
            this.socket.on("clear", todosCollection.reset.bind(todosCollection));
            this.socket.on("clientStatus", this._onClientUpdate);

            this.set("todos", todosCollection);
        },

        // Adds a todo to the collection and transfering the data
        // over the websocket. Uses the model value `input` for the todo.
        addTodo: function() {
            var input = this.get("input");

            if (input === "") {
                return;
            }

            var todos = this.get("todos");
            var model = new todos.model({value: input});

            todos.add(model);

            this.socket.emit("add", {todo: model.toJSON()});

            this.set("input", "");
        },

        // Resets the collection and trasmits it to other clients.
        reset: function() {
            this.get("todos").reset();
            this.socket.emit("clear");
        },

        // Sends an update event to other clients with the passed in
        // model data.
        sendUpdate: function(model) {
            this.socket.emit("update", {todo: model.toJSON()});
        },

        // Add a todo from another client
        _onNewTodo: function(data) {
            this.get("todos").add(data.todo);
        },

        // Set all existing todos on connection.
        _onSocketConnection: function(data) {
            this.get("todos").reset(data.todos);
            this._onClientUpdate(data);
        },

        // Sets the client count when it changes from the server.
        _onClientUpdate: function(data) {
            this.set("clients", data.clients);
        },

        // Updates todo that was modified from another client.
        _onUpdateTodo: function(data) {
            var todos = this.get("todos");
            var todo = _.first(todos.where({timestamp: data.todo.timestamp}));

            if (todo) {
                todo.set(data.todo);
            }
        }
    });
});
