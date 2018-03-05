const moment = require('moment');

const host = 'https://beta.miautohoy.com';

const generateMailAgenciaoParticular = (data, tipoMail) => {
  let saludo = '';
  let intro = '';
  let body = '';
  switch (tipoMail) {
    case 'newAccount': {
      saludo = 'Bienvenido';
      intro = `Bienvenido ${data.name} a Mi auto hoy!`;
      body = `Ganá dinero vendiendo tus autos!<br /><br />

        Gestioná tus publicaciones desde tu Panel. <br />
        En www.miautohoy.com tenés:<br /><br />
        <ul>
        <li>Publicaciones gratis ilimitadas</li>
        <li>Tiempo de publicación: 60 días.</li>
        <li>Posibilidad de compra garantizada si transcurridos los 60 días no vendió su auto.</li>
        <li>Panel de Control de autos publicados.</li>
        <li>Chat con los interesados</li>
        <li>Anuncios destacados ilimitados</li>
        <li>Publicaciones en redes sociales y fan page de miautohoy.com</li>
        </ul>
        `;
      break; }
    case 'recoverPass': {
      saludo = 'Olvidaste tu contraseña';
      intro = `Hola ${data.name}`;
      body = `Olvidaste tu contraseña, no te preocupes es muy fácil recuperarla.<br />
      Haz click en el siguiente <a href="${host}/recoverpass">link</a> y podrás podrás reestablecer tu contraseña.
      `;
      break;
    }
    case 'newCT': {
      saludo = 'Nueva Consulta';
      intro = 'Tienes una consulta';
      body = `${data.name} quiere contactarse con vos. Tenés una pregunta en tu publicación ${data.brand} - ${data.modelName}. <br />
        Para responder haz click en el siguiente <a href="${host}/inbox?ct_id=${data.ct_id}">link</a> 
        `;
      break;
    }
    case 'newPublication': {
      saludo = `Hola ${data.name}`;
      intro = 'Tu publicación se encuentra en estado Pendiente';
      body = `El Equipo de Mi Auto Hoy está verificando tu publicación ${data.brand} - ${data.modelName}. Si esta es correcta a la brevedad será publicada y visible para todos.`;
      break;
    }
    case 'approvedPublication': {
      saludo = `Hola ${data.name}`;
      intro = `<strong>¡Felicitaciones!</strong> tu vehículo ${data.brand} - ${data.modelName} ha sido publicado.`;
      body = 'Te avisaremos cuando un comprador quiera comunicarse con vos mediante una pregunta.<br /> Es importante que estés atento a dar tu respuesta para alcanzar una compra.';
      break;
    }
    case 'disapprovedPublication': {
      saludo = `Hola ${data.name}`;
      intro = `Lamentablemente tu publicación: ${data.brand} - ${data.modelName} ha sido rechazada.`;
      body = `La publicación de ${data.brand} ha sido rechazada y pasada a estado Suspendida por el siguiente motivo: <br> <strong>${data.reason}</strong>`;
      break;
    }
    default: return '';
  }
  return `
  <html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> 
<style>
.text-block{
    position: relative;
    left: 90px;
    width: 420px;
}
.button-style {
border-radius: 3px;
border:none;
background-color: #E40019;
height: 19px;
width: 139.5px;
color: #FFFFFF;
font-size: 14px;
font-weight: 900;
letter-spacing: 1px;
line-height: 19px;
text-align: center;
position: relative;
left: 35px
}
.mas-autos {
display: inline;   
color: #2A3B59;
font-family: Lato;
font-size: 16px;
font-weight: bold;
line-height: 22px;
}
.footer{
    position:relative;
    left:80px; 
}

</style>

<body style="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box; width:600px; font-family:'Lato', sans-serif; ">
    <div style="background-color: #EEEEEE; width:100%; height:80px">
        <img src="https://api.miautohoy.com/logo" style="display: block;margin-left: auto;margin-right: auto;height: 70px; width:auto;"> 
    </div>
    <div style="height:50px;"></div>
    <div class="text-block">
    <h4>${saludo}</h4>
    <h2>${intro}</h2>
    <p>${body}</p>
    <div style="height:50px;"></div>    
    <h5>Gracias por confiar en Mi auto hoy!</h5>
    <a href="www.miautohoy.com">www.miautohoy.com</a><br/>
    </div>
    <div style="height:120px;"></div> 
    <hr style="box-sizing: border-box; height: 2px; width: 432.01px; border: 1px solid #979797;" /> 
    <div style="height:17;"></div>
    <div class="footer">
    <p class='mas-autos'>¿Tienes más autos por vender?</p>
    <form style="display: inline;" action="${host}/createPublication">
        <input style="width:178px; height:50px"type="submit" class="button-style" value="PUBLICÁ GRATIS" />
    </form>
    </div>          
</body>

</html>`;
};
const generateSinRegistro = (data, tipoMail) => {
  let saludo = '';
  let intro = '';
  let body = '';
  switch (tipoMail) {
    case 'answerMessage': {
      saludo = `Hola ${data.name}`;
      intro = 'Tienes una respuesta';
      body = `Tenés una respuesta a tu consulta sobre el vehículo ${data.brand} - ${data.modelName}.
            Para ver tu respuesta haz click en el siguiente link <link>`;
      break;
    }
    case 'newPublication': {
      saludo = 'Bienvenido';
      intro = `Bienvenido ${data.name} a Mi auto hoy`;
      body = `Vendé tu auto ya! <br /><br />
            En www.miautohoy.com tenés:<br /><br /> 
            <ul>
            <li>Una publicación gratis</li>
            <li>Tiempo de la publicación: 60 días.</li>
            <li>Contacto con los interesados solo por email.</li>
            </ul><br /> El Equipo de Mi Auto Hoy está verificando tu publicación:<br />
            <strong>${data.brand} - ${data.modelName}</strong>.<br/>
            Si esta es correcta a la brevedad será publicada y visible para todos.`;
      break;
    }
    case 'newCT': {
      saludo = 'Nueva consulta';
      intro = 'Tienes una consulta';
      body = `El usuario ${data.name} con mail: ${data.email} realizó una consulta en la publicación ${data.brand} - ${data.modelName}:<br /> 
            <h5>${data.content}</h5><br /><br />
            <p>Registrate en <strong> Mi auto hoy </strong> y podras disfrutar el beneficio de poder administrar y llevar cuenta de todas las consultas que recibas.</p>
            `;
      break;
    }
    case 'approvedPublication': {
      saludo = `Hola ${data.name}`;
      intro = `<strong>¡Felicitaciones!</strong> tu vehículo ${data.brand} - ${data.modelName} ha sido publicado.`;
      body = 'Te avisaremos cuando un comprador quiera comunicarse con vos mediante una pregunta.<br /> Es importante que estés atento a dar tu respuesta para alcanzar una compra. <br /> <p>Registrate en <strong> Mi auto hoy </strong> y podras disfrutar el beneficio de poder administrar y llevar cuenta de todas las consultas que recibas.</p>';
      break;
    }
    case 'disapprovedPublication': {
      saludo = `Hola ${data.name}`;
      intro = `Lamentablemente tu publicación: ${data.brand} - ${data.modelName} ha sido rechazada.`;
      body = `La publicación de ${data.brand} ha sido rechazada y eliminada por el siguiente motivo: <br> <strong>${data.reason}</strong>`;
      break;
    }
    default: { return ''; }
  }
  return `
  <html>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> 
  <style>
  .text-block{
      position: relative;
      left: 90px;
      width: 420px;
  }
  .button-style {
      border-radius: 3px;
      border:none;
      background-color: #E40019;
      height: 19px;
      width: 139.5px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 1px;
      line-height: 19px;
      text-align: center;
      position: relative;
      left: 35px
  }
  .mas-autos {
      display: inline;   
      color: #2A3B59;
      font-family: Lato;
      font-size: 16px;
      font-weight: bold;
      line-height: 22px;
  }
  .footer{
      position:relative;
      left:80px; 
  }
  
  </style>
  
  <body style="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box; width:600px; font-family:'Lato', sans-serif; ">
      <div style="background-color: #EEEEEE; width:100%; height:80px">
          <img src="https://api.miautohoy.com/logo" style="display: block;margin-left: auto;margin-right: auto;height: 70px; width:auto;"> 
      </div>
      <div style="height:50px;"></div>
      <div class="text-block">
      <h4>${saludo}</h4>
      <h2>${intro}</h2>
      <p>${body}</p>
      <div style="height:50px;"></div>    
      <h5>Gracias por confiar en Mi auto hoy!</h5>
      <a href="www.miautohoy.com">www.miautohoy.com</a><br/>
      </div>
      <div style="height:120px;"></div> 
      <hr style="box-sizing: border-box; height: 2px; width: 432.01px; border: 1px solid #979797;" /> 
      <div style="height:17;"></div>
      <div class="footer">
      <p class='mas-autos'>¿Quieres cambiar tu auto?</p>
      <form style="display: inline;" action="${host}/pledgeCredits">
        <input style="width:206px; height:50px" type="submit" class="button-style" value="SOLICITÁ TU CRÉDITO" />
      </form>
      </div>          
  </body>
  </html>`;
};


module.exports = { generateMailAgenciaoParticular, generateSinRegistro };

