import * as fs from "fs";
const sharp = require('sharp');

const {
    Sliders
} = require('../../models/index.js').mah;

const optimizeImage = file => sharp(`./images/${file.filename}`)
    .resize(752, 500)
    .toFile(`./images/opt-${file.filename}`)
    .then(() => removeOldFile(file));

const removeOldFile = (file) => {
    fs.unlinkSync(`./images/${file.filename}`);
};

export const uploadSliders = (req, res) => {
    let { slider, sliderResponsive } = req.files;
    slider = slider[0];
    sliderResponsive = sliderResponsive[0];
    const { sliderNumber } = req.body;
    const sliderName = `slider${sliderNumber}`;
    optimizeImage(slider)
        .then(() => Sliders.upsert({
            id: sliderNumber,
            name: sliderName,
            image: `opt-${slider.filename}`,
        }))
        .then(() =>
            optimizeImage(sliderResponsive))
        .then(() => {
            const id = parseInt(sliderNumber, 10) + 1;
            return Sliders.upsert({
                id,
                name: sliderName,
                image: `opt-${sliderResponsive.filename}`,
            });
        })
        .then((result) => {
            res.status(200).send({ status: 'ok', message: 'Sliders actualizados con éxito', data: result });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ status: 'error', message: 'No se han podido actualizar los sliders', data: err });
        });
};
export const getSliders = (req, res) => {
    Sliders.findAll()
        .then((result) => {
            res.status(200).send({ status: 'ok', data: result });
        })
        .catch((err) => {
            res.status(400).send({ status: 'error', message: 'Hubo un problema, intente mas tarde.', data: err });
        });
};
export const deleteSlider = (req, res) => {
    const sliderNumber = req.params.id;
    Sliders.findById(sliderNumber)
        .then(sld => sld.destroy()
            .then(() => res.status(200).send({ status: 'ok' }))
            .catch(err => res.status(400).send({ status: 'error', message: err.message })))
        .catch(err => res.status(400).send({ status: 'error', message: err.message }));
};
