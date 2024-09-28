const express = require('express');
const mongoose = require('mongoose');

//nasn3 router mte3y
const router= express.Router();

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
//parametre globale bch njm nsajel esm taswyra fy base des données
filename = '';
//bch njmou 3an tari9 les requets nsobou les images mte3na f dossier
const mystorage = multer.diskStorage({
    destination : './uploads',//hetha dossier li bch n7ott fyh tsawer
    filename: (req , file , redirect)=>{
        let date = Date.now(); //esm l file mta3na 5trnah b date bch kol taswyra tkoun mo5talfa 3la lo5ra
        let fl = date +'.'+ file.mimetype.split('/')[1]; //date mta3 taw.jpg par exepmle(extention)
        redirect(null,fl);//bch tsajel lesm mta3 taswyra f dossier
        filename = fl;
    }
})
//nasn3ou l middle mte3na
const upload = multer({storage : mystorage})

router.post('/register',upload.any('Image'), (req,res)=>{
    console.log('Files uploaded:', req.files); // Vérifiez les fichiers uploadés
    console.log('Body data:', req.body); // Vérifiez les données du formulaire
    console.log('Filename used:', filename); // Vérifiez le nom du fichier utilisé
    data = req.body;
    us= new User(data);
    us.Image = filename;
    salt = bcrypt.genSaltSync(10);//clé bch ncrypty byh (  10:  10 caractéres aleatoires)
    us.Password = bcrypt.hashSync(data.Password, salt)
    us.save()
    .then(
        (savedus)=>{
            filename='';
            res.status(200).send(savedus)
        }
    )
    .catch(
        (err)=>{
            console.error('Error saving user:', err); // Affiche l'erreur lors de la sauvegarde
            res.status(200).send(err)

        }
    )

})
router.post('/login', (req, res) => {
    let data = req.body;
    console.log('Login data received:', data);

    User.findOne({ Email: data.Email })
    .then((us) => {
        if (!us) {
            console.log('User not found');
            return res.status(400).send('User not found');
        }
        console.log('User found:', us);

        let valid = bcrypt.compareSync(data.Password, us.Password);
        if (!valid) {
            console.log('Password not valid');
            return res.status(401).send('Email or password not valid');
        } else {
            // Définissez le payload ici
            let payload = {
                _id: us._id,
                email: us.Email,
                fullname: us.Name + ' ' + us.LastName,
            };

            // Générez le token JWT
            let token = jwt.sign(payload, '132819821111');
            console.log('Login successful, token generated:', token);
            return res.status(200).send({ myToken: token });
        }
    })
    .catch((err) => {
        console.error('Error during login:', err);
        res.status(500).send(err);
    });
});


router.get('/all', (req,res)=>{
    User.find({}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (users)=>{
            res.status(200).send(users)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})
router.get('/getbyid/:id', (req,res)=>{
    let id = req.params.id;
    console.log('Received ID:', id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }
    User.findOne({_id:id}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (user)=>{
            res.status(200).send(user)
        }
    )
    .catch(
        (err)=>{
            console.error('Error finding user:', err);
            res.status(200).send(err)
        }
    )
})
router.delete('/supprimer/:id', (req,res)=>{
    let id = req.params.id;
    User.findByIdAndDelete({_id:id}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (user)=>{
            res.status(200).send(user)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})
router.put('/update/:id', (req,res)=>{
    
})


module.exports = router;

//ba3d l upload namlou "npm i bcrypt" ta3tyna fonction 7athra t3awena 3al cryptage mta3passwoerd mte3na 