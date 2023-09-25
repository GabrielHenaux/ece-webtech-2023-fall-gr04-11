const http = require('http')
const url = require('url')
const qs = require('querystring')

module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname
        const params = qs.parse(route.query)

        if (path === '/') {

            res.writeHead(200, { 'Content-Type': 'text/html' });

            res.write('<p>To use the /hello route, append "/hello" to the URL and provide a name query parameter. For example:</p>');

            res.write('<p><a href="/hello?name=John">/hello?name=John</a></p>');

            res.write('<p><a href="/hello?name=YourName">/hello?name=YourName</a></p>');

        } else if (path === '/hello') {

            res.writeHead(200, { 'Content-Type': 'text/plain' });

            if ('name' in params) {

                if (params['name'].toLowerCase() === 'yourname') { // Replace 'yourname' with your actual name

                    res.write('Hello, I am YourName. I am a web developer and love to work on exciting projects.'); // Replace with your introduction

                } else {

                    res.write('Hello ' + params['name']);

                }

            } else {

                res.write('Hello anonymous');

            }

        } else {

            res.writeHead(404, { 'Content-Type': 'text/plain' });

            res.write('404 Not Found');

        }


        res.end();

    }
}
