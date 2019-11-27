module.exports = middleware => {
    return (req, res, next) => {
        if(req.user.admin){
            middleware(req, res, next)

        } else {
            res.status(401).send('Voce não tem permissão para executar essa ação!')
        }
    }
}