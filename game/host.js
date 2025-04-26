var Host = new (function () {
    var getConnection = (this.getConnection = new Deferred());

    view.ready.then(function () {
        // specify socket connection explicit in query string
        var queryString = (window.location.href.match(/\?(loopback|(.+))$/) || [])[1];

        // If loopback is specified or we're running on localhost, use loopback mode
        if (
            queryString === "loopback" ||
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"
        ) {
            console.log("Starting in local/loopback mode");
            getConnection.resolve(new Connection({ url: "loopback" }));
        } else if (queryString) {
            // Normal WebSocket connection to a specific server
            getConnection.resolve(new Connection(new WebSocket("ws://" + queryString)));
        } else {
            // Let the lobby system connect us
            Lobby.selectRoom().then(function (room) {
                UI.showStatus("Connecting to server...");
                history.pushState(null, room.name, "?" + room.server.host + ":" + room.server.port + "/" + room.name);
                getConnection.resolve(
                    new Connection(
                        new WebSocket("ws://" + room.server.host + ":" + room.server.port + "/" + room.name),
                        room.server
                    )
                );
            });
        }
    });
})();
