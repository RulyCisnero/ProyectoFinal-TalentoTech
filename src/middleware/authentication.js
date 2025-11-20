import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret_key = "saldkj289sad21ml"//process.env.JWT_SECRET_KEY;

// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Token no enviado" });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(400).json({ message: "Formato de token inválido" });
  }

  const token = partes[1];
  //const token = req.headers['authorization'].split(" ")[1];
  /*  if (!token)
     return res.sendStatus(401);
   jwt.verify(token, secret_key, (err) => {
     if (err)
       return res.sendStatus(403);
     next();
   }); */
  jwt.verify(token, secret_key, (err) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    next();
  });
}