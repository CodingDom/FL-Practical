# FL-Practical

## Challenge 
**Parsing an Email (Javascript)**

For this challenge I created a command line application to parse emails. It uses Node.js File System to retrieve the contents of the raw email text file locally. Therefore, in order to run this application Node.js would have to be installed on the system attempting to run it.

**Future Implementations**

- Create a way to differentiate between forwarded and non-forwarded messages.
- Since I used the split function on colons, if an email contains a colon in the body or subject, it may cause a loss of content. I would figure out a better way to handle this scenario.
- If there were attachments sent, I could probably make a way for that to be known by the application. Maybe by showing a number representing the amount of files included within the email.

## Installation
*Must have Node installed*
1. Download or clone the repository
2. Open the folder within a command terminal
3. Run the ***parser.js*** file with ***node***
```
node parser.js
```

## Preview

![Imgur](https://imgur.com/xyNrvdH.png)