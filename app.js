const name = document.getElementsByClassName("hidden-xs");

if(name) {
    name[0].innerHTML = "Вася Петькин";
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
    document.head.innerHTML += "<style>//* Dropdown Button */\n" +
        "span {\n" +
        "    background-color: #4CAF50;\n" +
        "    color: white;\n" +
        "    margin-top: 32px;\n" +
        "    padding: 16px;\n" +
        "    font-size: 16px;\n" +
        "    border: none;\n" +
        "}\n" +
        "\n" +
        "/* The container <div> - needed to position the dropdown content */\n" +
        ".dropdown {\n" +
        "    position: relative;\n" +
        "    display: inline-block;\n" +
        "    transition : 1s;\n" +
        "}\n" +
        ".dropdown:hover {\n" +
        "    min-height: 60px;\n" +
        "    transition : 1s;\n" +
        "}\n" +
        "\n" +
        "/* Dropdown Content (Hidden by Default) */\n" +
        ".dropdown-content {\n" +
        "    display: none;\n" +
        "    position: relative;\n" +
        "    background-color: #f1f1f1;\n" +
        "    min-width: 10px;\n" +
        "    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n" +
        "    z-index: 1;\n" +
        "}\n" +
        "\n" +
        "/* Links inside the dropdown */\n" +
        ".dropdown-content a {\n" +
        "    color: black;\n" +
        /*"    padding: 12px 16px;\n" +*/
        "    text-decoration: none;\n" +
        "    display: block;\n" +
        "}\n" +
        "\n" +
        "/* Change color of dropdown links on hover */\n" +
        ".dropdown-content a:hover {background-color: #5fc663;}\n" +
        "\n" +
        "/* Show the dropdown menu on hover */\n" +
        ".dropdown:hover .dropdown-content {display: block; position: fixed}\n" +
        "\n" +
        "/* Change the background color of the dropdown button when the dropdown content is shown */\n" +
        ".dropdown:hover .dropbtn {background-color: #3e8e41;}" +
        /*".list-group-item {min-height: 100px}" +*/
        "#write-letter-to-tutor {font-size: 16px; color: #f1f1f1}</style>"
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