var nodemailer = require('nodemailer');
const moment = require('moment')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aston.animal.sanctuary1@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});


const sendMail = (to, subject, text, animal, status, by, adoption_link) => {
    var mailOptions = {
        from: 'aston.animal.sanctuary1@gmail.com',
        to,
        subject,
        text,
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ATTN: Changed status of Animal Adoption</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,700;0,800;0,900;1,500&display=swap');
            /* Poppins font */

                    body {
                        margin: 0 5vw;
                        font-family: 'Poppins', sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        box-sizing: border-box;
                        padding: 0;
                        min-height: 100vh;
                    }
                    a{
                        text-decoration: none;
                        color: inherit;
                        display: inline-block;
                    }
                    li{
                        list-style: none;
                    }

                    code {
                        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
                            monospace;
                    }
                    .center{
                        min-width: 100%;
                        min-height: 85vh;
                        display: flex;
                        align-items: center;
                    }
                    .center > *{
                        margin: auto;
                    }
                    button.btn{
                        font-size: 18px;
                        background-color: black;
                        font-weight: bold;
                        color: white;
                        padding: 15px 60px;
                        border: none;
                        border-radius: 100px;
                        cursor: pointer;
                        transition: all 100ms ease-out;
                    }
                    .btn-outline{
                        border: 2px solid black !important;
                        color: black !important;
                        background-color: white !important;
                    }
                    .btn-outline:hover{
                        opacity: 0.6 !important;
                    }
                    button.btn:hover{
                        opacity: 0.8;
                    }
                    button.btn.small{
                        width: min-content;
                    }

                    header{
                        padding: 15px 0;
                        height: 60px;
                        display: flex;
                        justify-content: space-between;
                    }
                    header .right{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    header .right a{
                        padding: 20px;
                    }
                    header .logo-wrapper{
                        position: relative;
                    }
                    header .subtext{
                        text-transform: uppercase;
                        font-size: 10px;
                        position: absolute;
                        top: 10px;
                        letter-spacing: 4px;
                        color: gray;
                    }
                </style>
            </head>
            <body>
                <header>
                    <a class="logo-wrapper" href="http://172.105.36.209:3684/">
                        <h1>Aston Animal Sanctuary</h1>
                    </a>
                </header>
                <main>
                    <h2>Adoption status changed!</h2>
                    <hr width="200">
                    <h4>Your adoption request for ${animal} has been</h4>
                    <h1 style="font-size: 3rem;">${status}</h1>
                    <h4>By ${by} at ${moment()}</h4>
                    <a href=${adoption_link} style="text-decoration: underline;">View Adoption status &gt;</a>
                </main>
            </body>
            </html>

        `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

// sendMail('www.mohit2004@gmail.com', "ATTN: Changed Status of Animal Adoption", "Changed status of animal adoption", "Cookie Cookinie", "Approved", "Mohit Yadav", "http://localhost:3684/")