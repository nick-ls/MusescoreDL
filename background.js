// [width, height] pairs that determine the page size of the end pdf
const scoreDims = {
	xxsmall: [612, 792],
	xsmall: [765, 990],
	small: [1020, 1320],
	medium: [2040, 2640],
	large: [3060, 3960]
}
const dims = scoreDims.small;

async function addImagesToPDF(pdf, urls, name) {
	for (let i = 0; i < urls.length; i++) {
		let canvas = document.createElement("canvas");
		let ctx = canvas.getContext("2d");
		canvas.width = scoreDims.large[0];
		canvas.height = scoreDims.large[1];
		let img = await loadImage(urls[i]);
		ctx.drawImage(img, 0, 0, ...scoreDims.large);
		pdf.addImage(canvas, 0, 0, ...dims);
		if (i + 1 !== urls.length) {
			pdf.addPage(dims, "portrait");
		}
	}
	savePDF(pdf, name);
}

async function loadImage(url) {
	return new Promise((resolve, reject) => {
		let img = new Image();
		
		img.crossOrigin = "*";
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
function savePDF(pdf, name) {
	chrome.downloads.download({
		url: pdf.output("bloburl"),
		filename: name ? name.replace(/ Sheet music for.*/, "").replace(/[^a-zA-Z0-9\._\-\s]/g, "_") + ".pdf" : "score.pdf",
		saveAs: true
	}, () => {
		console.log("Score Downloaded");
	});
}
chrome.browserAction.onClicked.addListener(async tab => {
	chrome.tabs.sendMessage(tab.id, {clicked: true},async res => {
		let pdf = new jspdf.jsPDF({
			orientation: "portrait",
			unit: "px",
			format: dims,
			putOnlyUsedFonts: true,
			compress: true
		});
		addImagesToPDF(pdf, res.urls, res.name);
	});
});