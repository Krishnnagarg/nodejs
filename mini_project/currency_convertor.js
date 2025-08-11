import https from 'https';
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
    input:process.stdin,//used for read 
    output:process.stdout,//used for write
});

const apiKey = `574e72139bea2b1ad69a43ef`;
const url = `https://v6.exchangerate-api.com/v6/574e72139bea2b1ad69a43ef/latest/USD` ;

const convertCurrency = (amount,rate) => {
    return (amount * rate).toFixed(2)
}

https.get(url , (response) =>{
    let data ="";
    response.on('data' , (chunk) => {
        data += chunk;
    });

    response.on('end' , () =>{
        const rates = JSON.parse(data).conversion_rates;
        
        rl.question(`Enter the amount in USD:` , (amount) => {
            rl.question(`Enter the target currency (e.g., INR,EUR,NPR) :` , (currency)=>{
                const rate = rates[currency.toUpperCase()];
                if(rates) {
                    console.log(`${amount} USD is approximately ${convertCurrency(amount,rate)} ${currency}`);
                }else {
                    console.log(`Invalid Currency Code`);
                }
                rl.close();
            })
        })
    })
})


