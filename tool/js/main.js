var SOBE = SOBE || {};

SOBE.init = function() {

    var dlbtn = document.getElementById("download-btn");
    dlbtn.href = "http://www.example.com";
    dlbtn.onclick = function() {
        var blob = SOBE.currentSong.getAsBlob();
        dlbtn.href= URL.createObjectURL(blob);
    }

    var $status = document.getElementById("file-status");

    var $songURL = document.getElementById("song-url");
    var $songPicker = document.getElementById("song-file");

    function songUrlChanged() {
        $status.innerHTML = "Loading song from URL " + $songURL.value;
    }

    function songFileChanged() {
        if ( $songPicker.files.length > 0 ) {
            $status.innerHTML = "Loading song from file " + $songPicker.files[0];
            var fr = new FileReader();
            fr.onload = function( ) {
                $status.innerHTML = "Loaded song from file.";
                SOBE.songPlayer.setSongFromArrayBuffer( fr.result );
            };
            fr.readAsArrayBuffer( $songPicker.files[0] );
        }
    }

    $songURL.onchange = songUrlChanged;
    $songPicker.onchange = songFileChanged;

    $startButton = document.getElementById("start-button");
    $startButton.onclick = SOBE.songPlayer.play;
    $stopButton = document.getElementById("stop-button");
    $stopButton.onclick = SOBE.songPlayer.stop;
};
