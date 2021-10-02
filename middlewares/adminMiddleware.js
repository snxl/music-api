export default class AdminValidator {
    static providerValidate(req, res, next) {
        if (!Number(req.params.id)) {
            return res.status(400).json({
                status: 'ERR',
                description: 'id parameter must be a number',
            });
        }

        if (Number(req.params.id) === req.userAuth.id) {
            return res.status(400).json({
                status: 'ERR',
                description: 'The user must contain another id',
            });
        }

        if (req.userAuth.provider === false) {
            return res.status(403).json({
                status: 'ERR',
                description: 'User needs to be admin',
            });
        }

        next();
    }
}
