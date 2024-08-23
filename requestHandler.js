const fs = require('fs'); // file sink 의 약자
const main_view = fs.readFileSync('./index.html','utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html','utf-8');
const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err,rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : "text/html; charset=UTF-8;"}); // 헤드넣고
    response.write(main_view); // 바디 넣고
    response.end(); // 끝!
}

function imgUrl(response,pathname){
    fs.readFile('.'+pathname,function(err,data){
        response.writeHead(200, {'Content-Type' : "text/html; charset=UTF-8;"}); // 헤드넣고
        response.write(data); // 바디 넣고
        response.end(); // 끝!
    });
}

function order(response, productId){
    mariadb.query('INSERT INTO orderlist(product_id, order_date) VALUES('+ productId + ',"'+new Date().toLocaleDateString() + '");',function(err,rows){
        console.log(err);
        console.log(rows);
    })
    orderlist(response);
}

function orderlist(response){
    response.writeHead(200, {'Content-Type' : "text/html; charset=UTF-8;"}); // 헤드넣고
    mariadb.query('select o.id, p.name, p.description, p.price, o.order_date from orderlist as o join product as p on o.product_id = p.id;',function(err,rows){
        response.write(orderlist_view);
        rows.forEach(element => {
            response.write("<tr>"
                +"<td>"+element.id+"</td>"
                +"<td>"+element.name+"</td>"
                +"<td>"+element.description+"</td>"
                +"<td>"+element.price+"</td>"
                +"<td>"+element.order_date+"</td>"
                +"</tr>"
            )
        });
        response.write("</table>");
        response.end();
    });
}

let handle = {}; // key:value 꼴로 이루어진 상자..
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['imgUrl'] = imgUrl;

exports.handle = handle;