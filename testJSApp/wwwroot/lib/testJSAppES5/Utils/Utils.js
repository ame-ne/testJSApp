'use strict';

var HttpUtil = {
    SendData: function (url, dataToSend, callback) {
        var xhttp = new XMLHttpRequest();



        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        };
        if (dataToSend) {
            xhttp.open('POST', url, true);
            xhttp.setRequestHeader("Content-type", "application/json;odata=verbose;charset=utf-8");
            xhttp.send(dataToSend);
        }
        else {
            xhttp.open('GET', url, true);
            xhttp.send();
        }
    }
};

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