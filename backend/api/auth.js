const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    //validando email
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        //obter user por email
        const user = await app.db('users')
            .where({email: req.body.email})
            .first()

        if (!user) return res.status(400).send('Usuário não cadastrado!')

        //validar a senha
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Email ou senha invalido!')

        const now = Math.floor(Date.now() / 1000)

        //autenticação
        const payload ={
            id:user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //data de geração
            exp: now + (60 * 60 * 24 * 20) // data de expiração
        }

        //criando o token
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken =async (req, res) =>{
        const userData = req.body || null

        try {
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        } catch(e){
            //problema com o token
        }
        res.send(false)
    }

    return { signin, validateToken }
}