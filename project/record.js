const Display = document.getElementById('my-live2d');
const ctx = Display.getContext('2d');
let mediaRecorder;
let recordedChunks = [];

function startRecording() {
    recordedChunks = [];
    const stream = canvas.captureStream();
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm; codecs=vp9'
    });

    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = function() {
        const blob = new Blob(recordedChunks, {
            type: 'video/mp4'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: block; color: white;';
        const timestamp = new Date().toISOString().slice(0, -5).replace(/[-T:/]/g, '');
        a.href = url;
        a.download = `recording_${timestamp}.mp4`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    mediaRecorder.start();
}

function stopRecording() {
    mediaRecorder.stop();
}

document.getElementById('rec-start').addEventListener('click', startRecording);
document.getElementById('rec-stop').addEventListener('click', stopRecording);
