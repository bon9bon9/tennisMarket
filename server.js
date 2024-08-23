let http = require('http');
let url = require('url');

function start(route, handle){
    function onRequest(request,response){
        let parsedUrl = new url.URL(request.url, `http://${request.headers.host}`);
        let pathname = parsedUrl.pathname;
        let queryData = parsedUrl.searchParams;

        route(pathname,handle,response, queryData.get('productId'));
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;