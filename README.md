Date.shortDateFormat
===================

This script is designed to aid in localizing and parsing localized dates, though it can easily be used for other 
formatting needs unrelated specifically to localization.

It creates a `Date.prototype.toShortDateFormat` function for converting `Date` objects to date-only strings according to
a specified format, like so:

    var dateOnlyString = new Date().toShortDateFormat("yyyy-mm-dd");
    
The script also includes a function off of `Date` for parsing strings that represent dates in specific formats:

    var dateObject = Date.parseShortDateFormat(dateOnlyString, "yyyy-mm-dd");
    
 
Optional 'format' Argument
--------------------------------    
    
In both functions, the `format` argument specifies a string format to convert the date to, or the format to parse from.
In the absense of a `format` argument, both functions will use the value of `Date.shortDateFormat` for the format string.

Therefore, if you wish to set a global short date format, set `Date.shortDateFormat` to the format, omit the
`format` argument for the functions, and both `toShortDateFormat()` and `parseShortDateFormat()` will automatically use 
`shortDateFormat` in the absense of a `format` argument:

    Date.shortDateFormat = "d/m/yy";
    
    var dateOnlyString = new Date().toShortDateFormat(),
        dateObject = Date.parseShortDateFormat(dateOnlyString);

Date.prototype.toShortDateFormat
----------------------------------

To use `toShortDateFormat()`, call it on a `Date` object:

    var todayDate = new Date(),
        todayFormattedString = today.toShortDateFormat("m/d/yyyy");
    
`toShortDateFormat()` looks for `dd` or `d`, `mm` or `m`, and `yyyy` or `yy` characters in the `format` argument and
replaces them with the corresponding day, month, and year.

In the `todayFormatted` example above, if the current date is April 5th, 2011, the `todayFormatted` will be equal to
`4/5/2011`.

To include leading zeros in months or days that are less than 10, use `dd` and `mm` instead of `d` and `m` in `format`:

    todayDate.toShortDateFormat("mm/dd/yyyy"); // "04/05/2011"
    
Use `yy` for the last-two digits of the year, or `yyyy` for the full, four-digit year:

    todayDate.toShortDateFormat("mm-dd-yy"); // "04-05-11"
    
If `toShortDateFormat()` does not find `dd` or `d`, it will not output the day in the result. The same applies to `mm`
or `m` and `yy` or `yyyy`. For example:

    todayDate.toShortDateFormat("Pizza party: mm/dd"); // "Pizza party: 04/05"
    todayDate.toShortDateFormat("yyyym");              // "20114"
    todayDate.toShortDateFormat("");                   // ""
    
    
Date.parseShortDateFormat
-------------------------

While `toShortDateFormat()` is liberal with its formatting, allowing non-date characters and missing date portions, 
`Date.parseShortDateFormat` is more strict: the `format` argument *must* contain `dd` or `d`, `mm` or `m`, and `yyyy` or
`yy`, `format` *must* have a consistent separator character (can by any character except `d`, `m`, and `y`), and the
string to parse *must not* contain superfluous characters (must not contain any characters except: a separator, `d`, `m`,
and `y`).

If either day, month, or year are not found, an exception will be thrown. In the example below, `yyy` is used when the
function expects either `yy` or `yyyy`, and an exception results. (The string would be successfully parsed if not for
the `yyy`.)

    var dateObject = Date.parseShortDateFormat("2011.04.05", "yyy.mm.dd");

A separator character is "consistent" when the same character is used twice. For example, this is not consistent, and
will result in a run-time error:

    var format = "yyyy/mm--dd";    

If a parsed day or month is out of range (the day is `32` or month is `13`, for example), `parseShortDateFormat()` will
return `null`:

    Date.parseShortDateFormat("32.05.11", "dd.mm.yy"); // null
    
Lastly, it's important to note that the format is fuzzy for `dd`/`d`, `mm`/`m`, and `yy`/`yyyy`. In other words, if 
the date being parsed is in `dd` format and the `format` string specifies `d`, the short date will still be successfully
parsed. For example, these successfully parse: 

    var aprilFools = Date.parseShortDateFormat("11-4-1", "yyyy/dd/mm"),
        newYears   = Date.parseShortDateFormat("2011/1/1", "yy/mm/dd");