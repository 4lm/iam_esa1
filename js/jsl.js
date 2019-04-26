"use strict;"
/**
 * Created by master on 01.03.16.
 */
function initialiseView() {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button");
    const ul = main.getElementsByTagName("ul")[0];
    const add = header.querySelector(".add-button");

    // Switching views
    header.onclick = () => {
        document.body.classList.toggle("tiles");
    }

    // Fade in|out
    refresh.onclick = () => {
        main.classList.toggle("faded");
        main.addEventListener("transitionend", ontransitionend);
    }

    function ontransitionend() {
        main.removeEventListener("transitionend", ontransitionend);
        main.classList.toggle("faded");
    }

    // List item selection
    ul.onclick = (e) => {
        const li = getCurrentLi(e.target);
        alert("Selected: " + getLiTitle(li) + " Click event on: " + e.target);
    }

    function getCurrentLi(el) {
        if (el.tagName === "LI") {
            return el;
        } else if (el.tagName === "UL") {
            alert("Reached list root, no LI found.");
        } else if (el.parentNode){
            return getCurrentLi(el.parentNode);
        } else {
            alert("Something went completly wrong.");
        }
    }

    function getLiTitle(li) {
        li.getElementsByTagName("h2")[0].textContent;
    }

    // Add new elements
    add.onclick = (e) => {
        e.stopPropagation();
        alert("add new element");
    }
}

window.onload = initialiseView;