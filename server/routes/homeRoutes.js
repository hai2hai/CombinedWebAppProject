var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const jwksClient = require('jwks-rsa');
const app = express();
const cors = require("cors");
app.use(cors());

const issuer = 'https://localhost:5000'; 

const auth = jwt({
    secret: jwksClient.expressJwtSecret({
        cache: true,        // see https://github.com/auth0/node-jwks-rsa#caching
        rateLimit: true,    // see https://github.com/auth0/node-jwks-rsa#rate-limiting
        jwksRequestsPerMinute: 2,
        jwksUri: `${issuer}/.well-known/openid-configuration/jwks`
    }),

    audience: 'weatherapi',
    issuer: issuer,
    algorithms: ['RS256']
});

router
    .get('/', async (req, res) => {
        console.log(req);
        res.send("hello");
    });

//protected route
router
    .get('/test', auth, (req, res) => {
        console.log(req);
        res.send("test");
    })

module.exports = router;