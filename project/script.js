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

// Canvasとvideo要素を自動的に取得する
const canvas = document.querySelector('canvas#my-live2d');
const video = document.querySelector('video#cv-video');

// 録画ボタンと停止ボタンを取得する
const startButton = document.getElementById('start-recording');
const stopButton = document.getElementById('stop-recording');
const downloadLink = document.getElementById('download-link');

let stream;
let recorder;
let chunks = [];

// 録画開始ボタンのクリックイベント
startButton.addEventListener('click', () => {
    // ユーザーのカメラからビデオストリームを取得する
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
            stream = mediaStream;
            // MediaRecorderを初期化する
            recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            recorder.onstop = () => {
                // 録画が停止された時の処理
                let blob = new Blob(chunks, { type: 'video/webm' });
                video.src = window.URL.createObjectURL(blob);
                // 動画ダウンロードリンクを設定する
                downloadLink.href = video.src;
                downloadLink.style.display = 'block';
            };
            // 録画を開始する（FPSは30）
            recorder.start(1000 / 30);
            startButton.disabled = true; // 録画開始ボタンを無効化
            stopButton.disabled = false; // 録画停止ボタンを有効化
        })
        .catch((error) => {
            console.error('getUserMedia error:', error);
        });
});

// 録画停止ボタンのクリックイベント
stopButton.addEventListener('click', () => {
    recorder.stop(); // 録画を停止する
    stream.getTracks().forEach(track => track.stop()); // ストリームを停止する
    chunks = []; // チャンクをクリアする
    startButton.disabled = false; // 録画開始ボタンを有効化
    stopButton.disabled = true; // 録画停止ボタンを無効化
});
