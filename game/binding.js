new (function (window) {
    window.Bindings = new (function () {
        var listeners = {};

        window.addEventListener("keydown", function (event) {
            listeners[event.keyCode].some(Function.prototype.apply);
        });

        this.bind = function (keyCode, listener) {
            (listeners[keyCode] || (listeners[keyCode] = [])).push(listener);
        };

        this.clear = function () {
            listeners = {};
        };

        this.keys = {
            BACKSPACE: 8,
            TAB: 9,
            CLEAR: 12,
            ENTER: 13,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            META: 91,
            PAUSE: 19,
            CAPS_LOCK: 20,
            ESCAPE: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            HELP: 47,
            LEFT_WINDOW: 91,
            RIGHT_WINDOW: 92,
            SELECT: 93,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_ENTER: 108,
            NUMPAD_MINUS: 109,
            NUMPAD_PERIOD: 110,
            NUMPAD_DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            F13: 124,
            F14: 125,
            F15: 126,
            NUM_LOCK: 144,
            SCROLL_LOCK: 145,
            UP_DPAD: 175,
            DOWN_DPAD: 176,
            LEFT_DPAD: 177,
            RIGHT_DPAD: 178,
        };
    })();
})(window);
