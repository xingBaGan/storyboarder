const BoardMetadata = () => {
    return (
        <>
            <div className="board-metadata-container">
                <div className="number"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-board"></use></svg><span id="shot"></span></div>
                <div className="row" id="board-numbers">12 of 76</div>
                <div className="row" id="line-mileage"
                    data-tooltip
                    data-tooltip-title="Line Mileage"
                    data-tooltip-description="As you draw, the line miles for the shot add up. This is useful to know how much you are drawing per shot. Remember, you aren't trying to make the next Moner Lisa. You're just trying to get the idea across."
                    data-tooltip-keys=""
                    data-tooltip-position="left middle">
                    <svg className="smallericon"><use href="./img/symbol-defs.svg#icon-linemileage"></use></svg><span id="line-miles"></span>
                </div>

                <div className="hardrule"></div>

                <div
                    className="row"
                    id="shot-generator-container"
                    data-tooltip
                    data-tooltip-title="Open"
                    data-tooltip-description="Open Shot Generator"
                    data-tooltip-keys=""
                    data-tooltip-position="left middle"
                >
                </div>

                <div className="hardrule"></div>

                <div className="row" id="new-shot"
                    data-tooltip
                    data-tooltip-title="Is this board a new shot?"
                    data-tooltip-description="Check this box if the board is a new shot. You can have multiple boards per shot. This way you can animate or make a transition in a shot."
                    data-tooltip-keys="/"
                    data-tooltip-position="left middle">
                    <input type="checkbox" name="newShot" id="newShot" /><label id="new-shot-label"><span></span>New Shot?</label>
                </div>
                <div className="row">
                    <div id="duration"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-duration"></use></svg>Duration</div>
                    <div className="row">
                        <div className="col">
                            <input type="text" name="duration" placeholder="ms" data-tooltip
                                id="duration-ms"
                                data-tooltip-title="Set the board duration"
                                data-tooltip-description="Enter the number of milliseconds for a board. There are 1000 milliseconds in a second. 2000 milliseconds is the default."
                                data-tooltip-keys=""
                                data-tooltip-position="left middle" />
                        </div>
                        <div className="col">
                            <input type="text" name="frames" placeholder="frames" data-tooltip
                                id="duration-fps"
                                data-tooltip-title="Set the board duration"
                                data-tooltip-description="Enter the number of frames for a board."
                                data-tooltip-keys=""
                                data-tooltip-position="left middle" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-content"></use></svg><span id="content-title">Content</span> <span id="suggested-dialogue-duration" data-tooltip
                        data-tooltip-title="Suggested board duration"
                        data-tooltip-description=""
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></span></div>
                    <textarea name="content" data-tooltip
                        id="content-tooltip"
                        data-tooltip-title="Content for board"
                        data-tooltip-description="Write some content for the board."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"
                        placeholder="Write some content for the board."></textarea>
                </div>
                <div className="row">
                    <div><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-roles"></use></svg><span id="roles-title">Roles</span> <span id="suggested-dialogue-duration" data-tooltip
                        data-tooltip-title="Suggested board duration"
                        data-tooltip-description=""
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></span></div>
                    <div id="roles-select"></div>
                </div>
                <div className="row">
                    <div><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-dialogue"></use></svg><span id="dialog-title">Dialogue</span> <span id="suggested-dialogue-duration" data-tooltip
                        data-tooltip-title="Suggested board duration"
                        data-tooltip-description="Click to set the duration based on the dialogue text."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></span></div>
                    <textarea name="dialogue" data-tooltip
                        id="dialogue-tooltip"
                        data-tooltip-title="Dialogue for board"
                        data-tooltip-description="Write some really sweet dialogue, like, ''As you know, I am your father.'' It will show up as a caption if you have it toggled on."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></textarea>
                </div>
                <div className="row">
                    <div><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-action"></use></svg><span id="action-title">Action</span></div>
                    <textarea name="action" data-tooltip
                        id="action-tooltip"
                        data-tooltip-title="Action for board"
                        data-tooltip-description="Write some action for the board."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></textarea>
                </div>
                <div className="row">
                    <div className="inline"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-notes"></use></svg><span id="note-title">Notes</span></div>
                    <div className="layers-ui-notes-clear flatbutton small" data-tooltip
                        id="clear-note-tooltip"
                        data-tooltip-title="Clear notes drawing layer"
                        data-tooltip-description="Clear the notes layer for this board. You can also clear it when you are on the notes drawing tool and you press:"
                        data-tooltip-keys="Alt+Backspace"
                        data-tooltip-position="left middle"> <svg className="smallericon"><use href="./img/symbol-defs.svg#icon-trash"></use></svg><span id="clear-note-title">Clear Notes Layer</span></div>
                    <textarea name="notes" data-tooltip
                        id="note-tooltip"
                        data-tooltip-title="Notes for the board"
                        data-tooltip-description="Write some notes. Could be board notes for changes, or just some notes for the shot."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"></textarea>
                </div>

                <div className="row">
                    <div className="audiofile_container">

                        <div className="recording_container">
                            <div className="record_button">
                                <div className="flatbutton">
                                    <div className="record_icon">
                                        <span style={{color: 'red', fontWeight: 'bold'}}>R</span>
                                    </div>
                                </div>
                            </div>

                            <div className="record_visualization">
                                <canvas></canvas>
                            </div>
                        </div>

                        <div className="audiofile_button">
                            <div className="flatbutton">
                                <div className="audiofile_icon">
                                    <svg className="smallicon">
                                        <use href="./img/symbol-defs.svg#icon-speaker-on"></use>
                                    </svg>
                                </div>

                                <span className="audiofile_text">
                                    <span className="paren">(</span><a>no audio</a><span className="paren">)</span>
                                </span>
                            </div>
                        </div>

                        <div className="audiofile_clear">
                            <div className="flatbutton"
                                data-tooltip
                                id="remove-audio"
                                data-tooltip-title="Remove audio"
                                data-tooltip-description="Remove audio reference from this board. The file will remain on disk unless Clean Up Scene is used."
                                data-tooltip-keys=""
                                data-tooltip-position="left middle">
                                <svg className="smallicon">
                                    <use href="./img/symbol-defs.svg#icon-trash"></use>
                                </svg>
                            </div>
                        </div>

                        <input
                            hidden={true}
                            type="text"
                            name="audiofile"
                            id="audiofile" />
                    </div>
                </div>

                <div className="hardrule"></div>

                <div className="row">
                    <div className="inline"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-lightbox"></use></svg><span id="reference-layer-title">Reference Layer</span></div>
                    <div className="layers-ui-reference-clear flatbutton small" data-tooltip
                        id="reference-layer-tooltip"
                        data-tooltip-title="Clear reference drawing layer"
                        data-tooltip-description="Clear the reference layer for this board. You can also clear it when you are on the light pencil drawing tool and you press:"
                        data-tooltip-keys="Alt+Backspace"
                        data-tooltip-position="left middle"> <svg className="smallericon"><use href="./img/symbol-defs.svg#icon-trash"></use></svg><span id="clear-title">Clear</span></div>
                    <div>
                        <div className="col">
                            <div className="layers-ui-fill-merge flatbutton" data-tooltip
                                id="merge-down-tooltip"
                                data-tooltip-title="Merge the fill layer down to the reference layer"
                                data-tooltip-description="This is useful if you want to take your existing fill layer and redraw for cleanup. This will combine both layers to the reference layer. The fill layer will be blank."
                                data-tooltip-keys=""
                                data-tooltip-position="left middle"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-mergedown"></use></svg><span id="merge-down-title">Merge Down</span></div>
                        </div>
                        <div className="col">
                            <div className="layers-ui-reference-merge flatbutton" data-tooltip
                                id="merge-up-tooltip"
                                data-tooltip-title="Merge the reference layer up to the fill layer"
                                data-tooltip-description="This is useful if you draw on the reference layer and you want to keep it in your drawing. This will combine both layers to the fill layer. The reference layer will be blank."
                                data-tooltip-keys=""
                                data-tooltip-position="left middle"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-mergeup"></use></svg><span id="merge-up-title">Merge Up</span></div>
                        </div>
                    </div>
                    <div>
                        <input className="layers-ui-reference-opacity" data-tooltip
                            id="layer-opacity-tooltip"
                            data-tooltip-title="Change Reference and Shot Generator Layer Opacity"
                            data-tooltip-description="Change the opacity of the reference layer and Shot Generator layer. You will only be able to see the change if there is a saved Shot Generator shot, or something on the reference layer."
                            data-tooltip-keys=""
                            data-tooltip-position="left middle" type="range" min="0" max="100" step="25" defaultValue="100"/>
                    </div>
                </div>

                <div className="row" id="shot-generator-container" style={{display: 'none'}}>
                    <div className="inline"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-camera"></use></svg>Shot Generator</div>
                    <div id="sts-random" className="flatbutton small" data-tooltip
                        data-tooltip-title="Generate Random Shot Image"
                        data-tooltip-description="Randomize shot image generator settings"
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"> <svg className="smallericon"><use href="./img/symbol-defs.svg#icon-cycle"></use></svg>Random</div>
                    <div id="sts-sidebar">
                        <input id="sts-input1" type="text" placeholder="Describe the shot: for example, medium shot" data-tooltip
                            data-tooltip-title="Shot Description"
                            data-tooltip-description="Describe the shot: for example, medium shot. Press enter to generate a shot image."
                            data-tooltip-keys=""
                            data-tooltip-position="left middle" />
                        <div id="sts-select" data-tooltip
                            data-tooltip-title="Shot Description Data"
                            data-tooltip-description="Refine data used to generate shot images."
                            data-tooltip-keys=""
                            data-tooltip-position="left middle"></div>
                        <div id="sts-shots" data-tooltip
                            data-tooltip-title="Generated Shot Images"
                            data-tooltip-description="Click to refine data for generated shot image. Double-click to use generated shot image as reference layer."
                            data-tooltip-keys=""
                            data-tooltip-position="left middle"></div>
                    </div>
                </div>

                <div className="hardrule"></div>

                <div className="row sidebar-scene-settings">

                    <div style={{marginBottom: '0.5rem'}} id="scene">Scene</div>

                    <div className="row">
                        <div className="col">
                            <label style={{color: '#777'}} id="frame-rate">Frame Rate </label>
                        </div>
                        <div className="col">
                            <select className="sidebar-scene-settings_fps">
                                <option defaultValue="12">12</option>
                                <option defaultValue="15">15</option>
                                <option defaultValue="24">24</option>
                                <option defaultValue="23.976">23.98 (23.976)</option>
                                <option defaultValue="25">25</option>
                                <option defaultValue="29.97">29.97</option>
                                <option defaultValue="30">30</option>
                                <option defaultValue="50">50</option>
                                <option defaultValue="59.94">59.94</option>
                                <option defaultValue="60">60</option>
                            </select>
                            <span style={{color: '#777', marginLeft: '0.25rem'}}>fps</span>
                        </div>
                    </div>
                </div>

                <div className="hardrule"></div>

                <div className="row">
                    <div className="flatbutton" id="show-in-finder-button" data-tooltip
                        data-tooltip-title="Show board in file system"
                        data-tooltip-description="Click here to show the board image file in the file system. This is useful for external editors."
                        data-tooltip-keys=""
                        data-tooltip-position="left middle"><svg className="smallicon"><use href="./img/symbol-defs.svg#icon-showfile"></use></svg><span id="show-in-finder-title">Show in Folder</span></div>
                </div>
            </div>
            <svg className="scroll-indicator">
                <use href="./img/symbol-defs.svg#icon-small-down-arrow"></use>
            </svg>
        </>
    )
}

export default BoardMetadata