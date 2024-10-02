function sendHighlightedText(json) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, json);
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "highlightText") {
    const formData = new FormData();
    formData.append('text', request.text.replace(/\s+/g, " "));

    fetch('https://english.edward.io/parse', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        sendHighlightedText({
          originalText: request.text,
          highlightedText: data
        });
      })
      .catch(error => console.error('Error:', error));
  }
});
