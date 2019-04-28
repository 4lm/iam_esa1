"use strict;"
/**
 * Created by master on 01.03.16.
 */
function initialiseView() {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button");
    const viewSwitch = header.querySelector(".list-button");
    let ul = main.getElementsByTagName("ul")[0];
    const add = header.querySelector(".add-button");

    // Switching views
    viewSwitch.onclick = () => {
        main.classList.add("faded");
        main.addEventListener("transitionend", onTransitionEndViewSwitch);
    }

    function onTransitionEndViewSwitch() {
        document.body.classList.toggle("tiles");
        main.classList.remove("faded");
        main.removeEventListener("transitionend", onTransitionEndViewSwitch);
    }

    // Refresh, fade in|out
    refresh.onclick = () => {
        main.classList.add("faded");
        main.addEventListener("transitionend", onTransitionEndRefresh);
    }

    function onTransitionEndRefresh() {
        main.classList.remove("faded");
        main.removeEventListener("transitionend", onTransitionEndRefresh);
    }

    // List item selection
    ul.onclick = (e) => {
        const li = getCurrentLi(e.target);
        console.log(e);
        if (e.target.classList.contains("option-button")) {
            alert(
                "Title: " + 
                getLiTitle(li) + 
                ", Image-URL: " + 
                e.path[3].childNodes[1].currentSrc);
        } else {
            alert("Title: " + getLiTitle(li));
        }

    }

    function getCurrentLi(el) {
        if (el.tagName === "LI") {
            return el;
        } else if (el.tagName === "UL") {
            alert("Reached list root, no LI found.");
        } else if (el.parentNode) {
            return getCurrentLi(el.parentNode);
        } else {
            alert("Something went completly wrong.");
        }
    }

    function getLiTitle(li) {
        return li.getElementsByTagName("h2")[0].textContent;
    }

    // Add new elements
    add.onclick = (e) => {
        e.stopPropagation();
        addLiElementToList({
            title: "New Element " + Date.now(),
            src: "https://placeimg.com/150/150"
        });
    }

    function addLiElementToList(obj) {
        console.log("add new element for: " + JSON.stringify(obj));

        ul.innerHTML = ul.innerHTML + "<li><img class=\"align-left\" src=\"" + obj.src + "\"><h2>" + obj.title + "</h2><button class=\"imgbutton align-right edit-button\"></button></li>\""
    }
}

window.onload = initialiseView;