const router = require('express').Router()
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require("fs");
const { Client } = require('whatsapp-web.js');
const qr_image_1 = require("qr-image");
const client = new Client();
let svg;

router.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname+'/index.html'));
})
router.post('/', (req, res)=>{
    const {message, phone} = req.body;
    client.sendMessage(`549${phone}@c.us`, message);
    
    res.json('ok')
})
client.on('qr', (qr) => {
        // qrcode.generate(qr, {small: true});
        generateImage(qr);  
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        escribirHTML("./tmp/R.png");
    });

    client.initialize();

client.on('message', message => {
        console.log(message.body);
        
});

function generateImage(base64){
    const pat = `${process.cwd()}/static/tmp`;
    let qr_svg = (0, qr_image_1.image)(base64, { type: "svg", margin: 4 });
    qr_svg.pipe(fs.createWriteStream(`${pat}/qr.svg`));
    escribirHTML("./tmp/qr.svg")
    console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
    console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
};

function escribirHTML(imagen){
    fs.writeFile(path.join(__dirname + '/static/index.html'), `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="refresh" content="10">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css">
        <title>Document</title>
    </head>
    <body>
        <div id="cubo">
            <img id="img" src=${imagen} alt="">
        </div>
    </body>
    </html>
    `, ()=>{console.log('listo')})
}
 



module.exports = router;