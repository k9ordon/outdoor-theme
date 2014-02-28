var LightLevel = require('lightlevel'),
    themes;

module.exports = {
    configDefaults: {
        lightLevelToSwitch: 6200,
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
        this.outdoorThemeLightStream.on('data', function(value) {
            if(value < atom.config.get('outdoorTheme.lightLevelToSwitch') && self.currentTheme === 'light') {
                self.currentTheme = 'dark';
                themes = atom.config.get("core.themes");
                themes[1] = atom.config.get('outdoorTheme.darkSyntaxTheme');
                atom.config.set("core.themes", themes);
            } else if(value >= atom.config.get('outdoorTheme.lightLevelToSwitch') && self.currentTheme === 'dark') {
                self.currentTheme = 'light';

                themes = atom.config.get("core.themes");
                themes[1] = atom.config.get('outdoorTheme.lightSyntaxTheme');
                atom.config.set("core.themes", themes);
            }
        });
    },
    deactivate: function() {
        return this.outdoorThemeLightStream.stopStream();
    },
    serialize: function() {
        return null;
    }
};
