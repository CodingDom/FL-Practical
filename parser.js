// Requiring node file system for reading the email file
const fs = require("fs");

// The relevant fields that will be gathered from the email
const relevantFields = ["From","Date","Subject","To"];

// Function to grab the body of the email, using an array
function extractMessage(dataArray) {
    // Gmail has boundaries within the raw text files that separates different sections of the email
    let boundary = false;
    // Array for holding each line of the message, in case of linebreaks
    let message = [];

    // Looping through the array of data
    for (let i = 0; i < dataArray.length; i++) {
        const curr = dataArray[i];
        const next = dataArray[i+1];

        if (!boundary && curr === "Content-Type" && next && next.indexOf("text/plain") !== -1) {
            boundary = dataArray[i-1]; // When the body of the email is located, set the boundary
        } else if (boundary && curr !== boundary) {
            message.push(dataArray[i]);  // If the body of the email was already located then add every array element to the message array
        } else if (boundary && curr === boundary) {
            break; // When the matching boundary is reached, end the loop
        }
    }

    // Removing the first element from the array since it's the content-type and is unnecessary 
    message.shift();
    // Converting the array into a string while adding in the linebreaks that may have been removed
    message = message.join("\r\n");

    return message;
}

// Function for extracting relevant information
function extractData(data) {
    // Regular expression used to divide the email into an easy to use array
    const reg = /[\r\n]+|: /;
    const dataArray = data.split(reg);

    // Object that will be used to store the email's information
    const importantInfo = {};

    // Checking for the relevant fields within the email
    relevantFields.forEach(function(field) {
        // Search array for field
        const index = dataArray.indexOf(field);
        if (index !== -1) {
            // Store information
            importantInfo[field] = dataArray[index+1];
        } else {
            // Notify about missing information
            console.log("Could not find " + field);
        }
    });

    // Grab the body of the email
    importantInfo.Message = extractMessage(dataArray);

    // Logging all of the information that was gathered
    console.log(JSON.stringify(importantInfo, null, 2));
    return importantInfo;
}

// Read the raw email file
fs.readFile("./raw-email.txt","utf-8",function(err,data) {
    if (err) throw err;

    // Attempt to extract the relevant information
    extractData(data);
});