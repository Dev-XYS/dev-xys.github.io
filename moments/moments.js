'use strict';

$(async () => {
	const res = await fetch('list.txt');
	let list = await res.text();
	list = list.split('\n');
	const tasks = [];
	for (let i of list) {
		$('#main-div').append(`<div id="${i}-anchor"></div>`);
		tasks.push(displayOne(i));
	}
	await Promise.all(tasks);
});

async function displayOne(id) {
	const res = await fetch(`posts/${id}.html`);
	$(`#${id}-anchor`).html(await res.text()).append(`<div class="comment-area" id="comment-area-${id}"><div id="comment-panel-${id}"><a href="javascript:startComment(${id})">评论</a>&emsp;</div></div>`);
	const comment = await fetch(`https://wcsys.000webhostapp.com/get.php?id=${id}`);
	let div = $(`<div id="comment-body-${id}"/>`);
	div[0].innerText = parseComment(await comment.text());
	$(`#comment-area-${id}`).append(div);
	eval($(`#${id}-script`).text());
}
/*/
window.onload = async function() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "list.txt");
	xhr.responseType = "text";
	xhr.onload = async function() {
		let list = xhr.responseText.split("\n");
		for (let x of list) {
			let div = document.getElementById("main-div");
			div.innerHTML += `<div id="${x}-anchor"></div>`;
			setTimeout(displayOne, 0, x);
			await new Promise(r => setTimeout(r, 1));
		}
	};
	xhr.send();
}

function displayOne(id) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "posts/" + id + ".html");
	xhr.onload = function() {
		console.log(`${id}-anchor`);
		let div = document.getElementById(`${id}-anchor`);
		div.innerHTML = xhr.responseText;
		div.innerHTML += "<div class=\"comment-area\" id=\"comment-area-"+ id + "\"><div id=\"comment-panel-" + id + "\"><a href=\"javascript:startComment(" + id + ")\">评论</a>&emsp;</div></div>";
		xhr.open("GET", "https://wcsys.000webhostapp.com/get.php?id=" + id);
		xhr.onload = function() {
			let cdiv = document.createElement("div");
			cdiv.id = "comment-body-" + id;
			cdiv.innerText = parseComment(xhr.responseText);
			let area = document.getElementById("comment-area-" + id);
			area.appendChild(cdiv);
			let script = document.getElementById(id + "-script");
			if (script) {
				eval(script.innerText);
			}
		};
		xhr.send();
	};
	xhr.send();
}
*/
function parseComment(text) {
	return text;
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
