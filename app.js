const name = document.getElementsByClassName("hidden-xs");

if(name) {
    name[0].innerHTML = "Вася Петькин";
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
        return 0;
    }).forEach(function (node) {
        parent.appendChild(node);
    })
}