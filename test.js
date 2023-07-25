let val = 0;
// (async () => {
  // const y = new Promise(resolve =>{while(true);3});
  const x = Promise.race([
        new Promise(resolve => { while(true);}),
        new Promise(resolve => { let i = 0; while((i++)<100);console.log(2); resolve(); }),
        new Promise(resolve => { let i = 0; while((i++)<2000);console.log(3); resolve(); }),
        ]);
    console.log('This line ran');
// })();