"use strict";

import { xhr } from "./lib/xhr.js";


export function addLiItemsFromServerToList(url, callback) {
    xhr("GET", url, null, (xhrobj) => {
        const items = JSON.parse(xhrobj.responseText);
        items.forEach(el => {
            callback(el);
        });
    });
}

const LOREMS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing',
    'elit', 'fugiat', 'eaque', 'nihil', 'itaque', 'repellendus', 'veniam',
    'numquam', 'fugit', 'fuga', 'doloremque', 'quidem', 'autem', 'quas',
    'porro', 'saepe', 'quasi', 'nemo', 'commodi', 'praesentium', 'incidunt',
    'quis', 'necessitatibus', 'voluptates', 'molestias', 'ipsa',
    'voluptatibus', 'dolorem', 'soluta', 'vitae', 'quisquam', 'rem', 'nobis',
    'eveniet', 'explicabo', 'sed', 'placeat', 'quibusdam', 'distinctio',
    'perspiciatis', 'doloribus', 'recusandae', 'facilis', 'voluptatum',
    'quo quidem', 'eius quos', 'ipsam', 'ex ratione', 'voluptate',
    'non laborum', 'odit corrupti', 'assumenda', 'voluptas', 'accusantium'
]

export function giveMeOneLorem() {
    return LOREMS[Math.floor(Math.random() * LOREMS.length)];
}
