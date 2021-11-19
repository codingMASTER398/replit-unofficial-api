var replitapi = require("../index");

(async()=>{
    console.log(await replitapi.userdata("codingMASTER398"))
    console.log(await replitapi.repldata("codingMASTER398","hm"))
    var e = await replitapi.replappsdata("kajam2021",true)
    console.log(e.repls.length)
    console.log(await replitapi.featuredrepls())
})()
