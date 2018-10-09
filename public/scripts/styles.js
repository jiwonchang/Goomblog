var currentDate = new Date;
var hour = currentDate.getHours();
var mins = currentDate.getMinutes();
var body = document.querySelector("body");
var nav = document.querySelector("#navbar");

// sets morning time colors
if ((hour >= 6 && mins >= 0) && (hour < 12 && mins < 60)) {
    body.style.backgroundColor = "#e1ffdb";
    nav.classList.remove("yellow");
    nav.classList.remove("orange");
    nav.classList.remove("violet");
    nav.classList.add("green");
} else if ((hour >= 12 && mins >= 0) && (hour < 17 && mins < 60)) {
    body.style.backgroundColor = "#fff9af";
    nav.classList.remove("green");
    nav.classList.remove("orange");
    nav.classList.remove("violet");
    nav.classList.add("yellow");
} else if ((hour >= 17 && mins >= 0) && (hour < 20 && mins < 60)) {
    body.style.backgroundColor = "#f9d4ae";
    nav.classList.remove("yellow");
    nav.classList.remove("green");
    nav.classList.remove("violet");
    nav.classList.add("orange");
} else if ((hour >= 20 && mins >= 0) || (hour < 6 && mins < 60)) {
    body.style.backgroundColor = "#c8afff";
    // body.style.color = "white";
    nav.classList.remove("yellow");
    nav.classList.remove("orange");
    nav.classList.remove("green");
    nav.classList.add("violet");
}
