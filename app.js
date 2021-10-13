const name = document.getElementsByClassName("hidden-xs");

if(name) {
    name[0].innerHTML = "Вася Петькин";
}

function getGroupMembersDOM() {
    let buttonGroup = document.querySelector(".btn-group");
    let groupTimetableUrl = buttonGroup.querySelector("a").getAttribute("href");
    groupTimetableUrl = groupTimetableUrl.replace("schedule", "");
    fetch(groupTimetableUrl)
        .then(res => res.text())
        .then((responseText) => {
            let doc = new DOMParser().parseFromString(responseText, 'text/html');
            let memberList = doc.querySelectorAll(".list-group-item");
            let tableDiv = document.createElement("div");
            let table = document.createElement("table");
            for(let i = 0; i < memberList.length; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "table-raw-group-member");
                tr.textContent = memberList[i].textContent;
                table.append(tr);
            }
            let mainContainer = document.querySelector(".row");
            tableDiv.append(table);
            mainContainer.append(tableDiv);
        })
}

function parseToRFC2822(x) {
    let str = x.substring(4, x.length);
    console.log(str);
    a = str.split(" ")[1];
    console.log(a);
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

if(document.location.toString().indexOf("home.mephi.ru/lesson_videos/") > 0) {
    let nodeList = document.querySelectorAll(".list-group-item");
    let itemsArray = [];
    let parent = nodeList[0].parentNode;
    for(let i = 0; i < nodeList.length; i++) {
        itemsArray.push(parent.removeChild(nodeList[i]));
    }
    itemsArray.sort(function (nodeA, nodeB) {
        let textA = nodeA.querySelector("span").textContent.split("\n")[2];
        let textB = nodeB.querySelector("span").textContent.split("\n")[2];
        if(textA === "") {
            return 1;
        }
        if(textB === "") {
            return -1;
        }
        if(textA > textB) return 1;
        if(textA < textB) return -1;
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

if(document.location.toString().indexOf("home.mephi.ru/users/") > 0) {
    getGroupMembersDOM();

    let tutorList = document.querySelectorAll("span.text-nowrap");
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
                        tutorList[i].outerHTML = "<div class=\"dropdown\">\n" + tutorList[i].outerHTML +
                            "        <div class=\"dropdown-content\">\n" +
                            "           <a class=\"btn btn-primary wrap\" id=\"write-letter-to-tutor\" href=" + writeLetterUrl + "><i class=\"fa fa-envelope\"></i>\n" +
                            "                Написать" +
                            "            </a>" +
                            "        </div>"
                })
            })
    }


}