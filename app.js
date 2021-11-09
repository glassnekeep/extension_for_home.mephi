let writeLetterButtonFunctionalityEnabledFlag;
let lectureFilterFunctionalityFlag;
let groupMatesTableFunctionalityFlag;

async function getGroupMembersDOM() {
    let buttonGroup = document.querySelector(".btn-group");
    let groupTimetableUrl = buttonGroup.querySelector("a").getAttribute("href");
    groupTimetableUrl = groupTimetableUrl.replace("schedule", "");
    fetch(groupTimetableUrl)
        .then(res => res.text())
        .then(/*async*/ (responseText) => {
            let doc = new DOMParser().parseFromString(responseText, 'text/html');
            let memberList = doc.querySelectorAll(".list-group-item");
            let tableDiv = document.createElement("div");
            let tableTable = document.createElement("table");
            tableDiv.setAttribute("id", "main-table");
            let table = document.createElement("tr");
            tableTable.append(table);
            let tabled = document.createElement("td");
            let td = document.createElement("table");
            tabled.append(td);
            for(let i = 0; i < memberList.length; i++) {
                if(i !== 0 && i % 10 === 0) {
                    tabled = document.createElement("td");
                    td = document.createElement("table");
                    tabled.append(td);
                    console.log("if worked");
                }
                let currentMember = memberList[i];
                currentMember.setAttribute("class", "group-member")
                let currentGroupMemberPage = currentMember.querySelector("a").getAttribute("href");
                let tr = document.createElement("tr");
                let trd = document.createElement("td");
                tr.append(trd);
                tr.setAttribute("class", "table-raw-group-member");
                td.append(tr);
                /*await*/ fetch(currentGroupMemberPage)
                    .then(result => result.text())
                    .then((respondText) => {
                        let docParsed = new DOMParser().parseFromString(respondText, 'text/html');
                        let listOfContactsRElement = docParsed.querySelector(".list-inline");
                        if(listOfContactsRElement != null) {
                            let listOfContacts = listOfContactsRElement.querySelectorAll("a");
                            listOfContacts.forEach(function(contact) {
                                contact.setAttribute("class", "group-member-contact");
                                let groupMemberLink = currentMember.querySelector("a");
                                groupMemberLink.after(contact);
                            })
                        }
                        //trd.append(currentMember);
                        //currentMember.append(listOfContacts);
                    })
                trd.append(currentMember);
                //tr.textContent = memberList[i].textContent;
                table.append(tabled);
            }
            let mainContainer = document.querySelector(".row");
            tableDiv.append(table);
            mainContainer.append(tableDiv);
        })
}

function parseToRFC2822(x) {
    let str = x.substring(4, x.length);
    let a = str.split(" ")[1];
    switch (a) {
        case "января":
            str = str.replace("января", "January");
            break;
        case "февраля":
            str = str.replace("февраля", "February");
            break;
        case "марта":
            str = str.replace("марта", "March");
            break;
        case "апреля":
            str = str.replace("апреля", "April");
            break;
        case "мая":
            str = str.replace("мая", "May");
            break;
        case "июня":
            str.replace("июня", "June");
            break;
        case "июля":
            str = str.replace("июля", "July");
            break;
        case "августа":
            str = str.replace("августа", "August");
            break;
        case "сентября":
            str = str.replace("сентября", "September");
            break;
        case "октября":
            str = str.replace("октября", "October");
            break;
        case "ноября":
            str = str.replace("ноября", "November");
            break;
        case "декабря":
            str = str.replace("декабря", "December");
            break;
    }
    str = str.split("—")[0];
    return str;
}

function parseToParsableDate(x) {
    let str = x.substring(4, x.length);
    let a = str.split(" ")[1];
    switch (a) {
        case "января":
            str = str.replace("января", "January");
            break;
        case "февраля":
            str = str.replace("февраля", "February");
            break;
        case "марта":
            str = str.replace("марта", "March");
            break;
        case "апреля":
            str = str.replace("апреля", "April");
            break;
        case "мая":
            str = str.replace("мая", "May");
            break;
        case "июня":
            str.replace("июня", "June");
            break;
        case "июля":
            str = str.replace("июля", "July");
            break;
        case "августа":
            str = str.replace("августа", "August");
            break;
        case "сентября":
            str = str.replace("сентября", "September");
            break;
        case "октября":
            str = str.replace("октября", "October");
            break;
        case "ноября":
            str = str.replace("ноября", "November");
            break;
        case "декабря":
            str = str.replace("декабря", "December");
            break;
    }
    str = str.split(":")[0];
    str = str.substring(0, str.length - 3);
    return str;
}

