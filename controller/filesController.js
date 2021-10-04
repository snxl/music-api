import FilesServices from '../services/filesServices.js';

export default class Files {
    static async insertSong(req, res) {
        const serviceResponse = await FilesServices.store(req.body, req.file, req.userAuth);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async detroySong(req, res) {
        const serviceResponse = await FilesServices.destroy(req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async getPrivaeSong(req, res) {
        const serviceResponse = await FilesServices.getPrivateSong(req.params.id, req.userAuth.id);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async getPublicSongs(req, res) {
        const serviceResponse = await FilesServices.getPublicSong(req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }

    static async updatedSong(req, res) {
        const serviceResponse = await FilesServices.updatedFile(req.body, req.params.id);

        return serviceResponse.status === 'OK'
            ? res.status(201).json(serviceResponse)
            : res.status(400).json(serviceResponse);
    }
}
