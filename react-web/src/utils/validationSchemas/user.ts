import * as Yup from "yup";

// AdditionalInfo validation schema defines the form validation rules in AddAdditionalInfoUserForm

export const AdditionalInfoSchema = Yup.object().shape({
  address: Yup.string().max(50).required("Este campo es requerido"),
  phone: Yup.string()
    .matches(/^\d{10}$/i, "El número de teléfono no es válido")
    .required("El teléfono es requerido"),
  is_agency_representative: Yup.boolean().required("Este campo es requerido"),
  dni: Yup.string()
    .matches(/^\d{8}$/i, "El número de DNI no es válido")
    .required("El DNI es requerido"),
  agency_id: Yup.number().required("La agencia es requerida"),
  zip_code: Yup.string().required("El código postal es requerido"),
  province: Yup.number().required("La provincia es requerida"),
  department: Yup.number().required("El departamento es requerido"),
  locality: Yup.number().required("La localidad es requerida"),
});
