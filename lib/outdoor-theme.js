"use strict";
var LightLevel = require('lightlevel'),
    themes;

module.exports = {
    configDefaults: {
        lightLevelToSwitch: 980125248,
        lightSyntaxTheme: 'atom-light-syntax',
        darkSyntaxTheme: 'atom-dark-syntax'
    },
    outdoorThemeLightStream: null,
    lightTheme: null,
    darkTheme: null,
    currentTheme: 'dark',
    activate: function(state) {
        var self = this;

        this.outdoorThemeLightStream = LightLevel.returnStream();
        return this.outdoorThemeLightStream.on('data', function(value) {
            console.log(atom.config.get('outdoor-theme.lightLevelToSwitch') + '' + value);
            if(value < atom.config.get('outdoor-theme.lightLevelToSwitch') && self.currentTheme === 'light') {
                self.currentTheme = 'dark';
                themes = atom.config.get("core.themes");
                themes[1] = atom.config.get('outdoor-theme.darkSyntaxTheme');
                atom.config.set("core.themes", themes);
            } else if(value >= atom.config.get('outdoor-theme.lightLevelToSwitch') && self.currentTheme === 'dark') {
                self.currentTheme = 'light';

                themes = atom.config.get("core.themes");
                themes[1] = atom.config.get('outdoor-theme.lightSyntaxTheme');
                atom.config.set("core.themes", themes);
            }
        });
    },
    deactivate: function() {
        return this.outdoorThemeLightStream.stopStream();
    }
};
