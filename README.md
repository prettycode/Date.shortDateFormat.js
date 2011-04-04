Date.shortDateFormat
===================

This script is designed to aid in localizing and parsing localized dates, though it can easily be used for other 
formatting needs unrelated specifically to localization.

It creates a `Date.prototype` for converting `Date` objects to date-only strings according to specific format:

    Date.prototype.toShortDateFormat = function(format) {
        ...
    };
    
And a function for parsing strings that represent dates in a specific, date-only format:

    Date.parseShortDateFormat = function(date, format) {
        ...
    };
    
 
'format' Argument
--------------------------------    
    
In both functions, the `format` argument specifies a string format to convert the date to, or the format to parse from.
(See the sections below for the specific syntax of `format`.)

In the absense of a `format` argument, both functions will use the value of `Date.shortDateFormat` for the format
string.

Therefore, if you wish to set a global short date format, set `Date.shortDateFormat` to the format, omit the
`format` argument for the functions, and both `toShortDateFormat` and `parseShortDateFormat` will automatically use 
`shortDateFormat` in the absense of a `format` argument.


Date.prototype.toShortDateFormat
----------------------------------

To use `toShortDateFormat()`, call it on a `Date` object:

    var todayFormatted = new Date().toShortDateFormat("m/d/yyyy");
    
`toShortDateFormat()` looks for `dd` or `d`, `mm` or `m`, and `yyyy` or `yy` characters in the `format` argument and
replaces them with the corresponding day, month, and year.

In the `todayFormatted` example above, if the current date is April 5th, 2011, the `todayFormatted` will be equal to
`4/5/2011`.

To include leading zeros in months or days that are less than 10, use `dd` and `mm`:

    var todayFormatted = new Date().toShortDateFormat("mm/dd/yyyy");
    console.log(todayFormatted + " === '04/05/2011'");
    
Use `yy` for the last-two digits of the year, or `yyyy` for the full four-digit year:

    var todayFormatted = new Date().toShortDateFormat("mm-dd-yy");
    console.log(todayFormatted + " === '04-05-11'");
    
If `toShortDateFormat()` does not find `dd` or `d`, it will not output the day in the result. The same applies to `mm`
or `m` and `yy` or `yyyy`. For example:

    var todayFormatted = new Date().toShortDateFormat("Pizza party: mm/dd");
    console.log(todayFormatted + " === 'Pizza party: 04/05'");
    
    todayFormatted = new Date().toShortDateFormat("yyyym");
    console.log(todayFormatted + " === '20114'");
    
    todayFormatted = new Date().toShortDateFormat("");
    console.log(todayFormatted + " === ''");
    
    
Date.parseShortDateFormat
-------------------------

While `toShortDateFormat()` is liberal with its formatting, allowing non-date characters and missing date portions, 
`Date.parseShortDateFormat` is more strict: the `format` argument *must* contain `dd` or `d`, `mm` or `m`, and `yyyy` or
`yy`, *and a consistent separator character*, with no superfluous characters.

For example, this is a valid `format` argument:

    var myDate = Date.parseShortDateFormat("2011-04-05", "yyyy-mm-dd");
    
It's valid because the separator character, `-`, is present and consistent, and `yyyy`, `mm`, and `dd` are included. The
separator character can be any character, as long as it is the same throughout the `format` string.

A separator character is consistent when the same character is used. For example, this is not consistent, and will
result in an error:

    var format = "yyyy/mm--dd";
    
If either day, month, or year are not found, an exception will be thrown. In the example below, `yyy` is used when the
function expects either `yy` or `yyyy`, and an exception results. (The string would be successfully parsed if not for
the `yyy`.)

    var myDate = Date.parseShortDateFormat("2011.04.05", "yyy.mm.dd");

If a parsed day or month is out of range (the day is 32 or month is 13), `parseShortDateFormat()` will return null:

    console.log(Date.parseShortDateFormat("32.05.11", "dd.mm.yy") + " === null");
    
Lastly, it's important to note that the format is fuzzy for `dd`/`d`, `mm`/`m`, and `yy`/`yyyy`. In other words, if 
the date being parsed is in `dd` format and the `format` string specifies `d`, the short date will still be successfully
parsed. For example, these successfully parse: 

    var aprilFools = Date.parseShortDateFormat("11-4-1", "yyyy/dd/mm"),
        newYears = Date.parseShortDateFormat("2011/1/1", "yy/mm/dd");