const router = require('express').Router()
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

router.post('/', (req, res)=>{
    const {message, phone} = req.body;
    client.sendMessage(`549${phone}@c.us`, message);
    
    res.json('ok')
})
client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();

client.on('message', message => {
        console.log(message.body);
        
});

 




module.exports = router;