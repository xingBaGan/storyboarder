const updateHTMLText = () => { 
    //#region Toolbar elements
      //#region Tools
      translateTooltip("#toolbar-light-pencil", "main-window.toolbar.tools.light-pencil")
      translateTooltip("#toolbar-brush", "main-window.toolbar.tools.brush")
      translateTooltip("#toolbar-tone", "main-window.toolbar.tools.tone")
      translateTooltip("#toolbar-pencil", "main-window.toolbar.tools.pencil")
      translateTooltip("#toolbar-pen", "main-window.toolbar.tools.pen")
      translateTooltip("#toolbar-light-pencil", "main-window.toolbar.tools.light-pencil")
      translateTooltip("#toolbar-note-pen", "main-window.toolbar.tools.note-pen")
      translateTooltip("#toolbar-eraser", "main-window.toolbar.tools.eraser")
      //#endregion
      //#region Colors
      translateTooltip("#toolbar-current-color", "main-window.toolbar.colors.current-color")
      translateTooltip(".toolbar-brush-modifier-controls_size", "main-window.toolbar.colors.controls-size")
      translateTooltip(".toolbar-brush-modifier-controls_stroke-opacity", "main-window.toolbar.colors.controls-stroke-opacity")
      translateTooltip("#toolbar-palette-colorA", "main-window.toolbar.colors.palette-colorA")
      translateTooltip("#toolbar-palette-colorB", "main-window.toolbar.colors.palette-colorB")
      translateTooltip("#toolbar-palette-colorC", "main-window.toolbar.colors.palette-colorC")
      //#endregion
      //#region Editing
      translateTooltip("#toolbar-trash", "main-window.toolbar.editing.toolbar-trash")
      translateTooltip("#toolbar-move", "main-window.toolbar.editing.toolbar-move")
      translateTooltip("#toolbar-scale", "main-window.toolbar.editing.toolbar-scale")
      translateTooltip("#toolbar-marquee", "main-window.toolbar.editing.toolbar-marquee")
      //#endregion
      //#region Undo / Redo
      translateTooltip("#toolbar-undo", "main-window.toolbar.actions.toolbar-undo")
      translateTooltip("#toolbar-redo", "main-window.toolbar.actions.toolbar-redo")
      //#endregion
      //#region Views
      translateTooltip("#toolbar-grid", "main-window.toolbar.view.toolbar-grid")
      translateTooltip("#toolbar-center", "main-window.toolbar.view.toolbar-center")
      translateTooltip("#toolbar-thirds", "main-window.toolbar.view.toolbar-thirds")
      translateTooltip("#toolbar-perspective", "main-window.toolbar.view.toolbar-perspective")
      translateTooltip("#toolbar-onion", "main-window.toolbar.view.toolbar-onion")
      translateTooltip("#toolbar-captions", "main-window.toolbar.view.toolbar-captions")
      //#endregion
      //#region Externals
      translateTooltip("#toolbar-open-in-editor", "main-window.toolbar.externals.toolbar-open-in-editor")
      //#endregion
      //#region prpomodoroomodoro
      translateTooltip("#toolbar-pomodoro-rest", "main-window.toolbar.pomodoro.toolbar-pomodoro-rest")
      translateTooltip("#toolbar-pomodoro-running", "main-window.toolbar.pomodoro.toolbar-pomodoro-running")
      //#endregion
      tooltips.update()
    //#endregion
    //#region board-information
    renderShotMetadata()
  
    translateCheckbox("#new-shot-label", "main-window.board-information.new-shot")
    translateCheckbox("#duration", "main-window.board-information.duration")
    translateTooltip("#line-mileage", "main-window.board-information.line-mileage")
    translateTooltip("#shot-generator-container", "main-window.board-information.shot-generator-container")
    translateTooltip("#new-shot", "main-window.board-information.new-shot-tooltip")
    translateTooltip("#duration-ms", "main-window.board-information.duration-ms")
    translateTooltip("#duration-fps", "main-window.board-information.duration-fps")
    translateHtml("#dialog-title", "main-window.board-information.dialog-title")
    translateTooltip("#suggested-dialogue-duration", "main-window.board-information.suggested-dialogue-duration")
    translateTooltip("#dialogue-tooltip", "main-window.board-information.dialogue-tooltip")
    translateHtml("#content-title", "main-window.board-information.content-title")
    translateHtml("#roles-title", "main-window.board-information.roles-title")
    translateHtml("#action-title", "main-window.board-information.action-title")
    translateTooltip("#action-tooltip", "main-window.board-information.action-tooltip")
    translateHtml("#note-title", "main-window.board-information.note-title")
    translateTooltip("#note-tooltip", "main-window.board-information.note-tooltip")
    translateHtml("#clear-note-title", "main-window.board-information.clear-note-title")
    translateTooltip("#clear-note-tooltip", "main-window.board-information.clear-note-tooltip")
    translateTooltip("#remove-audio", "main-window.board-information.remove-audio")
    translateHtml("#reference-layer-title", "main-window.board-information.reference-layer-title")
    translateTooltip("#reference-layer-tooltip", "main-window.board-information.reference-layer-tooltip")
    translateHtml("#clear-title", "main-window.board-information.clear-title")
    translateTooltip("#reference-layer-tooltip", "main-window.board-information.reference-layer-tooltip")
    
    translateTooltip("#merge-down-tooltip", "main-window.board-information.merge-down-tooltip")
    translateHtml("#merge-down-title", "main-window.board-information.merge-down-title")
    translateTooltip("#merge-up-tooltip", "main-window.board-information.merge-up-tooltip")
    translateHtml("#merge-up-title", "main-window.board-information.merge-up-title")
    translateTooltip("#layer-opacity-tooltip", "main-window.board-information.layer-opacity-tooltip")
    translateTooltip("#sts-random", "main-window.board-information.sts-random")
    translateTooltip("#sts-input1", "main-window.board-information.sts-input1")
    translateTooltip("#sts-select", "main-window.board-information.sts-select")
    translateTooltip("#sts-shots", "main-window.board-information.sts-shots")
    
    translateHtml("#scene", "main-window.board-information.scene")
    translateHtml("#frame-rate", "main-window.board-information.frame-rate")
    translateTooltip("#show-in-finder-button", "main-window.board-information.show-in-finder-button")
    translateHtml("#show-in-finder-title", "main-window.board-information.show-in-finder-title")
    
    translateTooltip("#prev-scene-tooltip", "main-window.playback.prev-scene-tooltip")
    translateTooltip("#prev-board-tooltip", "main-window.playback.prev-board-tooltip")
    translateTooltip("#play-tooltip", "main-window.playback.play-tooltip")
    translateTooltip("#next-board-tooltip", "main-window.playback.next-board-tooltip")
    translateTooltip("#next-scene-tooltip", "main-window.playback.next-scene-tooltip")
  
    //#endregion
}
module.exports = {
  updateHTMLText
}