const express = require('express');
let KiteTicker = require('kiteconnect').KiteTicker;
let KiteConnect = require('kiteconnect').KiteConnect;

let ticker = new KiteTicker({
    api_key: 'te2wc7oc3ouv5st',
    accessToken: 'o2lfGubD4zDaLZiN090byd748qQT3cpq'
})

let kc = new KiteConnect({
    api_key: 'te2wc7oc3ouv5st',
    accessToken: 'o2lfGubD4zDaLZiN090byd748qQT3cpq'
});


const app = express();
const PORT = 9000;

function onTicks(ticks) {
   console.log('ticks', ticks);
}

function subscribe() {
    var items = [10178306];
    console.log('connected and suscribed');
    ticker.subscribe(items);
}

function onDisconnect(error) {
	console.log("Closed connection on disconnect", error);
}

function onError(error) {
	console.log("Closed connection on error", error);
}

function onClose(reason) {
	console.log("Closed connection on close", reason);
}

function onTrade(order) {
    console.log("Order update", order);
}

app.use('/api/stoploss', (req,res) => {
    let x = kc.getLoginURL();
    console.log('x', x);

    ticker.connect();
    ticker.on('ticks', onTicks);
    ticker.on('connect', subscribe);
    ticker.on('disconnect', onDisconnect);
    ticker.on('error', onError);
    ticker.on('close', onClose);
    ticker.on('order_update', onTrade);

    res.json({
      'hello': 'hi'
    })
})

app.listen(PORT, () => console.log('app running at port', PORT))