async function getFullLNodeList(nodeListList) {
    let nodeList = Array.from(nodeListList);
    let numberOfPages = document.querySelector(".pagination").querySelectorAll(".page");
    if(numberOfPages.length === 1) {return nodeList;}
    let linksArray = [];
    for(let i = 1; i < numberOfPages.length; i++) {
        let link = numberOfPages[i].querySelector("a").getAttribute("href");
        linksArray.push(link);
    }
    for(let i = 0; i < linksArray.length; i++) {
        await fetch(linksArray[i])
            .then(res => res.text())
            .then((responseText) => {
                let doc = new DOMParser().parseFromString(responseText, 'text/html');
                let localNodeList = doc.querySelectorAll(".list-group-item");
                localNodeList.forEach(function(node) {
                    nodeList.push(node);
                })
            })
    }
    console.log(nodeList.length);
    return nodeList;
}

function filterBySubjectAndDate(element, datePicker, parent, setOfSubjects, baseNodeList) {
    let chosenSubjectText = element.value.toString();
    let itemsArray = [];
    let nodeList = document.querySelectorAll(".list-group-item");
    for(let i = 0; i < baseNodeList.length; i++) {
        let currentNode = baseNodeList[i];
        let subjectOfCurrentNode = currentNode.querySelector("span").textContent.split("\n")[2].trim();
        if(datePicker.value !== "") {
            let stringCurrentNodeDate = currentNode.querySelector("h4").textContent.split("\n")[2].trim();
            let currentNodeDate = new Date();
            currentNodeDate.setTime(Date.parse(parseToParsableDate(stringCurrentNodeDate)));
            let chosenDateString = datePicker.value.toString();
            let chosenDate = new Date();
            chosenDate.setTime(Date.parse(chosenDateString));
            currentNodeDate = currentNodeDate.toLocaleDateString();
            chosenDate = chosenDate.toLocaleDateString();
            if(!(chosenDate > currentNodeDate || chosenDate < currentNodeDate)) {
                if(chosenSubjectText === "Предмет не выбран") {
                    itemsArray.push(currentNode);
                } else {
                    if(subjectOfCurrentNode === chosenSubjectText) {
                        itemsArray.push(currentNode);
                    }
                }
            }
        } else {
            if(chosenSubjectText === "Предмет не выбран") {
                itemsArray.push(currentNode);
            } else {
                if(subjectOfCurrentNode === chosenSubjectText) {
                    itemsArray.push(currentNode);
                }
            }
        }
    }
    nodeList.forEach(function(node) {
        parent.removeChild(node);
    })
    itemsArray.sort(function (nodeA, nodeB) {
        let stringDateA = nodeA.querySelector("h4").innerText.split("\n")[2].trim();
        let stringDateB = nodeB.querySelector("h4").innerText.split("\n")[2].trim();
        let dateA = new Date();
        let dateB = new Date();
        dateA.setTime(Date.parse(parseToRFC2822(stringDateA)));
        dateB.setTime(Date.parse(parseToRFC2822(stringDateB)));
        if(dateA > dateB) return -1;
        if(dateA < dateB) return 1;
        return 0;
    }).forEach(function (node) {
        parent.appendChild(node);
    })
}

async function lessonVideosMainFunction() {
    let element = document.createElement("select");
    element.setAttribute("name", "selectSubject");
    element.setAttribute("id", "selector");
    let datePicker = document.createElement("input");
    datePicker.setAttribute("type", "date");
    datePicker.setAttribute("id", "datePicker");
    datePicker.setAttribute("name", "lectureDatePicker");
    let clearButton = document.createElement("button");
    clearButton.textContent = "Очистить";
    clearButton.setAttribute("id", "clearTheFilter");
    let div = document.querySelector(".pagination");
    let setOfSubjects = new Set();
    let baseNodeList = document.querySelectorAll(".list-group-item");
    let parent = baseNodeList[0].parentNode;
    let fullNodeList = [];
    await getFullLNodeList(baseNodeList).then(array => {
        console.log(array.length);
        array.forEach(function(node) {
            fullNodeList.push(node);
        })
    });
    console.log(fullNodeList.length + "   fullNodeList.length");
    baseNodeList.forEach(function(node) {
        let subject = node.querySelector("span").textContent.split("\n")[2];
        setOfSubjects.add(subject);
    })
    div.after(element);
    element.after(datePicker);
    datePicker.after(clearButton);
    setOfSubjects.delete("");
    let disabledOption = document.createElement("option");
    disabledOption.setAttribute("selected", "selected");
    disabledOption.textContent = "Предмет не выбран";
    element.append(disabledOption);
    setOfSubjects.forEach(function(elem) {
        let option = document.createElement("option");
        option.textContent = elem;
        element.append(option);
    })
    element.onchange = function() {
        filterBySubjectAndDate(element, datePicker, parent, setOfSubjects, baseNodeList);
    }
    datePicker.onchange = function() {
        filterBySubjectAndDate(element, datePicker, parent, setOfSubjects, baseNodeList);
    }
    clearButton.onclick = function() {
        element.value = "Предмет не выбран";
        datePicker.value = "";
        filterBySubjectAndDate(element, datePicker, parent, setOfSubjects, baseNodeList);
    }
    return 0;
}

