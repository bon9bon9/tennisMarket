function route(pathname,handle,response,productId){
    console.log('pathname :' + pathname);

    if(pathname.indexOf("/img/") === 0){
        handle['imgUrl'](response,pathname);
    }
    else if(typeof handle[pathname] == 'function'){
        handle[pathname](response,productId);
    }else{
        response.writeHead(404, {'Content-Type' : "text/html"}); // 헤드넣고
        response.write('not found'); // 바디 넣고
        response.end(); // 끝!
    }
}

exports.route = route;