async function asyncTest(){
    //return 'hello world';
    throw new Error('woops')
}
// function syncTest(){
//     return new promise((resolve, reject)=> {
//         resolve('hello world');
//     })
// }

const testValue = asyncTest();

console.log(testValue)

promiseTest();

function promiseTest()
{
    const fetchData = new Promise((resolve, reject)=> {
        setTimeout(()=> {
            const data ='data fetched';

            resolve(data);

        }, 2000);
    });
    console.log(fetchData)

    fetchData
    .then((data)=> {
            console.log(data);
        })
       .catch((err)=> {
            console.log('fail')
            console.log(err);
        });
    console.log('js isnt waiting for this to happen')
}


function intervalTest(){
    const myInterval = setInterval(() => {
        console.log('ding');
    }, 1000);

    setTimeout(() => {
        clearInterval(myInterval);
        console.log('done');
    }, 5000)
}

function intervalTest(){
console.log(`i didn't wait at all`)
setTimeout( () => {
    console.log(`i waited 5 second`)
    
}, 5000);
console.log(` i didn't wait at all`);
console.log('execuate keep going while we wait')
}