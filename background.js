var writeLetterButtonFunctionalityEnabledFlag = true;
var lectureFilterFunctionalityFlag = true;
var groupMatesTableFunctionalityFlag = true;
var flagObject = {
    letter: writeLetterButtonFunctionalityEnabledFlag,
    lecture: lectureFilterFunctionalityFlag,
    groupTable: groupMatesTableFunctionalityFlag
}

let loadingStatus = false;

function updateObjectFromSyncStorage() {
    try {
        chrome.storage.local.get(['flags'], function(result) {
            console.log(result.flags);
            if (result.flags != null) {
                flagObject.letter = result.flags.letter;
                flagObject.lecture = result.flags.lecture;
                flagObject.groupTable = result.flags.groupTable;
            } else {
                chrome.storage.local.set({"flags": flagObject}, function() {
                    console.log("flags are set");
                })
            }
        })
    } catch (e) {
        console.log("error = " + e);
        chrome.storage.local.set({"flags": flagObject}, function() {
            console.log("flags are set");
        })
    }
}

updateObjectFromSyncStorage()


/*function loadingContent(status) {
    if (status) {
        port.postMessage({name: "show switch"});
    } else {
        port.postMessage({name: "show loading"});
    }
}*/

/*chrome.storage.local.get(['flags'], function(result) {
    console.log(result.flags);
    /*if(result.flags == null) {
        chrome.storage.local.set({flags: flagObject}, function () {
            console.log("There was no data in chrome storage, so was set letter = " + flagObject.letter + " lecture = " +  flagObject.lecture + " groupTable = " + flagObject.groupTable);
        });
    }*/
/*})*/

chrome.storage.onChanged.addListener(function (changes) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {name: "flags", flags: flagObject}, function(response) {
            console.log("sending response to content script, response = " + response);
        });
    });
})

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected to port");
    port.onMessage.addListener(function(message) {
        console.log("message received " + message.name);
        let name = message.name;
        console.log(name);
        switch(name) {
            case "Send loading status":
                console.log("sent loading status = " + loadingStatus);
                if (loadingStatus) {
                    port.postMessage({name: "show loading"});
                } else {
                    port.postMessage({name: "show switch"});
                }
                break;
            case "Send flags":
                updateObjectFromSyncStorage();
                console.log("sending flagObject = " + flagObject);
                port.postMessage({name: "flags", flags: flagObject});
                break;
            case "change letter status":
                let newLetterStatus = message.status;
                flagObject.letter = newLetterStatus;
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("Letter status changed to " + flagObject.letter + " , lecture = " + flagObject.lecture + " , groupTable = " + flagObject.groupTable);
                });
                break;
            case "change lecture status":
                let newLectureStatus = message.status;
                flagObject.lecture = newLectureStatus;
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("Lecture status changed to " + flagObject.lecture + " , letter = " + flagObject.letter + " , groupTable = " + flagObject.groupTable);
                });
                break;
            case "change groupTable status":
                let newGroupStatus = message.status;
                flagObject.groupTable = newGroupStatus
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("groupTable status changed to " + flagObject.groupTable + " , letter = " + flagObject.letter + " , lecture = " + flagObject.lecture);
                });
                break;
        }
    });
})

chrome.runtime.onMessage.addListener(
    function(request) {
        switch(request.message) {
            case "send flags":
                updateObjectFromSyncStorage();
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {name: "flags", flags: flagObject}, function(response) {
                        console.log("sending response to content script, response = " + response);
                    });
                });
                break;
            case "loading data started":
                loadingStatus = true;
                //port.postMessage({name: "show loading"});
                console.log("message about data refreshing received");
                break;
            case "loading data ended":
                loadingStatus = false;
                //port.postMessage({name: "show switch"});
                console.log("message about data refreshing being finished received");
                break;
        }
    }
);