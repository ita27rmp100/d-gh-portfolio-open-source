const express = require('express');
const router = express.Router();
const fs = require('fs')

router.get('/:username',(req,res)=>{
    const username = req.params.username
    const dataDir = `${__dirname}/users/${username}.json`
    if (!fs.existsSync(dataDir)) {
        res.render("messages",{msgsList:"<b>No messages has been sent for you</b>"})
        return
    }
    let msgsList = ''
    const messages = require(dataDir)
    const NumOfMessages = Object.keys(messages).length
    if(NumOfMessages==0) msgsList="<b>No messages has been sent for you</b>"
    else{
        for (let i=0;i<NumOfMessages;i++) {
            const msg = messages[String(i+1)];
            msgsList += `<new-msg name="${msg[0]}" email="${msg[1]}" message="${msg[2]}"></new-msg>`
        }
    }
    res.render("messages",{msgsList})
})

module.exports = router