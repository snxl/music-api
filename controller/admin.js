import AdminServices from '../services/adminServices.js';

export default class AdminController {
    static async toProvider(req, res) {
        const serviceResponse = await AdminServices.userToProvider(req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async deleteProfile(req, res) {
        const serviceResponse = await AdminServices.deleteUser(req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async deleteSong(req, res) {
        const serviceResponse = await AdminServices.destroySong(req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async statusHandler(req, res) {
        const serviceResponse = await AdminServices.statusUpdate(req.params.id, req.validateStatus);
        console.log(serviceResponse);
        return serviceResponse.status === 'OK'
            ? res.status(200).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }
}
