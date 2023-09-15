document.addEventListener("mouseup", function (event) {
    if (event.button === 0) {
        const selectedText = window.getSelection().toString();
        if (selectedText.length > 0) {

          // sets a background color to the selected text using CSS
          const highlightedText = document.createElement("span");

          
          
          
          // commented out. The code below is an actual highlighting mechanism
          // not needed, but cool. uncomment if you want to take a look
          
          // highlights text to yellow that is selected and sent to example
          //highlightedText.style.backgroundColor = "yellow"; 
          //highlightedText.textContent = selectedText;
    
          // Replaces the selected text with the highlighted text
          //const range = window.getSelection().getRangeAt(0);
          //range.deleteContents();
          //range.insertNode(highlightedText);
        }
      }
    });
    
    
    
