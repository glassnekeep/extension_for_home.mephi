let lectureFilterFunctionalitySwitcher = document.querySelector("#lecture-filter-functionality-enabled");
let button = document.getElementById("button");
function sendLectureSwitchStatus(status) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "update lecture functionality status", functionalityStatus: status});
    })
}


lectureFilterFunctionalitySwitcher.onclick = function() {
    let status = lectureFilterFunctionalitySwitcher.checked;
    sendLectureSwitchStatus(status);
}