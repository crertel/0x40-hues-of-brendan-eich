var SOBE = SOBE || {};

SOBE.songPlayer = (function() {

    var context = new AudioContext();
    var source = null;
    var srcbuff = null;

    var startedAt = 0;

    var renderTimeout = null;

    var currImageIndex = 0;

    function setSongFromArrayBuffer( buff ) {
        srcbuff = null;
        context.decodeAudioData( buff, function _onDecoded( buffer ) {
            console.log("Audo decoded.");
            srcbuff = buffer;
        });
    };

    function randomColor() {
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);

        return "rgb(" + r + "," + g + "," + b + ")";
    };

    function setupRendering() {
    var $canvas = document.getElementById("song-view");
        var ctx = $canvas.getContext('2d');
        renderTimeout = window.setInterval( function _render() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = randomColor()
            ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
            ctx.globalCompositeOperation = 'multiply';

            if (SOBE.loaded_images.length > 0 ){
                ctx.drawImage( SOBE.loaded_images[currImageIndex],0,0,ctx.canvas.width,ctx.canvas.height);
                currImageIndex++;
                if (currImageIndex >= SOBE.loaded_images.length) {
                    currImageIndex = 0;
                }
            }

        }, 500);
    }

    function teardownRendering() {
    var $canvas = document.getElementById("song-view");
        var ctx = $canvas.getContext('2d');
        window.clearInterval(renderTimeout);
    }

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

            setupRendering();
        }
    };

    function stop() {
        startedAt = 0;
        if (source) { 
            source.stop();
        }

        teardownRendering();
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
