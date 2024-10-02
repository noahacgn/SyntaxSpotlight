let isAltKeyPressed = false;

function replaceSelectedText(replacementText) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const newNode = document.createElement('span');
    newNode.innerHTML = replacementText;
    range.insertNode(newNode);
  }
}

function handleTextSelection() {
  if (isAltKeyPressed) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      chrome.runtime.sendMessage({
        action: "highlightText",
        text: selectedText
      });
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Alt') isAltKeyPressed = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Alt') isAltKeyPressed = false;
});

document.addEventListener('mouseup', handleTextSelection);

chrome.runtime.onMessage.addListener((message) => {
  if (message.originalText && message.highlightedText) {
    replaceSelectedText(message.highlightedText);
  }
});
