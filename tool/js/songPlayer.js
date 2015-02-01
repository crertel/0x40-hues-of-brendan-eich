var SOBE = SOBE || {};

SOBE.songPlayer = (function() {

    var context = new AudioContext();
    var source = null;
    var srcbuff = null;

    var startedAt = 0;

    function setSongFromArrayBuffer( buff ) {
        srcbuff = null;
        context.decodeAudioData( buff, function _onDecoded( buffer ) {
            console.log("Audo decoded.");
            srcbuff = buffer;
        });
    };

    function play() {
        console.log(srcbuff);

        if (source) {
            source.stop();
        }
        if (srcbuff) {
            console.log("Creating audio source");
            source = context.createBufferSource();
            source.buffer = srcbuff;
            source.loop = true;
            source.connect(context.destination);
            source.start(0);
            startedAt = context.currentTime;
        }
    };

    function stop() {
        startedAt = 0;
        if (source) { 
            source.stop();
        }
    };

    function tell() {
        return context.currentTime - startedAt;
    };

    return {
        setSongFromArrayBuffer: setSongFromArrayBuffer,
        play: play,
        stop: stop,
        tell: tell
    };
})();
