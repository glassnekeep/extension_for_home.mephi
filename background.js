var writeLetterButtonFunctionalityEnabledFlag = true;
var lectureFilterFunctionalityFlag = true;
var groupMatesTableFunctionalityFlag = true;
var flagObject = {
    letter: writeLetterButtonFunctionalityEnabledFlag,
    lecture: lectureFilterFunctionalityFlag,
    groupTable: groupMatesTableFunctionalityFlag
}

function updateObjectFromLocalStorage() {
    chrome.storage.local.get(['flags'], function(result) {
        console.log(result.flags);
        flagObject.letter = result.flags.letter;
        flagObject.lecture = result.flags.lecture;
        flagObject.groupTable = result.flags.groupTable;
    })
}

chrome.storage.local.get(['flags'], function(result) {
    console.log(result.flags);
    if(result.flags == null) {
        chrome.storage.local.set({flags: flagObject}, function () {
            console.log("Value is set to " + flagObject.letter + " " +  flagObject.lecture + " " + flagObject.groupTable);
        });
    }
})

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected to port");
    port.onMessage.addListener(function(message) {
        console.log("message received " + message.name);
        let name = message.name;
        switch(name) {
            case "Send flags":
                updateObjectFromLocalStorage();
                console.log(flagObject);
                port.postMessage({name: "flags", flags: flagObject});
                break;
            case "change letter status":
                let newLetterStatus = message.status;
                flagObject.letter = newLetterStatus;
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("Value is set " + flagObject.letter + " " + flagObject.lecture + " " + flagObject.groupTable);
                });
                break;
            case "change lecture status":
                let newLectureStatus = message.status;
                flagObject.lecture = newLectureStatus;
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("Value is set " + flagObject.letter + " " + flagObject.lecture + " " + flagObject.groupTable);
                });
                break;
            case "change group status":
                let newGroupStatus = message.status;
                flagObject.groupTable = newGroupStatus
                chrome.storage.local.set({"flags": flagObject}, function () {
                    console.log("Value is set " + flagObject.letter + " " + flagObject.lecture + " " + flagObject.groupTable);
                });
                break;
        }
    });
})
chrome.extension.onConnect.addListener(function(port1) {
    console.log("Connected to port 1");
    chrome.storage.onChanged.addListener(function (changes) {
        updateObjectFromLocalStorage();
        console.log(flagObject);
        port1.postMessage({name: "flags", flags: flagObject});
    })
    port1.onMessage.addListener(function(message) {
        console.log("message received " + message.name);
        let name = message.name;
        switch (name) {
            case "Send flags":
                updateObjectFromLocalStorage();
                console.log(flagObject.letter + " " + flagObject.lecture + " " + flagObject.groupTable + "" + "flagObject");
                port1.postMessage({name: "flags", flags: flagObject});
                break;
        }
    })
})
