const name = document.getElementsByClassName("hidden-xs");

if(name) {
    alert(name.length);
    name[0].innerHTML = "Андрей Кондрашкин";
}