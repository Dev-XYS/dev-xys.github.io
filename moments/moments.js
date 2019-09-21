window.onload = function() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "list.txt");
	xhr.responseType = "text";
	xhr.onload = function() {
		let list = xhr.responseText.split("\n");
		for (let x of list) {
			setTimeout(displayOne, 0, x);
		}
	};
	xhr.send();
}

function displayOne(id) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", id + ".html", false);
	xhr.send();
	let div = document.getElementById("main-div");
	div.innerHTML += xhr.responseText;
	div.innerHTML += "<div class=\"comment-area\" id=\"comment-area-"+ id + "\"><div id=\"comment-panel-" + id + "\"><a href=\"javascript:startComment(" + id + ")\">评论</a>&emsp;</div></div>";
	xhr.open("GET", "https://wcsys.000webhostapp.com/get.php?id=" + id);
	xhr.onload = function() {
		let cdiv = document.createElement("div");
		cdiv.id = "comment-body-" + id;
		cdiv.innerText = xhr.responseText;
		let area = document.getElementById("comment-area-" + id);
		area.appendChild(cdiv);
		let script = document.getElementById(id + "-script");
		if (script) {
			console.log(script.innerText);
			eval(script.innerText);
		}
	};
	xhr.send();
}

function startComment(id) {
	let panel = document.getElementById("comment-panel-" + id);
	if (panel.childElementCount === 1) {
		panel.firstChild.innerHTML = "取消";
		let input = document.createElement("input");
		input.id = "comment-box-" + id;
		panel.appendChild(input);
		panel.innerHTML += "&emsp;<a href=\"javascript:submitComment(" + id + ")\" class=\"comment-button\">提交</a>";
	}
	else {
		panel.firstChild.innerHTML = "评论";
		panel.removeChild(panel.lastChild);
		panel.removeChild(panel.lastChild);
		panel.removeChild(panel.lastChild);
	}
}

function submitComment(id) {
	let xhr = new XMLHttpRequest();
	input = document.getElementById("comment-box-" + id);
	xhr.open("GET", "https://wcsys.000webhostapp.com/put.php?id=" + id + "&content=" + input.value);
	xhr.send();
	document.getElementById("comment-body-" + id).innerText += input.value + "\n";
	let panel = document.getElementById("comment-panel-" + id);
	panel.firstChild.innerHTML = "评论";
	panel.removeChild(panel.lastChild);
	panel.removeChild(panel.lastChild);
	panel.removeChild(panel.lastChild);
}
