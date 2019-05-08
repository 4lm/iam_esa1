"use strict";
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
    const litemplate = document.querySelector("main ul template");

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
            title: "M " + Date.now(),
            src: "https://placeimg.com/150/150"
        });
    }

    function addLiElementToList(obj) {
        const li = document.importNode(litemplate.content, true);
        li.querySelector("img").src = obj.src;
        li.querySelector("h2").textContent = obj.title;
        ul.appendChild(li);
    }

    xhr("GET", "data/listitems.json", null, (xhrobj) => {
        const items = JSON.parse(xhrobj.responseText);
        items.forEach(e => {
            addLiElementToList(e);
        });
    });
}

window.onload = initialiseView;