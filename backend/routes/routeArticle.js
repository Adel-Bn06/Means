const express = require('express');


//nasn3 router mte3y
const router= express.Router();
//Importation de notre modele
const Article = require('../models/article');

//importer multer
const multer = require('multer');
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

router.post('/ajout',upload.any('Image'), (req,res)=>{
    console.log('Files uploaded:', req.files);
    console.log('Body data:', req.body);
    console.log('Filename used:', filename); 
    let data = req.body;//bch njib les données mte3y ml postman wala frontend
    let article= new Article(data);//bch njib l modéle mte3y w n3adylha e data li 5thitha ml postman
    article.Date = new Date();//article bch n3adilou date mta3 la7tha hathyka
    article.Image = filename; //bch n3adylou esm l file li 5demneh lfoug
    
    article.save()
    .then(
        (saved)=>{
            filename='';//bch nfar_ou l'esm
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})
router.get('/all', (req,res)=>{
    Article.find({}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (articles)=>{
            res.status(200).send(articles)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})
router.get('/getbyID/:id', (req,res)=>{
    let id = req.params.id;
    Article.findOne({_id:id}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (articles)=>{
            res.status(200).send(articles)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})
router.get('/getbyIDAuth/:id', (req,res)=>{
    let id = req.params.id;
    Article.findOne({IdAuth:id}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (articles)=>{
            res.status(200).send(articles)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
    
})
router.delete('/supprimer/:id', (req,res)=>{
    let id = req.params.id;
    Article.findByIdAndDelete({_id:id}) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (articles)=>{
            res.status(200).send(articles)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})
router.put('/update/:id',upload.any('Image'), (req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let article= new Article(data);//bch njib l modéle mte3y w n3adylha e data li 5thitha ml postman
    article.tags = data.Tags.split(',');
    if(filename.length>0){
        article.Image = filename;
    }
     
   
    Article.findByIdAndUpdate({_id:id}, data) // ma7tyna 7atta conditions 5tr nhbou njibouhom lkoll tsawr
    .then(
        (articles)=>{
            filename = '';
            res.status(200).send(articles)
        }
    )
    .catch(
        (err)=>{
            res.status(200).send(err)
        }
    )
})


// npm i multer gbl matbda 5tr bch njm n uploady images w files w ak jw donc a3ml cntrl C bch t9os serveur gbal







module.exports = router;