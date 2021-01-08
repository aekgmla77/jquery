/**
 * showPage.js
 */

function showPage() {
	let doc = xhtp.responseXML;
	let data = doc.getElementsByTagName('record');
	console.log(data);
	let tableTag = document.createElement('table');
	tableTag.setAttribute('border', '1');
	tableTag.setAttribute('id', 'tbl');

	//title tr
	//data tr => [배열]
	let headerTr = titleRow(data);
	let dataTrs = contentRow(data);
	tableTag.appendChild(headerTr);
	for (let i = 0; i < dataTrs.length; i++) {
		tableTag.appendChild(addBtn(dataTrs[i], delFunc));
	}
	document.getElementById('show').appendChild(tableTag);
}

function delFunc() {
	console.log(this.parentNode.parentNode.remove());
	let d = this.parentNode.parentNode.childNodes[0].firstChild.nodeValue;
	let r = new XMLHttpRequest();
	r.open('get', '../deleteEmp?empId=' + d);
	r.send();
	r.onload = function() {
		console.log(r.responseText);
	}
}
function addBtn(tr, callBackFunc) {
	//버튼 추가 코드. 이벤트 등록
	let butn = document.createElement('button');
	butn.onclick = callBackFunc;
	butn.innerHTML = 'Del';
	let tdTag = document.createElement('td');
	tdTag.onmouseover = function() {
		this.style.background = 'red';
	}
	tdTag.onmouseout = function() {
		this.style.background = 'white';
	}

	tdTag.appendChild(butn);
	tr.appendChild(tdTag);

	return tr;
}

function titleRow(result) {
	console.log(result[0].childNodes[0].nodeName);
	let trTag = document.createElement('tr');
	for (let i = 0; i < result[0].childNodes.length; i++) {
		let thTag = document.createElement('th');
		thTag.onmouseover = function() {
			this.style.background = 'lightgreen';
		}
		thTag.onmouseout = function() {
			this.style.background = 'white';
		}
		let textNode = document.createTextNode(result[0].childNodes[i].nodeName.toUpperCase());
		thTag.appendChild(textNode);
		trTag.appendChild(thTag);
	}
	let thTag = document.createElement('th');
	thTag.onmouseover = function() {
		this.style.background = 'lightgreen';
	}
	thTag.onmouseout = function() {
		this.style.background = 'white';
	}
	let textNode = document.createTextNode('처리');
	thTag.appendChild(textNode);
	trTag.appendChild(thTag);

	return trTag;
}

function contentRow(result) {
	let trTags = [];
	for (let j = 0; j < result.length; j++) {
		let trTag = document.createElement('tr');
		trTag.onclick = function() {
			/*console.log(this.childNodes[5].firstChild.nodeValue);*/
			document.getElementById('eid').value = this.childNodes[0].firstChild.nodeValue;
			document.getElementById('fName').value = this.childNodes[1].firstChild.nodeValue;
			document.getElementById('lName').value = this.childNodes[2].firstChild.nodeValue;
			document.getElementById('email').value = this.childNodes[3].firstChild.nodeValue;
			document.getElementById('pNumber').value = this.childNodes[4].firstChild.nodeValue;
			document.getElementById('hDate').value = this.childNodes[5].firstChild.nodeValue;
			document.getElementById('jobId').value = this.childNodes[6].firstChild.nodeValue;
			document.getElementById('salary').value = this.childNodes[7].firstChild.nodeValue;
			/*for (let n = 0; n < this.childNodes.length; n++) {
				document.getElementById('ss').value = this.childNodes[n].firstChild.nodeValue;
			}*/
		}
			let empId = result[j].childNodes[0].firstChild.nodeValue;
			trTag.setAttribute('id', 'emp_' + empId);
		for (let i = 0; i < result[0].childNodes.length; i++) {
			let tdTag = document.createElement('td');
			tdTag.onmouseover = function() {
				this.style.background = 'lightblue';
			}
			tdTag.onmouseout = function() {
				this.style.background = 'white';
			}
			let textNode = document.createTextNode(result[j].childNodes[i].firstChild.nodeValue);
			tdTag.appendChild(textNode);
			trTag.appendChild(tdTag);
		}
		trTags.push(trTag);
	}
	return trTags;
}