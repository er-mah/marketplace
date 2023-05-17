import * as Yup from "yup";

// AdditionalInfo validation schema defines the form validation rules in AddAdditionalInfoUserForm

export const CompleteAdditionalInfoSchema = Yup.object().shape({
  user_address: Yup.string().max(50).required("Este campo es requerido"),
  user_phone: Yup.string()
    .matches(/^\+?\d+$/i, "El número de teléfono no es válido")
    .required("El teléfono es requerido"),
  user_is_agency_representative: Yup.boolean().required("Este campo es requerido"),
  user_dni: Yup.string()
    .matches(/^\d{8}$/i, "El número de DNI no es válido")
    .required("El DNI es requerido"),
  user_zip_code: Yup.string().required("El código postal es requerido"),
  user_province_id: Yup.number().required("La provincia es requerida"),
  user_department_id: Yup.number().required("El departamento es requerido"),
  user_locality_id: Yup.number().required("La localidad es requerida"),

  user_agency_id: Yup.number().required("La agencia es requerida"),

  agency_name: Yup.string()
      .nullable()
      .required("El nombre de la agencia es requerido"),
  agency_phone: Yup.string().nullable().required("El teléfono es requerido"),
  agency_email: Yup.string()
      .nullable()
      .email("Formato inválido de email")
      .required("El correo electrónico es requerido"),

  agency_province_id: Yup.number().required("La provincia es requerida"),
  agency_department_id: Yup.number().required("El departamento es requerido"),
  agency_locality_id: Yup.number().required("La localidad es requerida"),
  agency_address: Yup.string().nullable().required("La dirección es requerida"),
});
export const OnlyUserAdditionalInfoSchema = Yup.object().shape({
  user_address: Yup.string().max(50).required("Este campo es requerido"),
  user_phone: Yup.string()
      .matches(/^\+?\d+$/i, "El número de teléfono no es válido")
      .required("El teléfono es requerido"),
  user_is_agency_representative: Yup.boolean().required("Este campo es requerido"),
  user_dni: Yup.string()
      .matches(/^\d{8}$/i, "El número de DNI no es válido")
      .required("El DNI es requerido"),
  user_zip_code: Yup.string().required("El código postal es requerido"),
  user_province_id: Yup.number().required("La provincia es requerida"),
  user_department_id: Yup.number().required("El departamento es requerido"),
  user_locality_id: Yup.number().required("La localidad es requerida"),
  user_agency_id: Yup.number().required("La agencia es requerida"),
});
