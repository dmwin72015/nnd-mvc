module.exports = function(value) {
    if (typeof value === 'string') {
        return value.replace('unicorn', 'horse');
    }
    return value;
};;