async function createSendLetterToTutorElements() {
    let tutorList = document.querySelectorAll("span.text-nowrap");
    let tutorHrefList = new Array(tutorList.length);
    for(let i = 0; i < tutorList.length; i++) {
        let tutorTimetableHref = tutorList[i].querySelector("a").getAttribute("href");
        let writeLetterUrl = "";
        fetch(/*'https://home.mephi.ru' + */tutorTimetableHref)
            .then(res => res.text())
            .then((responseText) => {
                const doc = new DOMParser().parseFromString(responseText, 'text/html');
                const tutorPersonalPageUrl = doc.querySelector('h1').querySelector("a").getAttribute("href");
                fetch(tutorPersonalPageUrl)
                    .then(result => result.text())
                    .then((respondText) => {
                        const docPersonal = new DOMParser().parseFromString(respondText, "text/html");
                        writeLetterUrl = docPersonal.querySelector(".btn-primary").getAttribute("href");
                        /*tutorList[i].outerHTML = "<div class=\"dropdown-letter\">\n" + tutorList[i].outerHTML +
                            "        <div class=\"dropdown-content\">\n" +
                            "           <a class=\"btn btn-primary wrap\" id=\"write-letter-to-tutor\" href=" + writeLetterUrl + "><i class=\"fa fa-envelope\"></i>\n" +
                            "                Написать" +
                            "            </a>" +
                            "        </div>"*/
                        tutorHrefList[i] = writeLetterUrl;
                    })
            })
    }
    return tutorHrefList;
}

/*if(document.location.toString().indexOf("home.mephi.ru/lesson_videos/") > 0) {
    lessonVideosMainFunction().then(res => {
        console.log(res + "   res")
    });
}*/

/*if(document.location.toString().indexOf("home.mephi.ru/users/") > 0) {
    getGroupMembersDOM().then(res => console.log(res));
    createSendLetterToTutorElements()
}*/

let tutorUrlList;
createSendLetterToTutorElements().then((res) => {
    tutorUrlList = res;
    chrome.runtime.sendMessage({message: "send flags"}, function(response) {
        console.log("sent flag request, response = " + response);
    });
})

function initFunctionality() {
    if(document.location.toString().indexOf("home.mephi.ru/lesson_videos/") > 0) {
        if(lectureFilterFunctionalityFlag) {
            console.log("Lecture filter status is true");
            lessonVideosMainFunction().then(res => {console.log(res + "   res")});
        } else {
            try {
                document.getElementById("selector").remove();
                document.getElementById("datePicker").remove();
                document.getElementById("clearTheFilter").remove();
            } catch (e) {
                console.log("error = " + e);
            }
        }
    }
    if(document.location.toString().indexOf("home.mephi.ru/users/") > 0) {
        let letterArray = document.querySelectorAll(".dropdown-letter");
        console.log("letterArray.length = " + letterArray.length);
        let mainTable = document.querySelector("#main-table");
        if(writeLetterButtonFunctionalityEnabledFlag) {
            if(letterArray.length === 0) {
                console.log("letterArray.length = " + letterArray.length);
                let tutorList = document.querySelectorAll("span.text-nowrap");
                for(let i = 0; i < tutorList.length; i++) {
                    tutorList[i].outerHTML = "<div class=\"dropdown-letter\">\n" + tutorList[i].outerHTML +
                        "        <div class=\"dropdown-content\">\n" +
                        "           <a class=\"btn btn-primary wrap\" id=\"write-letter-to-tutor\" href=" + tutorUrlList[i] + "><i class=\"fa fa-envelope\"></i>\n" +
                        "                Написать" +
                        "            </a>" +
                        "        </div>"
                }
            } else {
                console.log("letterArray.length = " + letterArray.length);
            }
        } else {
            try {
                letterArray.forEach(function(node) {
                    node.outerHTML = node.firstElementChild.outerHTML;
                })
            } catch (e) {
                console.log("error = " + e);
            }
        }
        if(groupMatesTableFunctionalityFlag) {
            if(mainTable == null) {
                getGroupMembersDOM().then(res => console.log(res + "    res"));
            }
            console.log("groupTable status is true");
        } else {
            try {
                document.getElementById("main-table").remove();
                console.log("groupTable status is false");
            } catch (e) {
                console.log("error = " + e);
            }
        }
    }
}

chrome.runtime.onMessage.addListener(function(request) {
    //console.log("received message from background script, letter = " + request.flags.letter + " lecture =  " + request.flags.lecture + " groupTable = " + request.flags.groupTable);
    if (request.name === "flags") {
        writeLetterButtonFunctionalityEnabledFlag = request.flags.letter;
        lectureFilterFunctionalityFlag = request.flags.lecture;
        groupMatesTableFunctionalityFlag = request.flags.groupTable;
    }
    initFunctionality();
})