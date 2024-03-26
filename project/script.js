// HTML要素の取得
const micTopInput = document.getElementById("micTopSet");
const micLeftInput = document.getElementById("micLeftSet");
const deskTopInput = document.getElementById("deskTopSet");
const deskLeftInput = document.getElementById("deskLeftSet");
const micTopOutput = document.getElementById("micTop");
const micLeftOutput = document.getElementById("micLeft");
const deskTopOutput = document.getElementById("deskTop");
const deskLeftOutput = document.getElementById("deskLeft");
const deskSize = document.getElementById("deskSize");
const deskSizeVal = document.getElementById("deskValue");
const micSize = document.getElementById("micSize");
const micSizeVal = document.getElementById("micValue");

//get screen size data.
const sw = window.innerWidth;
const sh = window.innerHeight;

//image element
const desk = document.getElementById("desk");
const mic = document.getElementById("mic");

function SetNum(id, change, bar, info) {
	var elem = document.getElementById(id);
	var val = document.getElementById(change);
	var range = document.getElementById(bar)
	if (info = 0) {
		elem.style.top = val.value + "px";
		range.value = val.value;
	} else if (info = 1) {
		elem.style.left = val.value + "px";
		range.value = val.value;
	} else if (info = 2) {
		elem.style.width = val.value + "px";
		range.value = val.value;
	} else {
		window.alert('error!');
	}
}


// 値をセットする関数
const setDeskTopValue = (e) => {
	deskTopOutput.value = e.target.value;
	desk.style.top = e.target.value + "px";
};

const setDeskLeftValue = (e) => {
	desk.style.left = e.target.value + "px";
	deskLeftOutput.value = e.target.value;
};

const setMicTopValue = (e) => {
	mic.style.top = e.target.value + "px";
	micTopOutput.value = e.target.value;
};

const setMicLeftValue = (e) => {
	mic.style.left = e.target.value + "px";
	micLeftOutput.value = e.target.value;
};

const setDeskWidthValue = (e) => {
	deskValue.value = e.target.value;
	desk.style.width = e.target.value + "px";
};

const setMicWidthValue = (e) => {
	micValue.value = e.target.value;
	mic.style.width = e.target.value + "px";
};

// イベントリスナーの追加
window.onload = () => {
	deskTopInput.addEventListener("input", setDeskTopValue);
	deskLeftInput.addEventListener("input", setDeskLeftValue);
	micTopInput.addEventListener("input", setMicTopValue);
	micLeftInput.addEventListener("input", setMicLeftValue);
	deskSize.addEventListener("input", setDeskWidthValue);
	micSize.addEventListener("input", setMicWidthValue);
	setValueInfo();
};
function setValueInfo() {
	deskTopInput.max = sh;
	deskLeftInput.max = sw;
	micTopInput.max = sh;
	micLeftInput.max = sw;
	deskSize.max = sw + 1500;
	micSize.max = sw + 1500;
	console.log("width:" + sw + ", height:" + sh);
}
const setting = document.getElementById("setting");
const modal = () => {
	var modalElem = document.getElementById("modal1");
	if ((modalElem.style.display = "none")) {
		document.getElementById("modal1").style.display = "block";
	} else if (modalElem.style.display = "block") {
		document.getElementById('modal1').style.display = "none";
	} else {
		console.error = "error (modal script)";
	}
};

function modalSet() {
	var modalElem = document.getElementById('modal1');
	if (modalElem.style.display = "none") {
		document.getElementById('modal1').style.display = "block";
	} else if (modalElem.style.display = "block") {
		document.getElementById('modal1').style.display = "none";
	} else {
		console.error = "error (modal script)";
	};
}
setting.addEventListener("click", modal);


let canvas = document.getElementById('my-live2d');
let video = document.getElementById('cv-video');
let startButton = document.getElementById('start-recording');
let stopButton = document.getElementById('stop-recording');
let downloadLink = document.getElementById('download-link');

let stream;
let recorder;
let chunks = [];

startButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then((mediaStream) => {
            stream = mediaStream;
            recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            recorder.onstop = () => {
                let blob = new Blob(chunks, { type: 'video/mp4' });
                video.src = window.URL.createObjectURL(blob);
                downloadLink.href = video.src;
                downloadLink.style.display = 'block';
            };
            recorder.start();
            startButton.disabled = true;
            stopButton.disabled = false;
        })
        .catch((error) => {
            console.error('getUserMedia error:', error);
        });
});

stopButton.addEventListener('click', () => {
    recorder.stop();
    stream.getTracks().forEach(track => track.stop());
    chunks = [];
    startButton.disabled = false;
    stopButton.disabled = true;
});
