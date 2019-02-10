function add(){

    let calculateMarketCap = document.getElementById("marketcapa")

async function marketCap(){
    let totalEthBalUrl = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=YourApiKeyToken`
    let lastETHPriceUrl = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken`

    let fetchTotalEthBal = await fetch(totalEthBalUrl)
    let jsonFetchAddressUrl = await fetchTotalEthBal.json()
    let totalETH = jsonFetchAddressUrl.result
    let fetchLastETHPrice = await fetch(lastETHPriceUrl)
    let jsonFetchLastPrice = await fetchLastETHPrice.json()
    let lastpriceETH = jsonFetchLastPrice.result.ethusd
    let finalValue = totalETH * lastpriceETH/10**27
    let totalMarketCap = finalValue.toFixed(3)
    calculateMarketCap.innerHTML = "MARKET CAP OF $" + totalMarketCap + " BILLION"

}
marketCap()

    
    let btcValue = document.getElementById("btc")

async function getBTCvalue(){
    let url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken`
    let btcfetchURL = await fetch(url);
    let jsonBTC = await btcfetchURL.json();  
    btcValue.innerHTML = "$"+jsonBTC.result.ethusd +" @ " +jsonBTC.result.ethbtc +" BTC/ETH"
} 
    getBTCvalue()

    let fullFunc = document.getElementById("lastblock");
    console.log(fullFunc);

async function lastBlockFunc(){
    let key = "KG94UG5KU6CTCUDDJAC5DHAIAUH5KAGTJS";
    let url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${key}`
    console.log(url)
    let lastBlockValue= await fetch(url)
    let jsonLastBlockValue= await  lastBlockValue.json()
    let number=parseInt(jsonLastBlockValue.result,16)
    calculateDifficulty(jsonLastBlockValue.result)
    transaction(jsonLastBlockValue.result)
    console.log(number)
    fullFunc.innerHTML=number
}
    lastBlockFunc();

    

    let transactionid = document.getElementById("transaction")
 
async function transaction(num){

    let url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockTransactionCountByNumber&tag=${num}&apikey=YourApiKeyToken`
    let lastTransaction = await fetch(url)
    let jsonLastTransaction = await lastTransaction.json()
    let lastTransactionNumber = parseInt(jsonLastTransaction.result,16);
    transactionid.innerHTML = lastTransactionNumber

}    
    transaction();



    let difficultyFunc = document.getElementById('difficulty')
    
async function calculateDifficulty(num){
        
        let url=`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${num}&boolean=true&apikey=YourApiKeyToken`
        let fetchDifficulty = await fetch(url)
        let jsonFetchDifficulty = await fetchDifficulty.json()
        let lastDifficulty = parseInt(jsonFetchDifficulty.result.difficulty,16)
        let afterDecimal = lastDifficulty/1000000000000;
        let afterDecimalLastDifficulty = afterDecimal.toFixed(2) + ' TH'
        calculateHashRate(lastDifficulty)
        difficultyFunc.innerHTML = afterDecimalLastDifficulty

    }


    let hashFunc = document.getElementById('hashrate')

function calculateHashRate(difficultyNumber){
    console.log(difficultyNumber);
    let hashRate = difficultyNumber / 15000000000 
    console.log(hashRate)
    let afterDecimal =  hashRate.toFixed(2) + ' GH/s'
    console.log(afterDecimal)
    hashFunc.innerHTML = afterDecimal
    }

const buttonFunc = document.getElementById("buttonid")
const inputData = document.getElementById("searchinputid")
let outputValue = document.getElementById("outputid")

buttonFunc.addEventListener("click",async function (e){
    e.preventDefault();
    let address = inputData.value;
    console.log(address);
    let url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`
    let fetchAddressUrl = await fetch(url)
    let jsonfetchAddressUrl =await fetchAddressUrl.json()
    console.log(jsonfetchAddressUrl)
    outputValue.innerHTML = "The Balance is " + jsonfetchAddressUrl.result/1000000000000000000 + " Ether"
    // buttonFunc2(address)
})

const trxButton = document.getElementById("button2id")
let outputTrxValue = document.getElementById("trancount")

trxButton.addEventListener("click",async function(e){
    e.preventDefault()
    let key = "KG94UG5KU6CTCUDDJAC5DHAIAUH5KAGTJS"
    let address = inputData.value
    let url = `https://api.etherscan.io/api?module=proxy&action=eth_getTransactionCount&address=${address}&tag=latest&apikey=${key}`
    let fetchTrx = await fetch(url)
    let jsonFectTrx = await fetchTrx.json()
    console.log(jsonFectTrx)
    let jsonFEtchTxCount = parseInt(jsonFectTrx.result,16)
    console.log(jsonFEtchTxCount)
    outputTrxValue.innerHTML = "The Transaction count is " + jsonFEtchTxCount

})
}

window.onload=add
setInterval(add, 5000);
 