chrome.runtime.onInstalled.addListener(function ()  {
    chrome.contextMenus.create({
        id: "sendToExample.com",
        title: "Send to example.com",
        contexts: ["selection"]
    });

});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "sendToExample.com") {
        const snippet = info.selectionText;
        sendToApi(snippet)
    }
});

function sendToApi(snippet) {

    const apiURL = 'https://www.example.com/'

    // header and body should be sent as .JSON file

    const headers = {
      'Content-Type': 'application/json',     // sends header
    };

    const body = JSON.stringify({ snippet }); // sends snippet as JSON

    // fetch request
    fetch(apiURL, {
        method: 'POST', // sends data to host
        headers,
        body,
    })
        // check if response was made
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request to send failed: ${response.status}');
            }
            return response.json();
        })

        .then((data) => {
            // handle API response - in this case we do not
            console.log('API response', data);
        })

        .catch((error) => {
            // JSON parsing errors here.
            if (error instanceof SyntaxError && error.name === 'SyntaxError') {
                console.error('JSON Parsing Error:', error);
                alert('Error: Unable to process the API response.');
            } 
            // specific HTTP status codes here.
            else if (error instanceof Response) {
                console.error('API Error - Status Code:', error.status);
                if (error.status === 404) {
                    // Display a 404 error 
                    alert('Error 404: Resource not found.');
                  } else if (error.status === 500) {
                    // Display a 500 error 
                    alert('Error 500: Internal Server Error.');
                  } else {
                    // Display generic error message
                    alert('Error: An error occurred while processing your request.');
                  }
            } 
            // network error here
            else if (error instanceof TypeError && error.message === 'Failed to fetch') {
                console.error('Network Error:', error);
                alert('Network Error: Unable to connect to the server. Please check your network connection.');
            }
            // other error
            else {
                console.error('Error:', error);
                alert('Error: An unexpected error occurred. Please try again later.');
            }
        });
}