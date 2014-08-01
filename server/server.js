var express = require("express");
var app = express();
var server = require("http").createServer(app);
var path = require("path");
var io = require("socket.io")(server);
var _ = require("lodash");
var todos = [];
var clients = 0;

server.listen(9002);

app.use("/", express.static(path.resolve(__dirname, "..", "client")));

io.on('connection', function(socket) {
    // When a client connects update the count
    clients++;

    // When a todo is added broadcast it to every other client
    socket.on("add", function(data) {
        todos.push(data.todo);
        socket.broadcast.emit("add", data);
    });

    // When a todo is updated, update the one on the server and 
    // then send it all clients.
    socket.on("update", function(data) {
        var todo = _.find(todos, {timestamp: data.todo.timestamp});

        if (todo) {
            _.extend(todo, data.todo);
        }

        socket.broadcast.emit("update", data);
    });

    // Clear the todos array and then send an event to 
    // clear all clients.
    socket.on("clear", function() {
        todos = [];
        socket.broadcast.emit("clear");
    });

    socket.on("disconnect", function() {
        clients--;
        socket.broadcast.emit("clientStatus", {clients: clients});
    });

    socket.broadcast.emit("clientStatus", {clients: clients});

    socket.emit("connection", {
        todos: todos,
        clients: clients
    });
});

