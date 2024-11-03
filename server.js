const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const fs = require('fs')

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail', 
    auth: {
      user: 'anthonyguerrero62@gmail.com', 
      pass: 'iwgtdzuwfvctujbw' 
    }
}));

const tempSource = fs.readFileSync('./handlebars/emailTemp.hbs', 'utf-8');
const temp = handlebars.compile(tempSource);

app.post('/submit-form', (req, res) => {
  const { email, firstName, lastName, phone, address, city, state, zip, year, message, add } = req.body;
  
  const emailData =  { 
    firstName: firstName, 
    lastName: lastName, 
    message: message, 
    phone: phone, 
    email: email, 
    address: address,
    city: city, 
    state: state, 
    zip: zip, 
    year: year, 
    add: add 
    }

    const content = temp(emailData)

  const mailOptions = {
    from: email,
    to: 'https.tony@yahoo.com',
    // to: 'acg.renovations.llc@gmail.com',
    subject: `New Request From ${firstName} ${lastName}`,
    html: content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
.
