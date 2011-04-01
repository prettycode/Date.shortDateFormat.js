/*
    Original script title: Date.shortDateFormat.js, v1.0
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Date.shortDateFormat.js
    
    LICENSE: Permission is hereby granted for unrestricted use,
    modification, and redistribution of this script, ONLY under
    the condition that this code comment is kept wholly complete,
    appearing above the script's code body--in all original or
    modified implementations of this script, except those that
    are minified.
*/

(function() {

    function ShortDateFormatError(msg) {
        return "Argument `format` is malformed: " + msg;
    }
    
    (function() {

        function contains(s, search) {
            return s.indexOf(search) !== -1;
        };
        
        // Convert Date object to formatted short date string

        Date.prototype.toShortDateFormat = function(format) {
        
            format = format || Date.shortDateFormat;

            var month = this.getMonth() + 1; // Months (only) start at 0

            if (contains(format, "mm")) {
                format = format.replace("mm", (month < 10 ? "0" : "") + month);
            }
            else if (contains(format, "m")) {
                format = format.replace("m", month);
            }
            else {
                throw ShortDateFormatError("missing `m` or `mm` for month");
            }

            var day = this.getDate();

            if (contains(format, "dd")) {
                format = format.replace("dd", (day < 10 ? "0" : "") + day);
            }
            else if (contains(format, "d")) {
                format = format.replace("d", day);
            }
            else {
                throw ShortDateFormatError("missing `d` or `dd` for day");
            }

            if (contains(format, "yyyy")) {
                format = format.replace("yyyy", this.getFullYear());
            }
            else if (contains(format, "yy")) {
                format = format.replace("yy", (this.getFullYear() + "").substring(2));
            }
            else {
                throw ShortDateFormatError("missing `yy` or `yyyy` for year");
            }

            return format;
        };
    
    })();
    
    // Convert localized short date string to Date object

    Date.parseShortDateFormat = function (format, date) {

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
                throw ShortDateFormatError("expected 'd', 'm', or 'y', but got '" + datePart + "'");
            }
        }
        
        month = parseInt(month, 10);

        if (isNaN(month) || month > 12 || month < 1) {
            return null;
        }

        day = parseInt(day, 10);

        if (isNaN(day) || day > 31 || day < 1) {
            return null;
        }

        year = parseInt(year, 10);

        if (isNaN(year)) {
            return null;
        }

        return new Date(month + "/" + day + "/" + year);
        
    };

})();