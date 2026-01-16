const http = require('http');

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/todos') {
        res.end(JSON.stringify(todos));
    }

    else if (req.method === 'POST' && req.url === '/todos') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            const task = JSON.parse(body);
            task.id = id++;
            todos.push(task);

            res.end(JSON.stringify(task));
        });
    }

    else if (req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[2]);
        todos = todos.filter(t => t.id !== id);

        res.end(JSON.stringify({ message: "Deleted" }));
    }

    else {
        res.end("Route not found");
    }

});

server.listen(3000, () => console.log("Server running on 3000"));
