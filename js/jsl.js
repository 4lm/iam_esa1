/**
 * Created by master on 01.03.16.
 */
function initialiseView() {
    const header = document.getElementsByTagName("header")[0];
    const main = document.querySelector("main");
    const refresh = document.querySelector("footer .refresh-button")

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
    main.querySelectorAll("li").forEach(li => {
        li.onclick = (e) => {
            alert("Select: " + getLiTitle(li) + ", click on: " + e.target)
        }
    });

    getLiTitle = (li) =>li.getElementsByTagName("h2")[0].textContent;
}

window.onload = initialiseView;