"use strict";
import { xhr } from "./lib/xhr.js";
/**
 * Created by master on 01.03.16.
 * Updated for W19, demonstrate alternatives for accessing server-side content and processing the result
 */
export function addLiItemsFromServerToList(url, callback) {
    xhr("GET", url, null, (xhrobj) => {
        const items = JSON.parse(xhrobj.responseText);
        items.forEach(el => {
            callback(el);
        });
    });
}