"use strict"
const totalProcesses = 500, batchSize = 10;
let startProcessIndex = 0
function batchRun() {
    const promises = []
    for (let i = 0; i < Math.min(batchSize, totalProcesses - startProcessIndex); i++) {
        const promise = new Promise((resolve, reject)=>{
          setTimeout(()=>{resolve()},1000)  
        })
        promises.push(promise);
    }
    const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{resolve()},2000)
      })
    promises.push()
    Promise.all(promises).then(()=>{
        startProcessIndex += batchSize;
        console.log(startProcessIndex)
        if(startProcessIndex < totalProcesses) {
            batchRun();
        }
    });
}
batchRun();