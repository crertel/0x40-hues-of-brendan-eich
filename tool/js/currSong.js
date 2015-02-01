var SOBE = SOBE || {};

SOBE.currentSong = (function() {

    var state = {
        BPM: 0,
        URI: "",
        cues: []
    };

    function getAsBlob() {
        return new Blob( [ JSON.stringify(state) ], {type: "application/json"});
    };

    function setURI( uri ) {
        state.URI = uri;
    };

    function setBPM ( bpm ) { 
        state.BPM = bpm;
    }

    function addCue( beat, cue ) {
        cues[beat] = cue;
    }

    function clearCues() {
        cues = [];
    }
    
    return {
        setURI: setURI,
        setBPM: setBPM,
        addCue: addCue,
        clearCues: clearCues,
        getAsBlob: getAsBlob
    };
})();
