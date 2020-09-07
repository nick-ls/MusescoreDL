(function(){
	const observer = new MutationObserver(list => {
		for (let item of list) {
			let img = item.target.querySelector("div > div > div > img");
			if (img) {
				if (img.src.match(/.*(?<=https?:\/\/musescore\.com\/static.*\/)(\d*)(?=\/[^\/]*\/score_\d+\.svg).*(?=score_0.svg)/)) {
					chrome.runtime.sendMessage({
						url: img.src,
						name: document.querySelector("h1").innerText
					});
				}
			}
		}
	});
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
})();