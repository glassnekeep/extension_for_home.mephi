let lectureFilterFunctionalitySwitcher = document.querySelector("#lecture-filter-functionality-enabled");
let groupMatesTableFunctionalitySwitcher = document.querySelector("#group-mates-table-functionality-enabled");
let sendEmailDirectlyToTutorFunctionalitySwitcher = document.querySelector("#send-email-directly-to-tutor-functionality-enabled");

var port = chrome.extension.connect({
    name: "Sample Communication"
});
port.postMessage({name: "Send flags"});
port.onMessage.addListener(function(message) {
    console.log("message recieved" + message);
    let name = message.name;
    switch(name) {
        case "flags":
            let letter = message.flags.letter;
            let lecture = message.flags.lecture;
            let group = message.flags.group;
            console.log(letter + " " + lecture + " " + group);
            if(letter) {
                if(!sendEmailDirectlyToTutorFunctionalitySwitcher.hasAttribute("checked")) {sendEmailDirectlyToTutorFunctionalitySwitcher.setAttribute("checked", "")}
            } else {
                if(sendEmailDirectlyToTutorFunctionalitySwitcher.hasAttribute("checked")) {sendEmailDirectlyToTutorFunctionalitySwitcher.removeAttribute("checked")}
            }
            if(lecture) {
                if(!lectureFilterFunctionalitySwitcher.hasAttribute("checked")) {lectureFilterFunctionalitySwitcher.setAttribute("checked", "")}
            } else {
                if(lectureFilterFunctionalitySwitcher.hasAttribute("checked")) {lectureFilterFunctionalitySwitcher.removeAttribute("checked")}
            }
            if(group) {
                if(!groupMatesTableFunctionalitySwitcher.hasAttribute("checked")) {groupMatesTableFunctionalitySwitcher.setAttribute("checked", "")}
            } else {
                if(groupMatesTableFunctionalitySwitcher.hasAttribute("checked")) {groupMatesTableFunctionalitySwitcher.removeAttribute("checked")}
            }
    }
});

function sendEmailDirectlyToTutorSwitchStatus(status) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update write email to tutor functionality status", functionalityStatus: status});
    })
    port.postMessage({name: "change letter status", status: status});
}

function sendLectureSwitchStatus(status) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update lecture functionality status", functionalityStatus: status});
    })
    port.postMessage({name: "change lecture status", status: status});
}

function sendGroupMatesTableSwitchStatus(status) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update group mates table functionality status", functionalityStatus: status});
    })
    port.postMessage({name: "change group status", status: status});
}

sendEmailDirectlyToTutorFunctionalitySwitcher.onclick = function() {
    let status = sendEmailDirectlyToTutorFunctionalitySwitcher.checked;
    sendEmailDirectlyToTutorSwitchStatus(status);
}

lectureFilterFunctionalitySwitcher.onclick = function() {
    let status = lectureFilterFunctionalitySwitcher.checked;
    sendLectureSwitchStatus(status);
}

groupMatesTableFunctionalitySwitcher.onclick = function() {
    let status = groupMatesTableFunctionalitySwitcher.checked;
    sendGroupMatesTableSwitchStatus(status);
}