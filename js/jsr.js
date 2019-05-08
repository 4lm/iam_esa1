"use strict";

export function addLiItemsFromServerToList(url, callback) {
    fetch(url)
        .then(data => data.json())
        .then(json => json.forEach(el => callback(el)))
        .catch(err => console.log(err));
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
