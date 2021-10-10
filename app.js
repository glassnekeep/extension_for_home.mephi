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