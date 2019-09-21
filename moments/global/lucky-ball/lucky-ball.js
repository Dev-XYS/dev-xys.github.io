function LuckyBall(id) {
	console.log("You invoked your lucky ball!");
	if (new.target !== LuckyBall) {
		throw new Error('LuckyBall must be newed.');
	}
	let ctx = document.getElementById(id).getContext('2d');
	function drawGround() {
		ctx.beginPath();
		ctx.moveTo(0, 99);
		ctx.lineTo(99, 99);
		ctx.stroke();
		ctx.closePath();
	}
	function drawBallAt(height) {
		ctx.beginPath();
		ctx.arc(50, height, 10, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	function bouncingFunction(x) {
		x %= 61;
		x = x > 30 ? x - 60 : x;
		x /= 30;
		return x * x * 80 + 10;
	}
	let globalTime = 0;
	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, 100, 100);
		drawGround();
		drawBallAt(bouncingFunction(globalTime++));
	}
	ctx.strokeStyle = '#6565D0';
	ctx.fillStyle = '#6565D0';
	requestAnimationFrame(animate);
}
