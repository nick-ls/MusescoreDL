//"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replaceAll("x", _=>"abcdefghijklmnopqrstuvwxyz1234567890"[(Math.random() * 36)|0]);
chrome.extension.onMessage.addListener((msg, sender, respond) => {
	loadAllImages().then(urls => {
		respond({urls: urls, name: document.title});
	});	
	return true;
});

function getVisibleImages() {
	return Array.from(document.querySelectorAll("img")).filter(image => {
		return (/\d+ of \d+ pages/).test(image.getAttribute("alt"));
	});
}
async function loadAllImages() {
	let images = getVisibleImages();
	let finalUrls = [];
	if (images[0]) {
		let loadingZones = document.querySelectorAll("." + images[0].parentElement.className);
		let currentZone = 0;
		let numberOfPages = loadingZones.length;
		let fullPage = loadingZones[0].parentElement;
		let scrollAmount = fullPage.scrollHeight / numberOfPages;
		console.log(loadingZones);
		fullPage.scroll(0, 0);
		while (finalUrls.length < (numberOfPages)) {
			let url = await (async () => {
				let src = "";
				while (!src) {
					if (loadingZones[currentZone].querySelector("img")) {
						src = loadingZones[currentZone].querySelector("img").src;
					}
					await new Promise(resolve => {
						setTimeout(resolve, 40);
					});
				}
				return src;
			})();
			finalUrls.push(url);
			currentZone++;
			fullPage.scroll(0, (currentZone + 1) * scrollAmount);
		}
		return finalUrls;
	}
	return "There are no images to be found";
}