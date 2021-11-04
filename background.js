var writeLetterButtonFunctionalityEnabledFlag = true;
var lectureFilterFunctionalityFlag = true;
var groupMatesTableFunctionalityFlag = true;
var flagObject = {
    letter: writeLetterButtonFunctionalityEnabledFlag,
    lecture: lectureFilterFunctionalityFlag,
    group: groupMatesTableFunctionalityFlag
}

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(message) {
        console.log("message received " + message.name);
        let name = message.name;
        switch(name) {
            case "Send flags":
                port.postMessage({name: "flags", flags: flagObject});
                break;
            case "change letter status":
                let newLetterStatus = message.status;
                writeLetterButtonFunctionalityEnabledFlag = newLetterStatus;
                flagObject = {
                    letter: writeLetterButtonFunctionalityEnabledFlag,
                    lecture: lectureFilterFunctionalityFlag,
                    group: groupMatesTableFunctionalityFlag
                }
                break;
            case "change lecture status":
                let newLectureStatus = message.status;
                lectureFilterFunctionalityFlag = newLectureStatus;
                flagObject = {
                    letter: writeLetterButtonFunctionalityEnabledFlag,
                    lecture: lectureFilterFunctionalityFlag,
                    group: groupMatesTableFunctionalityFlag
                }
                break;
            case "change group status":
                let newGroupStatus = message.status;
                lectureFilterFunctionalityFlag = newGroupStatus;
                flagObject = {
                    letter: writeLetterButtonFunctionalityEnabledFlag,
                    lecture: lectureFilterFunctionalityFlag,
                    group: groupMatesTableFunctionalityFlag
                }
                break;
        }
    });
})
console.log(lectureFilterFunctionalityFlag + " lecture status");