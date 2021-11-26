let lectureFilterFunctionalitySwitcher = document.querySelector("#lecture-filter-functionality-enabled");
let groupMatesTableFunctionalitySwitcher = document.querySelector("#group-mates-table-functionality-enabled");
let sendEmailDirectlyToTutorFunctionalitySwitcher = document.querySelector("#send-email-directly-to-tutor-functionality-enabled");

let switchElement = "<div class=\"mainSwitchDiv\">\n" +
    "    <div class=\"switchDiv\">\n" +
    "        <label class=\"switch\">\n" +
    "            <input type=\"checkbox\" id=\"send-email-directly-to-tutor-functionality-enabled\">\n" +
    "            <span class=\"slider round\"></span>\n" +
    "        </label>\n" +
    "        <p class=\"nameOfFunction\">\n" +
    "            Сообщение преподавателю\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"switchDiv\">\n" +
    "        <label class=\"switch\">\n" +
    "            <input type=\"checkbox\" id=\"lecture-filter-functionality-enabled\" >\n" +
    "            <span class=\"slider round\"></span>\n" +
    "        </label>\n" +
    "        <p class=\"nameOfFunction\">\n" +
    "            Фильтр лекций\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"switchDiv\">\n" +
    "        <label class=\"switch\">\n" +
    "            <input type=\"checkbox\" id=\"group-mates-table-functionality-enabled\" >\n" +
    "            <span class=\"slider round\"></span>\n" +
    "        </label>\n" +
    "        <p class=\"nameOfFunction\">\n" +
    "            Таблица одногруппников\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"

let loadingElement = "<div  id=\"loadingMessage\" style=\"margin: auto; font-size: 30px\">\n" +
    "    Загрузка данных...\n" +
    "</div>"

var port = chrome.extension.connect({
    name: "Sample Communication"
});

port.postMessage({name: "Send flags"});
port.onMessage.addListener(function(message) {
    console.log("message received " + message);
    let name = message.name;
    switch(name) {
        case "flags":
            let letter = message.flags.letter;
            let lecture = message.flags.lecture;
            let groupTable = message.flags.groupTable;
            console.log("received flags from background script letter = " + letter + " lecture = " + lecture + " groupTable = " + groupTable);
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
            if(groupTable) {
                if(!groupMatesTableFunctionalitySwitcher.hasAttribute("checked")) {groupMatesTableFunctionalitySwitcher.setAttribute("checked", "")}
            } else {
                if(groupMatesTableFunctionalitySwitcher.hasAttribute("checked")) {groupMatesTableFunctionalitySwitcher.removeAttribute("checked")}
            }
            break;
        case "show loading":
            let switchDiv = document.querySelector(".mainSwitchDiv");
            if (switchDiv) {
                switchDiv.remove();
            }
            let loading1 = document.querySelector("#loadingMessage");
            if (!loading1) {
                document.body.innerHTML += loadingElement;
            }
            break;
        case "show switch":
            let loading = document.querySelector("#loadingMessage");
            if (loading) {
                loading.remove();
            }
            let switch1 = document.querySelector(".mainSwitchDiv");
            if (!switch1) {
                document.body.innerHTML += switchElement;
            }
            break;
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
    port.postMessage({name: "change groupTable status", status: status});
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