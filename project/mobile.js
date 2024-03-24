let startDistance = 0;

function onTouchStart(event) {
  if (event.touches.length === 2) {
    startDistance = Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
  }
}

function onTouchMove(event) {
  if (event.touches.length === 2) {
    const distance = Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
    if (distance < startDistance) {
      console.log('ピンチイン操作が検出されました。');
      event.preventDefault();
		  currentModel.scale.set(
			clamp(currentModel.scale.x + event.deltaY * -0.001, -0.5, 10)
		);
    } else if (distance > startDistance) {
      console.log('ピンチアウト操作が検出されました');
      event.preventDefault();
		  currentModel.scale.set(
			clamp(currentModel.scale.x - event.deltaY * -0.001, -0.5, 10)
		);
  }
}

document.document.querySelector("#my-live2d").addEventListener('touchstart', onTouchStart);
document.document.querySelector("#my-live2d").addEventListener('touchmove', onTouchMove);
