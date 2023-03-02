import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "04ca8b41120da3",
      pass: "f85087902dcb0c",
    },
  });

  // Enviar email
  const info = await transport.sendMail({
    from: '"Software de ADMINISTRACION DE REPUESTOS" <adr@correo.com>',
    to: email,
    subject: "Comprueba tu cuenta ✔",
    text: "Comprueba tu cuenta ",
    html: ` <p> Hola <strong>${nombre}</strong> <br /> Comprueba tu cuenta</p>
        <p>Hace falta solo un paso para confirmar tu cuenta, haz click en el siguiente enlace: 
        <a href='http://127.0.0.1:5173/confirmar-cuenta/${token}'>Comprobar Cuenta</a>
        </p>
        
        <p>Si no creaste esta cuenta puedes eliminar este mensaje</p>
 
        `, // html body
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
