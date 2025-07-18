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
      user: 'bilingualnatureacademy@gmail.com', 
      pass: 'xzxe bpma vlec zowy' 
    }
}));

const tempSource = fs.readFileSync('./handlebars/emailTemp.hbs', 'utf-8');
const temp = handlebars.compile(tempSource);

app.post('/submit-form', (req, res) => {
  const { 
        applicant,
        applicantL,

        studentName,
        studentLastName,
        studentGender,
        studentDOB,
        allergies,
        illnesses,
        medications,
        interests,
        
        guardianRelation,
        firstGuardianName, 
        firstGuardianLastName, 
        firstGuardianGender, 
        firstGuardianPhone,
        firstGuardianEmail,
        firstGuardianEmplr,

        emergencyName,
        emergencyLastName,
        emergencyPhone,
        emergencyEmail,

        optYes,
        optNo,

        unwelcomeName1,
        unwelcomeLastName1,
        unwelcomeName2,
        unwelcomeLastName2,
        unwelcomeName3,
        unwelcomeLastName3,

        guardianRelation2,
        secondGuardianName,
        secondGuardianLastName,
        secondGuardianGender,
        secondGuardianPhone,
        secondGuardianEmail,

        address, 
        city, 
        state, 
        zip, 
        hphone, 
        
        m1, 
        m2,
        m3,
    } = req.body;
  
    // const emailData =  { 
    //     applicant: applicant,
    //     applicantL: applicantL,
    //
    //     studentName: studentName, 
    //     studentLastName: studentLastName, 
    //     studentGender: studentGender, 
    //     studentDOB: studentDOB, 
    //     allergies: allergies, 
    //     illnesses: illnesses, 
    //     medications: medications, 
    //     interests: interests, 
    //
    //     guardianRelation: guardianRelation,
    //     firstGuardianName: firstGuardianName,
    //     firstGuardianLastName: firstGuardianLastName,
    //     firstGuardianGender: firstGuardianGender,
    //     firstGuardianPhone: firstGuardianPhone,
    //     firstGuardianEmail: firstGuardianEmail,
    //     firstGuardianEmplr: firstGuardianEmplr,
    //
    //     emergencyName: emergencyName,
    //     emergencyLastName: emergencyLastName,
    //     emergencyPhone: emergencyPhone,
    //     emergencyEmail: emergencyEmail,
    //
    //     optYes: optYes,
    //     optNo: optNo,
    //
    //     unwelcomeName1: unwelcomeName1,
    //     unwelcomeLastName1: unwelcomeLastName1,
    //     unwelcomeName2: unwelcomeName2,
    //     unwelcomeLastName2: unwelcomeLastName2,
    //     unwelcomeName3: unwelcomeName3,
    //     unwelcomeLastName3: unwelcomeLastName3,
    //
    //     guardianRelation2: guardianRelation2,
    //     secondGuardianName: secondGuardianName,
    //     secondGuardianLastName: secondGuardianLastName,
    //     secondGuardianGender: secondGuardianGender,
    //     secondGuardianPhone: secondGuardianPhone,
    //     secondGuardianEmail: secondGuardianEmail,
    //
    //     address: address,
    //     city: city, 
    //     state: state, 
    //     zip: zip, 
    //     hphone: hphone, 
    //
    //     m1: m1,
    //     m2: m2,
    //     m3: m3,
    // }

    const content = temp(req.body)

    const mailOptions = {
        from: firstGuardianEmail,
        to: 'info@bilingualnatureacademy.com',
        subject: `New Request From ${applicant} ${applicantL}`,
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
