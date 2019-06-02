export const getUrl = (url: string, path: string) => {
    if (url[url.length - 1] === '/') {
        return url + path;
    }

    return url + '/' + path;
};
