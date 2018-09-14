'use strict';

var Base64Util = {
    DecodeText: function (text) {
        //return atob(text);
        return decodeURIComponent(Array.prototype.map.call(atob(text), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''));
    },
    
    DecodeArray: function (arrayText) {
        var arrayData = arrayText.split('#;');
        var convertedArray = [];
        for (var i = 0; i < arrayData.length; i++) {
            convertedArray.push(this.DecodeText(arrayData[i]));
        }
        return convertedArray;
    },

    DecodeData: function (text) {
        if (text.indexOf('#;') > -1) {
            return this.DecodeArray(text);
        }
        else {
            return this.DecodeText(text);
        }
    }
};

var HtmlUtil = {
    PasteHtml: function (areaName, content) {
        var area = document.getElementById(areaName);
        if (area) {
            area.innerHTML = content;
        }
    }
};