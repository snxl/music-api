import { 
    describe,
    test,
    jest,
    expect,
    beforeAll
} from "@jest/globals"
import db from '../../database/models/index.js';
import Authenticator from "../../middlewares/auth.js"
import AdminValidator from "../../middlewares/adminMiddleware.js"
import DeleteMiddleware from "../../middlewares/middlewareDeleteSong.js"
import GetPublicSongMiddleware from "../../middlewares/middlewareGetPublicSong.js"
import ValidateLogin from "../../middlewares/middlewareLogin.js"

describe("#Route test suit", ()=>{

    const defaultParams = {
        mockRequest: () => {
            const req = {};
            req.body = jest.fn().mockReturnValue(req);
            req.headers = jest.fn().mockReturnValue(req)
            req.params = jest.fn().mockReturnValue(req);
            req.query = jest.fn().mockReturnValue(req);
            req.userAuth = jest.fn().mockReturnValue(req);
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

    describe("#User test suite", ()=>{
        test.todo("it should create user")

        test.todo("it should get profile data")
    
        test.todo("it should get profile data whit token")
    
        test.todo("it should delete profile")
    
        test.todo("it should update profile")
    })

    describe('#Middlewares test suit', ()=>{

        test('it should validate provider admin', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)
            
            await AdminValidator.providerValidate(req, res, next)

            expect(next).toHaveBeenCalled()
        })

        test('it should validate provider admin', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)
            
            await AdminValidator.providerValidate(req, res, next)

            expect(next).toHaveBeenCalled()

            req.params.id = null

            await AdminValidator.providerValidate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('it shold validate token', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.headers.authorization = `Bearer ${process.env.TOKEN_TEST}`
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce(true)
            
            await Authenticator.auth(req, res, next)

            expect(next).toHaveBeenCalled()

            req.headers.authorization = ''

            await Authenticator.auth(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({status: 'ERR', description: "Token not provided"})
            
            req.headers.authorization = `Bearer ${process.env.TOKEN_TEST}asdasdasdasd`

            jest.spyOn(db.User, 'findByPk').mockRejectedValue(false)

            await Authenticator.auth(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({status: 'ERR', description: "Token not provided"})
        })

        test('it should validate admin handler status file', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.params.status = 'true'
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(true)
            
            await AdminValidator.validateFileStatus(req, res, next)

            expect(next).toHaveBeenCalled()
        })

        test('it should validate destroy song', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.params.status = 'true'
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(true)
            
            await AdminValidator.validateDestroySong(req, res, next)

            expect(next).toHaveBeenCalled()
        })

        test('it should validate delete file', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({userId: 2})
            
            await DeleteMiddleware.validate(req, res, next)

            expect(next).toHaveBeenCalled()
        })

        test('it should validate get song', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            req.params.id = 1
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({adminStatus: false, private: false})

            await GetPublicSongMiddleware.validate(req, res, next)

            expect(next).toHaveBeenCalled()
        })

    })

})