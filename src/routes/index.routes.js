const express = require('express');
const router = express.Router();
const { unlink } = require('fs-extra');

const Image = require('../models/Image');

// importando cloudinary
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// api de nuestra app
router.get('/api/allimages', async(req, res) => {
    const allImages = await Image.find();
    res.json(allImages);
});

// home route
router.get('/images', async(req, res) => {
    const allImages = await Image.find();
    res.render('images', { allImages });
});

//image view
router.get('/images/view/:id', async(req, res) => {
    const image = await Image.findById(req.params.id);
    res.render('image', { image });
});

//mostrando el formulario, pero también las imagene que ya tenemos
router.get('/images/add', async(req, res) => {
    const allImages = await Image.find();
    res.render('image_form', { allImages });
});

// post route
router.post('/images/add', async(req, res) => {
    const { title, description } = req.body; // extrayendo los datos del request
    const imageCloud = await cloudinary.v2.uploader.upload(req.file.path); // subiendo la img a cloudinary
    const newPhoto = new Image({
        title,
        description,
        imageURL: imageCloud.url,
        imagePublic_id: imageCloud.public_id
    });
    await newPhoto.save(); // gardando en la bd
    await unlink(req.file.path); // eliminando la imgn en el server local
    res.redirect('/images');
});

// image delete
router.get('/images/delete/:id', async(req, res) => {
    const imageDeleted = await Image.findByIdAndDelete(req.params.id); // elimina el objeto con e id recibido 
    const imageDeletedCloud = await cloudinary.v2.uploader.destroy(imageDeleted.imagePublic_id); // eliminando la imgn de cloudinary
    console.log(imageDeletedCloud);
    res.redirect('/images/add');
});


module.exports = router;