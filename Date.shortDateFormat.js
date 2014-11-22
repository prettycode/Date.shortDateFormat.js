/*
    Copyright (c) 2011, Chris O'Brien, prettycode.org, MIT license
    http://github.com/prettycode/Date.shortDateFormat.js
*/

(function() {

    // Convert Date object to formatted short date string

    (function() {

        function contains(s, search) {
            return s.indexOf(search) !== -1;
        };
    
        Date.prototype.toShortDateFormat = function(format) {
        
            format = format || Date.shortDateFormat;

            var month = this.getMonth() + 1; // Months (only) start at 0

            if (contains(format, "mm")) {
                format = format.replace("mm", (month < 10 ? "0" : "") + month);
            }
            else if (contains(format, "m")) {
                format = format.replace("m", month);
            }
    
            var day = this.getDate();

            if (contains(format, "dd")) {
                format = format.replace("dd", (day < 10 ? "0" : "") + day);
            }
            else if (contains(format, "d")) {
                format = format.replace("d", day);
            }
            
            var year = this.getFullYear();
    
            if (contains(format, "yyyy")) {
                format = format.replace("yyyy", year);
            }
            else if (contains(format, "yy")) {
                format = format.replace("yy", (year + "").substring(2));
            }
    
            return format;
        };
    
    })();
    
    // Convert localized short date string to Date object

    Date.parseShortDateFormat = function (date, format) {

        format = format || Date.shortDateFormat;
    
        var separator = date.replace(/\d/g, "").charAt(0),
            formatSplit = format.split(separator),
            dateSplit = date.split(separator);

        var day, month, year;
        
        for (var i = 0, len = formatSplit.length; i < len; i++) {
        
            var datePart = formatSplit[i].charAt(0);

            if (datePart === "d") {
                day = dateSplit[i];
            }
            else if (datePart === "m") {
                month = dateSplit[i];
            }
            else if (datePart === "y") {
                year = dateSplit[i];
            }
            else {
                throw "Argument 'format' is malformed: expected 'd', 'm', or 'y', but got '" + datePart + "'";
            }
        }
        
        day = parseInt(day, 10);

        if (isNaN(day) || day > 31 || day < 1) {
            return null;
        }

        month = parseInt(month, 10);

        if (isNaN(month) || month > 12 || month < 1) {
            return null;
        }
        
        year = parseInt(year, 10);

        if (isNaN(year)) {
            return null;
        }

        return new Date(month + "/" + day + "/" + year);
        
    };

})();
