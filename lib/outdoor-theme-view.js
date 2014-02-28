var OutdoorThemeView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

View = require('atom').View;

module.exports = OutdoorThemeView = (function(_super) {
    __extends(OutdoorThemeView, _super);

    function OutdoorThemeView() {
        return OutdoorThemeView.__super__.constructor.apply(this, arguments);
    }

    OutdoorThemeView.content = function() {
        return this.div({
            "class": 'outdoor-theme overlay from-bottom'
        }, (function(_this) {
            return function() {
                return _this.div("The OutdoorTheme package is Alive! It's ALIVE!", {
                    "class": "message"
                });
            };
        })(this));
    };

    OutdoorThemeView.prototype.initialize = function(serializeState) {
        return atom.workspaceView.command("outdoor-theme:toggle", (function(_this) {
            return function() {
                return _this.toggle();
            };
        })(this));
    };

    OutdoorThemeView.prototype.serialize = function() {};

    OutdoorThemeView.prototype.destroy = function() {
        return this.detach();
    };

    OutdoorThemeView.prototype.toggle = function() {
        console.log("OutdoorThemeView was toggled!");
        if (this.hasParent()) {
            return this.detach();
        } else {
            return atom.workspaceView.append(this);
        }
    };

    return OutdoorThemeView;

})(View);
