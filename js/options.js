// Functionality for the save button
// sets the websites and the popup preference from the options page
document.getElementById('save').addEventListener('click', save);
function save() {
    var sitesToSave = document.getElementById('sites').value;
    var displayPopup = document.getElementById('popup').checked;
    chrome.storage.sync.set({
        sites: sitesToSave,
        popup: displayPopup
    }, displaySavedMessage);
}

// Message displayed when the preferences have been saved
function displaySavedMessage() {
    var status = document.getElementById('status');
    status.textContent = 'Sites saved.';
    // Disappear after 2 seconds
    setTimeout(function() {
        status.textContent = '';
    }, 2000);
}

// Loads any previously saved data and displays it
document.addEventListener('DOMContentLoaded', load);
function load() {
    chrome.storage.sync.get({
        sites: 'chadchibllbro.com',
        popup: false
    }, function(items) {
        document.getElementById('sites').value = items.sites;
        document.getElementById('popup').checked = items.popup;
    });
}

