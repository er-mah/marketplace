const {
  Provinces,
  Town
} = require("../../models/index.js").mah;

export const getProvinces = (req, res) =>
  Provinces.findAll()
    .then((provs) => {
      console.log(provs);
      res.send({ status: "ok", data: provs });
    })
    .catch((e) =>
      res.status(400).send({ status: "error", message: e.message })
    );

export const getTowns = (req, res) => {
  const province_id = req.params;
  return Town.findAll({ where: province_id })
    .then((towns) => res.send({ status: "ok", data: towns }))
    .catch((e) =>
      res.status(400).send({ status: "error", message: e.message })
    );
};
