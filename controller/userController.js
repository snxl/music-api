import UserServices from '../services/userServices.js';

export default class UserController {
    static async register(req, res) {
        const serviceResponse = await UserServices.store(req.body);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async getProfile(req, res) {
        const serviceResponse = await UserServices.findProfileWithToken(req.userAuth);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async destroyProfile(req, res) {
        const serviceResponse = await UserServices.destroy(req.userAuth);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async loginUser(req, res) {
        const serviceResponse = await UserServices.login(req.user);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async updatedUser(req, res) {
        const file = req.file || undefined;

        const serviceResponse = await UserServices.update(req.userAuth, file, req.body);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async getAll(req, res) {
        const { counter, page } = req.query;

        console.log(counter, page);

        if (counter && page) {
            counter * page - counter;
        }

        const serviceResponse = await UserServices.allUser(counter, page);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }
}
