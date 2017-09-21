var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
};

var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
};
var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
    reUnescapedHtml = /[&<>"'`]/g,
    reHasEscapedHtml = RegExp(reEscapedHtml.source),
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
}

function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
}

function baseToString(value) {
    return value == null ? '' : (value + '');
}

function escape(string) {
    // Reset `lastIndex` because in IE < 9 `String#replace` does not.
    string = baseToString(string);
    return (string && reHasUnescapedHtml.test(string)) ?
        string.replace(reUnescapedHtml, escapeHtmlChar) :
        string;
}

function unescape(string) {
    string = baseToString(string);
    return (string && reHasEscapedHtml.test(string)) ?
        string.replace(reEscapedHtml, unescapeHtmlChar) :
        string;
}

module.exports = exports;

exports.escape = escape;
exports.unescape = unescape;