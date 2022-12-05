const { expressjwt: expressJwt } = require("express-jwt");

const authJwt = () =>{
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\api\/v1\/products(.*)/, methodes: ['GEt', 'OPTIONS']},
            {url: /\api\/v1\/categoies(.*)/, methodes: ['GEt', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}
async function isRevoked(req, payload, done){
    if(!payload.isAdmi){
        done(null, true)
    }

    done();
}

module.exports = authJwt;