const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const axios = require('axios')

router.post('/badig-check', async(req,res) =>{
    axios.get('https://amalia.telkomakses.co.id/pdf/examples/amalia_for_digital_signatur.php?no_wo='+req.body.sc_id,
{ maxContentLength: 63279 })
    .then(result => {
        res.json({ Status: req.body.sc_id+"| BA NOK" });
    }).catch(err => {
        res.json({ Status: req.body.sc_id+"| BA ADA" });
    });
})

router.post('/material-check', async(req,res) =>{
    var listmaterial = [
        "AC-OF-SM-1B", 
        "BREKET-A", 
        "KLEM-KUPING", 
        "KLEM-RING-5-LUBANG", 
        "KLEM-SPIRAL",  
        "OTP-FTTH-1", 
        "Preconnectorized-1C-150-NonAcc", 
        "Preconnectorized-1C-80-NonAcc", 
        "PREKSO-INTRA-15-RS", 
        "PREKSO-INTRA-20-RS", 
        "PU-S7.0-140", 
        "RS-IN-SC-1", 
        "S-Clamp-Spriner", 
        "SOC-SUM",
        "SOC-ILS",
        "TC-2-160", 
        "TC-OF-CR-200",
        "CLAMP-HOOK"
    ];
    let tempdata = ""
    const ardata = [];
    axios.get('https://apps.telkomakses.co.id/report_amalia_new/index.php?r=report/viewMaterial&id='+req.body.sc_id)
    .then(result => {
        const scrapping = result.data.replace(/(\r\n|\n|\r)/gm, "")
            for(let j = 0; j < listmaterial.length+1; j++){
                ardata[0] = req.body.sc_id
                const material = listmaterial[j]
                if(scrapping.lastIndexOf(material) != -1){
                    const muncul = getStringInBetween(scrapping,`<td>${material}</td>`,'</td>').replace("<td>","").trim()
                    ardata[j+1] = muncul
                }else{
                    ardata[j+1] = "0"
                }

                tempdata = tempdata.concat( `<td>${ardata[j]}</td>`)
                // tempdata .= `<td>${ardata[j]}</td>`;
            }
            res.json({ Status: tempdata });
    }).catch(err => {
        res.send(err)
    });
})



async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://Yarucore:Saya1234@cluster0.wpsm9.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser:true
    })
    
    return client.db('vue_express').collection('posts');
}

function getStringInBetween(string, start , end) {
    var indexOfStart = string.indexOf(start)
    indexOfStart = indexOfStart + start.length;
    var newString = string.slice(indexOfStart)
    var indexOfEnd = newString.indexOf(end)
    return newString.slice(0, indexOfEnd)
}

module.exports = router;