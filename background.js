// contains scoreID to svg url mappings for each page visited
const activeScores = {};
const idToName = {};

// [width, height] pairs that determine the page size of the end pdf
const scoreDims = {
	xxsmall: [612, 792],
	xsmall: [765, 990],
	small: [1020, 1320],
	medium: [2040, 2640],
	large: [3060, 3960]
}
const dims = scoreDims.xxsmall;

// tries to fetch the next index score page until an error occurs, at which it stops
async function prepareImageURLs(id, baseUrl, songName, extension) {
	activeScores[id] = [];
	idToName[id] = songName;
	let run = true;
	let i = 0;
	while (run) {
		let url = `${baseUrl}score_${i}.${extension}`;
		let fetched = await fetch(url);
		if (fetched.status === 200) {
			activeScores[id].push(url);
			i++;
		} else {
			run = false;
		}
	}
}
async function addImagesToPDF(id, pdf) {
	let urlList = activeScores[id];
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	canvas.width = scoreDims.large[0];
	canvas.height = scoreDims.large[1];
	for (let i = 0; i < urlList.length; i++) {
		let img = await loadImage(urlList[i]);
		ctx.drawImage(img, 0, 0, ...scoreDims.large);
		pdf.addImage(canvas, 0, 0, ...dims);
		if (i + 1 !== urlList.length) {
			pdf.addPage(dims, "portrait");
		}
	}
	savePDF(pdf, idToName[id]);
}
function savePDF(pdf, name) {
	chrome.downloads.download({
		url: pdf.output("bloburl"),
		filename: name ? name + ".pdf" : "score.pdf",
		saveAs: true
	}, () => {
		console.log("Score Downloaded");
	});
}
async function loadImage(url) {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.src = url;
		img.addEventListener("load", () => {
			img.width = scoreDims.large[0];
			img.height = scoreDims.large[1];
			resolve(img);
		});
		img.addEventListener("error", () => {
			reject();
		});
	});
}
chrome.runtime.onMessage.addListener(req => {
	if (req.url && req.name) {
		let url = (/.*(?<=https?:\/\/musescore\.com\/static.*\/)(\d*)(?=\/[^\/]*\/score_0\.(?:svg|png)).*(?=score_0.(svg|png))/).exec(req.url);
		if (url) {
			// checks to make sure the url contains the score id and there is not already data stored about this score in activeScores
			if (url[0] && url[1] && url[2] && !activeScores[url[1]]) {
				prepareImageURLs(url[1], url[0], req.name, url[2]);
			}
		}
	}
});
chrome.browserAction.onClicked.addListener(async tab => {
	if (tab.url) {
		if (tab.url.match(/https?:\/\/musescore\.com/)) {
			let id = tab.url.match(/(?<=scores\/)\d*/);
			if (id) {
				if (activeScores[id[0]]) {
					let pdf = new jspdf.jsPDF({
						orientation: "portrait",
						unit: "px",
						format: dims,
						putOnlyUsedFonts: true,
						compress: true
					});
					addImagesToPDF(id[0], pdf);
				}
			}
		}
	}
});