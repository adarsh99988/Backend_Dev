const { log } = require("console");
const os=require("os");

const totallyMemory=os.totalmem()/(1024*1024*1024);
const freeMemory=os.freemem()/(1024*1024*1024);


const platform=os.platform()
const uptime=os.uptime()/(3600)

const model=os.cpus()[0].model

const systemlog=`
Total memory: ${totalMemory}
Free memory: ${freememory}
Uptime: ${uptime}
Model: ${model}
Platform : ${platform}`

setInterval(()=>{
    fstat.appendFile("./system_log.txt",systemlog,(err)=>{
        if(err){
            console.error("Error writing to file:",err);
            
        }
        else{
            console.log("file is created succesfully: ");
            
        }
    })
})


console.log(totallyMemory, platform, uptime, model)