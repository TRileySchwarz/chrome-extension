// Trigger this event when the browser icon is pressed
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get({
        sites: 'chadchillbro.com',
        popup: false
    }, deleteBySites);
});

// After sites are loaded, this function is triggered and iterates over the list of websites
var numSites = 0;
function deleteBySites(storage) {
    var allSites = storage.sites.split("\n");
    numSites = allSites.length;
    for (var i = 0; i < allSites.length; i++) {
        deleteBySite(allSites[i], storage.popup);
    }
}

// For each website, go into history and delete entry if found
// if pop
function deleteBySite(site, popup) {
    // returns a list of search history
    chrome.history.search({
            text: site,
            startTime: 0,
            maxResults: 999999
        },
        // Once that list returns, use this callback to iterate over and trigger a delete event
        function(results) {
            var itemsDeleted = 0;
            for (itemsDeleted; itemsDeleted < results.length; itemsDeleted++) {
                chrome.history.deleteUrl({
                    url: results[itemsDeleted].url
                });
            }
            // Create a popup if this preference is used ie, if popup is set to true
            if (popup) {
                siteDeleted(site, itemsDeleted);
            }
        });
}

// Responsible for displaying the results of sites deleted, only called if popup is set to true
var sitesProcessed = 0;
var siteString = "Scrub complete:\n";
function siteDeleted(site, count) {
    sitesProcessed++;
    siteString += (count + "x " + site + "\n");
    if (sitesProcessed >= numSites) {
        alert(siteString);
        sitesProcessed = 0;
        siteString = "Scrub complete:\n";
    }
}

