import handlebars from "handlebars";
export const dynamicEmailHtmlUtils = {
  generateVerificationEmailHtml: () => {
    return handlebars.compile(`<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 400;
          src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
              format("woff");
        }
        @font-face {
          font-family: "Source Sans Pro";
          font-style: normal;
          font-weight: 700;
          src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
            url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
              format("woff");
        }
      }
      /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      /**
       * Remove extra space added to tables and cells in Outlook.
       */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      /**
       * Better fluid images in Internet Explorer.
       */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /**
       * Remove blue links for iOS devices.
       */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      /**
       * Fix centering issues in Android 4.4.
       */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
       * Collapse table borders to avoid space between cells.
       */
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #174247;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
    </style>
  </head>
  <body style="background-color: #326f78">
    <!-- start preheader -->
    <div
      class="preheader"
      style="
        display: none;
        max-width: 0;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        line-height: 1px;
        color: #fff;
        opacity: 0;
      "
    >{{text}}
    </div>
    <!-- end preheader -->

    <!-- start body -->
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      <!--
      start
      hero
      --
    >
      <tr>
        <td align="center" bgcolor="#326f78">
          <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px; margin: 36px 0px 0px 0px"
          >
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 36px 24px 0;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  border-top: 3px solid #d4dadf;
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 32px;
                    font-weight: 700;
                    letter-spacing: -1px;
                    line-height: 48px;
                  "
                >
                  Confirma tu cuenta en TechMo
                </h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
        </td>
      </tr>
      <!-- end hero -->

      <!-- start copy block -->
      <tr>
        <td align="center" bgcolor="#326f78">
          <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <!-- start name -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px 24px 0px 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  ¡Hola, {{user.first_name}}&nbsp;{{user.last_name}}!
                </p>
              </td>
            </tr>
            <!-- end copy -->

            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  Presiona el botón de abajo para confirmar tu dirección de
                  correo electrónico. Si no creaste una cuenta con
                  <a href="https://techmo.global">TechMo</a>, puedes desestimar
                  este correo electrónico.
                </p>
              </td>
            </tr>
            <!-- end copy -->

            <!-- start button -->
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td
                            align="center"
                            bgcolor="#174247"
                            style="border-radius: 6px"
                          >
                            <a
                              href="{{verificationUrl}}"
                              target="_blank"
                              style="
                                display: inline-block;
                                padding: 16px 36px;
                                font-family: 'Source Sans Pro', Helvetica, Arial,
                                  sans-serif;
                                font-size: 16px;
                                color: #ffffff;
                                text-decoration: none;
                                border-radius: 6px;
                              "
                              >Confirmar mi cuenta</a
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->

            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  Si el botón no funciona, copia y pega el siguiente enlace en
                  tu navegador:
                </p>
                <p style="margin: 0">
                  <a href="{{verificationUrl}}" target="_blank"
                    >{{verificationUrl}}</a
                  >
                </p>
              </td>
            </tr>
            <!-- end copy -->

            <!-- start copy -->
            <tr>
              <td
                align="left"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 16px;
                  line-height: 24px;
                "
              >
                <p style="margin: 0">
                  Atentamente,<br />
                  Equipo de TechMo
                </p>
              </td>
            </tr>
            <tr>
              <td
                align="center"
                valign="top"
                bgcolor="#ffffff"
                style="
                  padding: 0px 0px 36px 0px;
                  border-bottom: 3px solid #d4dadf;
                "
              >
                <a
                  href="https://techmo.global"
                  target="_blank"
                  style="display: inline-block"
                >
                  <img
                    src="https://i-static.techmo.global/uploads/techmo-small.svg"
                    alt="Logo"
                    border="0"
                    width="48"
                    style="
                      display: block;
                      width: 48px;
                      max-width: 48px;
                      min-width: 48px;
                    "
                  />
                </a>
              </td>
            </tr>

            <!-- end copy -->
          </table>
          <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
        </td>
      </tr>
      <!-- end copy block -->

      <!-- start footer -->
      <tr>
        <td align="center" bgcolor="#326f78" style="padding: 24px">
          <!--[if (gte mso 9)|(IE)]>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
          <td align="center" valign="top" width="600">
      <![endif]-->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <!-- start permission -->
            <tr>
              <td
                align="center"
                bgcolor="#326f78"
                style="
                  padding: 12px 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  line-height: 20px;
                  color: #ffffff;
                "
              >
                <p style="margin: 0">
                  Recibiste este correo electrónico porque recibimos una
                  solicitud de tipo {{typeOfAction}} con tu correo electrónico.
                  Si no solicitaste {{typeOfAction}}, puedes eliminar este
                  correo electrónico de forma segura.
                </p>
              </td>
            </tr>
            <!-- end permission -->
          </table>
          <!--[if (gte mso 9)|(IE)]>
      </td>
      </tr>
      </table>
      <![endif]-->
        </td>
      </tr>
      <!-- end footer -->
    </table>
    <!-- end body -->
  </body>
</html>`);
  },
};

export const dynamicPlainTextEmailUtils = {
  generateVerificationEmailPlainText: (data) => {
    return `
      ¡Hola, ${data.user.first_name + " " + data.user.last_name}! 
      
      Estás a solo un paso de unirte a TechMo. Por favor, confirma tu cuenta haciendo clic en este link: ${
        data.verificationUrl
      }
      
      Gracias por unirte a TechMo. ¡Esperamos que disfrutes la experiencia!
      
      El equipo de TechMo
          `;
  },
};
