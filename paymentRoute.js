require('dotenv').config()
const express=require('express')
const router=express.Router()
const {v4:uuidv4}=require('uuid')
const PaytmChecksum=require('./PaytmChecksum')

router.post('/payment',(req,res)=>{

    /* import checksum generation utility */

const{amount,email} = req.body;
const totalAmount=JSON.stringify(amount);
var params={};

params['MID'] = process.env.PAYTM_MID,
params['WEBSITE'] = process.env.PAYTM_WEBSITE,
params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUCTRY_TYPE_ID,
params['ORDER_ID'] = uuidv4(),
params['CUST_ID'] = process.env.PAYTM_CUST_ID,
params['TXN_AMOUNT'] = totalAmount,
params['CALLBACK_URL'] = 'http://localhost:4001/api/callback',
params['EMAIL'] = email,
params['MOBILE_NO'] = '8917310896'


/* initialize JSON String */ 
// paytmParams["MID"] = "YOUR_MID_HERE";
// paytmParams["ORDERID"]="YOUR_ORDER_ID_HERE";

/**
* Generate checksum by parameters we have
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
var paytmChecksum = PaytmChecksum.generateSignature(Params, process.env.PAYTM_MERCHANT_KEY);
paytmChecksum.then(function(checksum){
	let paytmParams={
		...params,
		"CHECKSUMHASH":checksum
	}
	res.json(paytmParams)
	
}).catch(function(error){
	console.log(error);
});



})
module.exports=router