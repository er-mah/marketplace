import * as Yup from "yup";

// Login validation schema that defines the form validation rules
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este no es el formato de un email valido")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .label("first_name")
    .matches(/^[a-zA-Z]*$/, "El nombre debe contener solo letras")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no puede tener más de 30 caracteres")
    .required("El nombre es obligatorio"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]*$/, "El apellido debe contener solo letras")
    .min(3, "El apellido debe tener al menos 3 caracteres")
    .max(30, "El apellido no puede tener más de 30 caracteres")
    .required("El apellido es obligatorio")
    .label("last_name"),
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio")
    .label("email"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña no puede tener más de 30 caracteres")
    .matches(
      new RegExp(
        `(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}`
      ),
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@, $, !, %, *, #, ? y &)"
    )
    .required("La contraseña es obligatoria")
    .label("password"),
  repeat_password: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Las contraseñas deben coincidir"
  ),
});

export const RecoverPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Este no es el formato de un email valido")
    .required("Este campo es requerido"),
});

export const SetNewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(30, "La contraseña no puede tener más de 30 caracteres")
    .matches(
      new RegExp(
        `(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}`
      ),
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@, $, !, %, *, #, ? y &)"
    )
    .required("La contraseña es obligatoria")
    .label("password"),
  repeat_password: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Las contraseñas deben coincidir"
  ),
});
