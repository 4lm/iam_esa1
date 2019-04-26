"use strict;"
/**
 * Created by master on 01.03.16.
 */
initialiseView = () => {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button");
    const ul = main.getElementsByTagName("ul")[0];

    // Switching views
    header.onclick = () => {
        document.body.classList.toggle("tiles");
    }

    // Fade in|out
    refresh.onclick = () => {
        main.classList.toggle("faded");
        main.addEventListener("transitionend", ontransitionend);
    }

    ontransitionend = () => {
        main.classList.toggle("faded");
        main.removeEventListener("transitionend", ontransitionend);
    }

    // List item selection
    ul.onclick = (e) => {
        const li = getCurrentLi(e.target);
        alert("Selected: " + getLiTitle(li) + " Click event on: " + e.target);
    }

    getCurrentLi = (el) => {
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

    getLiTitle = (li) => li.getElementsByTagName("h2")[0].textContent;
}

window.onload = initialiseView;