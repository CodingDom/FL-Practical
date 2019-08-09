// Requiring node file system for reading the email file
const fs = require("fs");

// The relevant fields that will be gathered from the email
const relevantFields = ["From","Date","Subject","To"];

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