import { generateToken } from "../data/tokentest.js";

export const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (email === "test@gmail.com" && password === "123456") {
            const user = { email: email, id: "123" }
            const token = await generateToken(user);
            return res.status(200).json({ message: "Login Exitoso", token })
            //res.json({ token });
        } else {
            return res.status(401).json({ message: "Credenciales Invalidas" })
        }
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ message: "Error interno en login" });
    }

}