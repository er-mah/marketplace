import * as Yup from "yup";

export const CreatePublicationSchema = Yup.object().shape({
  vehicle_brand: Yup.string().required("Este campo es requerido"),
  vehicle_model: Yup.string().required("Este campo es requerido"),
  vehicle_year: Yup.string().required("Este campo es requerido"),
  vehicle_version: Yup.string().required("Este campo es requerido"),

  vehicle_state: Yup.string().required("Este campo es requerido"),
  vehicle_segment: Yup.string().required("Este campo es requerido"),
  kms: Yup.number().required("Este campo es requerido"),
  fuel: Yup.string().required("Este campo es requerido"),
  description: Yup.string().required("Este campo es requerido"),
  locality_id: Yup.string().required("Este campo es requerido"),
  currency: Yup.string().required("Este campo es requerido"),
  price: Yup.string().required("Este campo es requerido"),

  vehicle_comfort: Yup.object().shape({
    climatizer: Yup.boolean(),
    centralLocking: Yup.boolean(),
    multifunctionSteeringWheel: Yup.boolean(),
    cruiseControl: Yup.boolean(),
    airConditioning: Yup.boolean(),
    leatherUpholstery: Yup.boolean(),
    powerSteering: Yup.boolean(),
  }),
  vehicle_security: Yup.object().shape({
    stabilityControl: Yup.boolean(),
    tractionControl: Yup.boolean(),
    absBrakes: Yup.boolean(),
    fogLights: Yup.boolean(),
    rearCamera: Yup.boolean(),
    isofixSystem: Yup.boolean(),
    tirePressure: Yup.boolean(),
  }),
  vehicle_entertainment: Yup.object().shape({
    amFmRadio: Yup.boolean(),
    usbPort: Yup.boolean(),
    voiceCommand: Yup.boolean(),
    multifunctionDisplay: Yup.boolean(),
    bluetooth: Yup.boolean(),
    gps: Yup.boolean(),
    auxiliaryConnection: Yup.boolean(),
  }),
});
