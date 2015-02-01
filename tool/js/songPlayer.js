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

            console.log("Calculating BPM");
            
            var offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate);
            var source = offlineContext.createBufferSource();
            source.buffer = buffer;
            var filter = offlineContext.createBiquadFilter();
            filter.type = "lowpass";
            source.connect(filter);
            filter.connect(offlineContext.destination);
            
            source.start(0);
            offlineContext.startRendering();
            offlineContext.oncomplete = function(res) {
                var filteredBuffer = res.renderedBuffer;
                console.log("Filtered.");


                function getPeaksAtThreshold(data, threshold) {
                    console.log(JSON.stringify(data,null,4));
                    var buff = data.getChannelData(0);
                    console.log("Clip length: ", buff.length / data.sampleRate);
                    var quarter_second = Math.floor(data.sampleRate *.25);
                    var peaksArray = [];

                    // find peaks
                    for(var i = 0; i < data.length;) {
                        if (buff[i] > threshold) {
                            peaksArray.push(i);
                            // Skip forward ~ 1/4s to get past this peak.
                            i += quarter_second;
                        }
                        i++;
                    }
                    return peaksArray;
                }

                var peaks = getPeaksAtThreshold( filteredBuffer, .1);                
                function countIntervalsBetweenNearbyPeaks(peaks) {
                      var intervalCounts = [];
                        peaks.forEach(function(peak, index) {
                                for(var i = 0; i < 10; i++) {
                                    var interval = peaks[index + i] - peak;
                                    var foundInterval = intervalCounts.some(function(intervalCount) {
                                    if (intervalCount.interval === interval)
                                        return intervalCount.count++;
                                    });
                                    if (!foundInterval) {
                                        intervalCounts.push({
                                            interval: interval,
                                            count: 1
                                        });
                                    }
                                }
                            });
                        return intervalCounts;
                }

                var peakBins = countIntervalsBetweenNearbyPeaks(peaks);
                var sorted =  peakBins
                              .sort(function(a,b) { return b.count - a.count;})                              
                              .slice(0,10)
                              .map(function(x) { return x.count});

                var guessedBPM = (sorted[0] < .1)? sorted[1] : sorted[0];
                if (guessedBPM < 90) { 
                    guessedBPM  *= 2;
                }
                if (guessedBPM > 180) {
                    guessedBPM /= 2;
                }
                console.log("Suggested BPM : ", guessedBPM);
            }
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
