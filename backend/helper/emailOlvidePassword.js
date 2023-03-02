import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Restablecer contraseña",
    text: "Restablece tu contraseña ",
    html: ` <p> Hola <strong>${nombre}</strong> <br /> Haz olvidado tu contraseña?</p>
        <p>Sigue el siguiente enlace para restablecer tu contraseña:
        <a href='http://127.0.0.1:5173/olvide-password/${token}'>Restablecer contraseña/a>
        </p>
        
        <p>Si no creaste esta cuenta puedes eliminar este mensaje</p>
 
        `, // html body
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
