import { 
    describe,
    test,
    jest,
    expect,
} from "@jest/globals"

import AdminController from "../../controller/admin.js"
import UserController from "../../controller/userController.js"
import Files from "../../controller/filesController.js"

import ServiceAdmin from "../../services/adminServices.js"
import ServiceUser from "../../services/userServices.js"
import ServiceFiles from "../../services/filesServices.js"


describe('#Suit tests controllers', ()=>{
    const defaultParams = {
        mockRequest: () => {
            const req = {};
            req.body = jest.fn().mockReturnValue(req);
            req.headers = jest.fn().mockReturnValue(req)
            req.params = jest.fn().mockReturnValue(req);
            req.query = jest.fn().mockReturnValue(req);
            req.userAuth = jest.fn().mockReturnValue(req);
            req.file = jest.fn().mockReturnValue(req);
            return req;
        },
    
        mockResponse: () => {
            const res = {};
            res.send = jest.fn().mockReturnValue(res);
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
        },
        mockNext: () => jest.fn(),
    }
    describe('#AdminController test', ()=>{
        test('toProvider controller test', async () => {
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceAdmin, ServiceAdmin.userToProvider.name).mockResolvedValueOnce({
                status:'OK'
            })

            await AdminController.toProvider(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            jest.spyOn(ServiceAdmin, 'userToProvider').mockReturnValueOnce({
                status:'ERR'
            })

            await AdminController.toProvider(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('deleteProfile controller test', async () => {
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceAdmin, 'deleteUser').mockResolvedValueOnce({status:'OK'})

            await AdminController.deleteProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            jest.spyOn(ServiceAdmin, 'deleteUser').mockResolvedValueOnce({status:'ERR'})

            await AdminController.deleteProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('deleteSong controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceAdmin, 'destroySong').mockResolvedValueOnce({status:'OK'})

            await AdminController.deleteSong(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})
            
            jest.spyOn(ServiceAdmin, 'destroySong').mockResolvedValueOnce({status:'ERR'})

            await AdminController.deleteSong(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('statusHandler controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceAdmin, 'statusUpdate').mockResolvedValueOnce({status:'OK'})

            await AdminController.statusHandler(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            jest.spyOn(ServiceAdmin, 'statusUpdate').mockResolvedValueOnce({status:'ERR'})

            await AdminController.statusHandler(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })
    })

    describe('#UserController test', ()=>{
        test('register controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceUser, 'store').mockResolvedValueOnce({status:'OK'})

            await UserController.register(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'store').mockResolvedValueOnce({status:'ERR'})

            await UserController.register(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('getProfile controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceUser, 'findProfileWithToken').mockResolvedValueOnce({status:'OK'})

            await UserController.getProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'findProfileWithToken').mockResolvedValueOnce({status:'ERR'})

            await UserController.getProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('destroyProfile controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceUser, 'destroy').mockResolvedValueOnce({status:'OK'})

            await UserController.destroyProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'destroy').mockResolvedValueOnce({status:'ERR'})

            await UserController.destroyProfile(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('loginUser controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceUser, 'login').mockResolvedValueOnce({status:'OK'})

            await UserController.loginUser(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'login').mockResolvedValueOnce({status:'ERR'})

            await UserController.loginUser(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('updatedUser controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            req.file = {}

            jest.spyOn(ServiceUser, 'update').mockResolvedValueOnce({status:'OK'})

            await UserController.updatedUser(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'update').mockResolvedValueOnce({status:'ERR'})

            await UserController.updatedUser(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('getAll controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceUser, 'allUser').mockResolvedValueOnce({status:'OK'})

            await UserController.getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceUser, 'allUser').mockResolvedValueOnce({status:'ERR'})

            await UserController.getAll(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })
    })

    describe('#FilesController test', ()=>{
        test('insertSong controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceFiles, 'store').mockResolvedValueOnce({status:'OK'})

            await Files.insertSong(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceFiles, 'store').mockResolvedValueOnce({status:'ERR'})

            await Files.insertSong(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('detroySong controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceFiles, 'destroy').mockResolvedValueOnce({status:'OK'})

            await Files.detroySong(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceFiles, 'destroy').mockResolvedValueOnce({status:'ERR'})

            await Files.detroySong(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('getPrivaeSong controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceFiles, 'getPrivateSong').mockResolvedValueOnce({status:'OK'})

            await Files.getPrivaeSong(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceFiles, 'getPrivateSong').mockResolvedValueOnce({status:'ERR'})

            await Files.getPrivaeSong(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('getPublicSongs controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceFiles, 'getPublicSong').mockResolvedValueOnce({status:'OK'})

            await Files.getPublicSongs(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceFiles, 'getPublicSong').mockResolvedValueOnce({status:'ERR'})

            await Files.getPublicSongs(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })

        test('updatedSong controller test', async ()=>{
            const params = {
                ...defaultParams
            }

            const req = params.mockRequest()
            const res = params.mockResponse()

            jest.spyOn(ServiceFiles, 'updatedFile').mockResolvedValueOnce({status:'OK'})

            await Files.updatedSong(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({status:'OK'})

            
            jest.spyOn(ServiceFiles, 'updatedFile').mockResolvedValueOnce({status:'ERR'})

            await Files.updatedSong(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({status:'ERR'})
        })
    })
})