const { log } = require("console");
const fs=require("fs");

//fs.copyFileSync("../testing.txt","copied.txt")
//fs.copyFile("../testing.txt","copied.txt",(err)=>{
//    if(err){
//        console.log("error")
//        return;
//    }
//    console.log("File copied")
//
//})
try{
    fs.readFileSync("copied.txt","utf-8")
    console.log("File is copied")
}
catch(err){
    console.log("Error while copying file")
}

fs.unlink("newfile.txt",(err)=>{
    if(err){
        console.lof("Error while deleting file")
        return;
    }
    console.log("File deleted")

})
fs.writeFile("newfile.txt","this is new file",(err)=>{
    if(err){
        console.lof("Error while deleting file")
        return;
    }
    console.log("File is created")


})


