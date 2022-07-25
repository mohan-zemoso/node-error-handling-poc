const Patient = require("../models/patient");

const getPatients = (req, res, next) => {
  req.user
    .getPatients()
    .then((patients) => {
      res.send(patients);
    })
    .catch((err) => {
      const error = Error(err);
      return next(error + ": Couldn't get patients");
    });
};

const getPatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      patient === null
        ? res
            .status(500)
            .send(`Patient with id-${req.params.patientId} not found`)
        : res.send(patient);
    })
    .catch((err) => {
      const error = Error(err);
      return next(error + ": Couldn't get patient");
    });
};

const postPatient = (req, res, next) => {
  req.user
    .createPatient({
      name: req.body.name,
    })
    .then(() => {
      res.send("Patient has been added");
    })
    .catch((err) => {
      const error = Error(err);
      return next(error + ": Couldn't add patient");
    });
};

const updatePatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      patient.name = req.body.name;
      return patient.save();
    })
    .then(() => {
      res.send(`Patient with id-${req.params.patientId} has been updated`);
    })

    .catch((err) => {
      const error = Error(err);
      return next(error + ": Couldn't update patient");
    });
};

const deletePatient = (req, res, next) => {
  Patient.findByPk(req.params.patientId)
    .then((patient) => {
      return patient.destroy();
    })
    .then(() => {
      res.send(`Patient with id-${req.params.patientId} has been deleted`);
    })
    .catch((err) => {
      const error = Error(err);
      return next(error + ": Couldn't delete patient");
    });
};

module.exports = {
  postPatient: postPatient,
  getPatients: getPatients,
  getPatient: getPatient,
  updatePatient: updatePatient,
  deletePatient: deletePatient,
};
