/**
 * Created by master on 01.03.16.
 */
function initialiseView() {
    var header = document.getElementsByTagName("header")[0];
    var main = document.querySelector("main");
    var refresh = document.querySelector("footer .refresh-button")

    header.onclick = () => {
        document.body.classList.toggle("tiles");
    }

    refresh.onclick = () => {
        main.classList.toggle("faded");
    }
}

window.onload = initialiseView;