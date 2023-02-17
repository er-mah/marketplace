const {
    User
} = require("../models").mah;
export const uploadAgencyImages = (req, res) => {
    const { profileImage, bannerImage } = req.files;
    const { id } = req.params;
    const imageData = {};
    if (profileImage) {
        imageData.profileImage = profileImage[0].filename;
    }
    if (bannerImage) {
        imageData.bannerImage = bannerImage[0].filename;
    }
    User.findById(id).then((user) => {
        if (!user) {
            res
                .status(400)
                .send(ResponseObj('error', 'No existe un usuario con ese id.'));
        }
        user
            .update(imageData)
            .then(() => {
                res.status(200).send({
                    status: 'ok',
                    message: 'Cambios guardados con éxito.',
                });
            })
            .catch((e) => {
                console.log(e);
                res.status(400).send({
                    status: 'error',
                    e,
                });
            });
    });
};