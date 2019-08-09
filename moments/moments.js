window.onload = function() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "list.txt");
	xhr.responseType = "text";
	xhr.onload = function() {
		let list = xhr.responseText.split("\n");
		function displayOne(x) {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", x + ".html", false);
			xhr.send();
			document.getElementById("main-div").innerHTML += xhr.responseText;
		}
		for (let x of list) {
			setTimeout(displayOne, 0, x);
		}
	};
	xhr.send();
}
