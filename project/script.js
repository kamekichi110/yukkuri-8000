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
	} else {
		console.error = "error (modal script)";
	}
};
setting.addEventListener("click", modal);