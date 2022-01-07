import jwt  from 'express-jwt';
import jwks from 'jwks-rsa';
import env  from './processEnv';

var requireAuthentication = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: env.get('JWKS_URI'),
    }),
    audience: env.get('AUDIENCE'),
    issuer: env.get('ISSUER'),
    algorithms: ['RS256']
});

export default requireAuthentication;