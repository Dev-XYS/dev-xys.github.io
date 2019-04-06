window.onload = function() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "list.txt");
	xhr.responseType = "text";
	xhr.onload = function() {
		let list = xhr.responseText.split("\n");
		for (let x of list) {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", x + ".html", false);
			xhr.send();
			document.getElementById("main-div").innerHTML += xhr.responseText;
		}
	};
	xhr.send();
}
