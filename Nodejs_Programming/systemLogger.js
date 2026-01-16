const os = require('os');
const fs = require('fs');

function logInfo() {
    const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Arch: ${os.arch()}
Free Memory: ${os.freemem()}
Total Memory: ${os.totalmem()}
-----------------------------\n`;

    fs.appendFile('system.log', info, (err) => {
        if (err) console.log(err);
        else console.log("Logged system info");
    });
}

setInterval(logInfo, 5000);
