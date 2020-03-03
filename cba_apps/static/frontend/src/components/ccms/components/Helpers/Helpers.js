export const capsFirstWord = string =>
    string.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
