export function queryString(json) {
    return Object.keys(json).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
}