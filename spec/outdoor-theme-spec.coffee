OutdoorTheme = require '../lib/outdoor-theme'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "OutdoorTheme", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('outdoorTheme')

  describe "when the outdoor-theme:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.outdoor-theme')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'outdoor-theme:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.outdoor-theme')).toExist()
        atom.workspaceView.trigger 'outdoor-theme:toggle'
        expect(atom.workspaceView.find('.outdoor-theme')).not.toExist()
