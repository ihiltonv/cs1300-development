var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=8xMWweOxOqc-Rmn6mU8JV1xjCPVoOYf2Da2tDRr-TxY";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
    var x = new XMLHttpRequest();
    x.open("GET", corsApiUrl + options.url);
    x.send(options.data);
    return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
    new Promise((resolve, reject) => {
        const request = doCORSRequest({
            url: "https://trefle.io/api/v1/plants" + apiToken,
        });
        resolve(request);
    });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
    (request) =>
        (request.onload = request.onerror = function () {
            // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
            handleResponse(request.response)
        })
);

const handleResponse = (response) => {
    const respJSON = JSON.parse(response)
    const plantsArray = respJSON.data
    return plantsArray
}