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

    static async deleteMusic() {

    }

    static async deleteAlbum() {

    }
}
