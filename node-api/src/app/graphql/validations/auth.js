import Joi from "joi";

export const AuthValidations = {
  registerSchema: () => {
    return Joi.object({
      first_name: Joi.string()
        .label("first_name")
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
          "string.base": "El nombre debe ser una cadena de texto",
          "string.empty": "El nombre no puede estar vacío",
          "string.min": "El nombre debe tener al menos {#limit} caracteres",
          "string.max": "El nombre no puede tener más de {#limit} caracteres",
          "any.required": "El nombre es obligatorio",
        }),
      last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
          "string.base": "El apellido debe ser una cadena de texto",
          "string.empty": "El apellido no puede estar vacío",
          "string.min": "El apellido debe tener al menos {#limit} caracteres",
          "string.max": "El apellido no puede tener más de {#limit} caracteres",
          "any.required": "El apellido es obligatorio",
        })
        .label("last_name"),

      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.base": "El correo electrónico debe ser una cadena de texto",
          "string.empty": "El correo electrónico no puede estar vacío",
          "string.email": "El correo electrónico no es válido",
          "any.required": "El correo electrónico es obligatorio",
        })
        .label("email"),
      password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .pattern(
          new RegExp(
            `(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}`
          )
        )
        .messages({
          "string.base": "La contraseña debe ser una cadena de texto",
          "string.empty": "La contraseña no puede estar vacía",
          "string.min": "La contraseña debe tener al menos {#limit} caracteres",
          "string.max":
            "La contraseña no puede tener más de {#limit} caracteres",
          "string.pattern.base":
            "Requisitos a cumplir: \n" +
            "- La contraseña debe tener al menos 8 caracteres de longitud y máximo 30 caracteres.\n" +
            "- La contraseña debe contener al menos una letra mayúscula y una letra minúscula.\n" +
            "- La contraseña debe contener al menos un dígito numérico.\n" +
            "- La contraseña debe contener al menos un carácter especial de los siguientes: @ $ ! % * # ? &.",
          "any.required": "La contraseña es obligatoria",
        })
        .label("password"),

      repeat_password: Joi.ref("password"),
    });
  },
  setNewPasswordSchema: () => {
    return Joi.object({
      password: Joi.string()
        .min(8)
        .max(30)
        .required()
        .pattern(
          new RegExp(
            `(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,30}`
          )
        )
        .messages({
          "string.base": "La contraseña debe ser una cadena de texto",
          "string.empty": "La contraseña no puede estar vacía",
          "string.min": "La contraseña debe tener al menos {#limit} caracteres",
          "string.max":
            "La contraseña no puede tener más de {#limit} caracteres",
          "string.pattern.base":
            "Requisitos a cumplir: \n" +
            "- La contraseña debe tener al menos 8 caracteres de longitud y máximo 30 caracteres.\n" +
            "- La contraseña debe contener al menos una letra mayúscula y una letra minúscula.\n" +
            "- La contraseña debe contener al menos un dígito numérico.\n" +
            "- La contraseña debe contener al menos un carácter especial de los siguientes: @ $ ! % * # ? &.",
          "any.required": "La contraseña es obligatoria",
        })
        .label("password"),

      repeat_password: Joi.ref("password"),
    });
  },
};
