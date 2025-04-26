(function (global) {
    function GamedevCloud(apiURI) {
        this.apiURI = apiURI || "http://www.gamedev.pl/api/";
    }

    GamedevCloud.prototype.getConnection = function (channel) {
        var result = new Deferred();

        // Try to get server list, but have a fallback for when the API is down
        var apiRequest = xhrGet(this.apiURI + "proxyservers");

        // Set a timeout in case the API request hangs
        var apiTimeout = setTimeout(function () {
            console.log("API request timed out, using loopback mode");
            result.resolve(new Connection({ url: "loopback" }));
        }, 5000);

        apiRequest.then(
            function (servers) {
                clearTimeout(apiTimeout);

                if (!servers || !servers.length) {
                    console.log("No servers available, using loopback mode");
                    result.resolve(new Connection({ url: "loopback" }));
                    return;
                }

                function checkServer(server) {
                    var url = "ws://" + server.host + ":" + server.port + "/" + channel;
                    var socket = new WebSocket(url);

                    // Set a timeout for the connection attempt
                    var connectionTimeout = setTimeout(function () {
                        socket.onclose = socket.onerror = socket.onopen = null;
                        socket.close();

                        if (servers.length > 0) checkServer(servers.splice(0, 1)[0]);
                        else {
                            console.log("All server connection attempts failed, using loopback mode");
                            result.resolve(new Connection({ url: "loopback" }));
                        }
                    }, 3000);

                    socket.onopen = function () {
                        clearTimeout(connectionTimeout);
                        socket.onclose = null;
                        socket.close();
                        var connection = new Connection((socket = new WebSocket(url)), server);
                        socket.onopen = function () {
                            result.resolve(connection);
                        };

                        // Set another timeout in case the second connection doesn't open
                        setTimeout(function () {
                            if (!result.resolved()) {
                                console.log("Second connection attempt timed out, using loopback mode");
                                result.resolve(new Connection({ url: "loopback" }));
                            }
                        }, 3000);
                    };

                    socket.onclose = socket.onerror = function () {
                        clearTimeout(connectionTimeout);
                        if (servers.length > 0) checkServer(servers.splice(0, 1)[0]);
                        else {
                            console.log("No more servers to try, using loopback mode");
                            result.resolve(new Connection({ url: "loopback" }));
                        }
                    };
                }

                if (servers.length > 0) checkServer(servers.splice(0, 1)[0]);
                else result.resolve(new Connection({ url: "loopback" }));
            },
            function (error) {
                clearTimeout(apiTimeout);
                console.log("API request failed:", error);
                result.resolve(new Connection({ url: "loopback" }));
            }
        );

        return result;
    };

    global["GamedevCloud"] = GamedevCloud;

    // xhr

    function xhr(method, url, content) {
        var result = new Deferred();
        try {
            var req = new XMLHttpRequest();
            req.open(method, url);
            req.timeout = 5000; // 5 second timeout

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status >= 200 && req.status < 300) {
                        try {
                            var response = JSON.parse(req.responseText);
                            result.resolve(
                                response.map(function (el) {
                                    el = el.split(":");
                                    return {
                                        host: el[0],
                                        port: el[1],
                                    };
                                })
                            );
                        } catch (e) {
                            result.resolve([]);
                        }
                    } else {
                        result.resolve([]);
                    }
                }
            };

            req.ontimeout = function () {
                result.resolve([]);
            };

            req.onerror = function () {
                result.resolve([]);
            };

            req.send(null);
        } catch (e) {
            result.resolve([]);
        }
        return result;
    }

    function xhrGet(url, content) {
        return xhr("GET", url, content);
    }

    function xhrPost(url, content) {
        return xhr("POST", url, content);
    }

    // deferred

    function Deferred(single) {
        this.listeners = [];
        this.single = single;
    }

    Deferred.prototype.then = function (fn, check) {
        if (typeof this.result != "undefined" && !check) fn.apply(null, this.result);
        else {
            var listener = { fn: fn, check: check };
            this.listeners.push(listener);
            return listener;
        }
    };

    Deferred.prototype.only = function (fn, check) {
        this.listeners.length = 0;
        return this.then(fn, check);
    };

    Deferred.prototype.once = function (fn) {
        var listener;
        listener = this.then(
            function () {
                if (listener)
                    setTimeout(
                        function () {
                            this.listeners.splice(this.listeners.indexOf(listener), 1);
                        }.bind(this)
                    );
                fn.apply(null, this.result);
            }.bind(this)
        );
    };

    Deferred.prototype.resolved = function () {
        return typeof this.result != "undefined";
    };

    Deferred.prototype.clear = function () {
        delete this.result;
    };

    Deferred.prototype.resolve = function () {
        if (this.result && this.single) return;

        var result = (this.result = arguments);
        this.listeners.some(function (listener) {
            (!listener.check || listener.check.resolved()) && listener.fn.apply(null, result);
        });
    };

    global["Deferred"] = Deferred;
})(this);
