# MusescoreDL
This is a Chrome extension that allows you to download sheet music from Musescore without having to pay for their subscription fees. In the past, downloading and printing music was free for everyone, but recently they changed their site so that downloading a PDF of the sheet music and/or printing it is locked behind a paywall. This extension scrolls to load the rendered score images from the website and stitches them together into a PDF¹.

### How to use
1. Navigate to a Musescore score (ex: https://musescore.com/author/scores/#########)
2. Click on the extension icon in the chrome extension menu
3. The score will start automatically scrolling to the bottom, and afterwards you will then be prompted to save a PDF 
4. Save it to a location you will remember where it is later.

### How to install
You can either follow the tutorial at this [link](https://stackoverflow.com/a/24577660), or continue reading the rest of this section.
1. Download the latest release
2. Unzip the folder into a location where it will stay for the duration you will have the extension. You will not be able to move this folder without the extension breaking after the next steps.
3. Navigate to `chrome://extensions`
4. In the top right, toggle `Developer mode` on
5. Click `Load unpacked` in the top left and select the folder you extracted the files to
6. You should now see that the extension is installed

---
¹PDFs created with this chrome extension are for **personal use only** and are not meant for selling, distribution, or sharing of any kind between individuals.
