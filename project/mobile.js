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
    }
  }
}

document.addEventListener('touchstart', onTouchStart);
document.addEventListener('touchmove', onTouchMove);
