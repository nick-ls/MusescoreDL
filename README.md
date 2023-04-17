# MusescoreDL
This is a Firefox extension that allows you to download sheet music from Musescore without having to pay for their subscription fees. In the past, downloading and printing music was free for everyone, but they changed their site so that downloading a PDF of the sheet music and/or printing it is locked behind a paywall. This extension scrolls to load the rendered score images from the website and stitches them together into a PDF¹.

### How to use
1. Navigate to a Musescore score (ex: https://musescore.com/author/scores/#########)
2. Click on the extension icon in the Firefox extension menu
3. The score will start automatically scrolling to the bottom, and afterwards you will then be prompted to save a PDF 
4. Save it to a location you'll remember.

### How to install
1) First download Firefox Developer Edition. It's possible to hack the `omni.ja` of regular Firefox to allow loading of unsigned extensions, but Firefox Developer Edition is the only version I know respects the `xpinstall.signatures.required` parameter in `about:config`
2) Go to `about:config` and set the `xpinstall.signatures.required` variable to `False`
3) [Follow these instructions on how to load an unsigned extension](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

### Why don't you sign this extension?
1) It likely wouldn't be approved

---
¹PDFs created with this chrome extension are for **personal use only** and are not meant for selling, distribution, or sharing of any kind between individuals or organizations.
