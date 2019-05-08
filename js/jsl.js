"use strict";

import { addLiItemsFromServerToList } from "./jsr.js";
import { giveMeOneLorem } from "./jsr.js";


function initialiseView() {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button");
    const viewSwitch = header.querySelector(".list-button");
    let ul = main.getElementsByTagName("ul")[0];
    const add = header.querySelector(".add-button");
    const liTemplate = document.querySelector("main ul template");
    const dataUrl = "data/listitems.json";
    const max = 300;
    const min = 150;
    const dateOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

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
        ul.innerHTML = "";
        addLiItemsFromServerToList(dataUrl, addLiElementToList);
        main.classList.remove("faded");
        main.removeEventListener("transitionend", onTransitionEndRefresh);
    }

    // List item selection
    ul.onclick = (e) => {
        const li = getCurrentLi(e.target);
        if (e.target.classList.contains("option-button")) {
            const answer = confirm(
                "Do you want to delete this item?\n\n" +
                "- Title: " + 
                getLiTitle(li) + 
                "\n- Image-URL: " + 
                e.path[3].childNodes[1].currentSrc);
            if (answer === true) {
                li.parentNode.removeChild(li);
            }
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
        // Get date elements DD, MM, YYYY
        const date = new Date().toLocaleDateString('de-DE', dateOptions);
        // Generate dimensions for image
        const x = parseInt(Math.random() * (max - min) + min);
        const y = parseInt(Math.random() * (max - min) + min);
        addLiElementToList({
            title: giveMeOneLorem(),
            owner: "placeimg.com",
            added: date,
            numOfTags: parseInt(Math.random() * 10),
            src: `https://placeimg.com/${x}/${y}`
        });
    }

    function addLiElementToList(obj) {
        const li = document.importNode(liTemplate.content, true);
        li.querySelector("h2").textContent = obj.title;
        li.querySelector(".owner").textContent = obj.owner;
        li.querySelector(".added").textContent = obj.added;
        li.querySelector("img").src = obj.src;
        li.querySelector(".tags").textContent = obj.numOfTags;
        ul.appendChild(li);
    }

    addLiItemsFromServerToList(dataUrl, addLiElementToList);
}

window.onload = initialiseView;
