const OktaJwtVerifier = require("@okta/jwt-verifier");
const logger = require("./config/winston");

const dotenv = require("dotenv");
dotenv.config();

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.ISSUER,
  clientId: process.env.CLIENT_ID,
});

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      logger.error("User did not provide Authorization header");
      res.status(401).send("You must send an Authorization header");
      return;
    }

    const [authType, token] = authorization.trim().split(" ");
    if (authType !== "Bearer") {
      res.status(401).send("Expected a Bearer token");
      return;
    }

    const { claims } = await oktaJwtVerifier.verifyAccessToken(
      token,
      process.env.AUDIENCE
    );
    if (!claims.scp.includes(process.env.SCOPE)) {
      res.status(403).send("Could not verify the proper scope");
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
