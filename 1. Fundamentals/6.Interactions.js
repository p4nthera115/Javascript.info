const header = document.querySelector("h1");
header.innerText = "Interaction: alert, prompt, confirm";

// Alert
// shows a message and waits for user to click 'OK'
/* 
    alert("Oh My Glob")
*/

// Prompt
// shows modal with a message, input field for visitor and OK/Cancel buttons
// accepts two arguments: title (text to show visitor), default (optional, sets initial value for input field)
/* 
    prompt("title", "default")
*/

// prompt returns text from input field or null if input is cancelled (using Esc)
// always have an empty "default" for Internet Explorer

// Confirm
// shows modal with question and OK/Cancel buttons
// result is "true" if OK, result is "false" if Cancel
/*
    confirm("question")
*/
