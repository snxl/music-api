import { 
    describe,
    test,
    jest,
    expect,
} from "@jest/globals"
import crypto from "crypto"
import bcrypt from 'bcryptjs'
import db from '../../database/models/index.js';
import Authenticator from "../../middlewares/auth.js"
import AdminValidator from "../../middlewares/adminMiddleware.js"
import DeleteMiddleware from "../../middlewares/middlewareDeleteSong.js"
import GetPublicSongMiddleware from "../../middlewares/middlewareGetPublicSong.js"
import ValidateLogin from "../../middlewares/middlewareLogin.js"
import MiddlewareRegister from "../../middlewares/middlewareRegister.js"
import MiddlewareUpdate from "../../middlewares/middlewareUpdate.js"
import MiddlewareUpdateSong from "../../middlewares/middlewareUpdateSong.js"
import MiddlewareInsertSong from "../../middlewares/middlewareinsertSong.js"

describe("#Route test suit", ()=>{

    const objUser = {
        email: `${crypto.randomBytes(4).toString('hex')}@email.com`,
        password: `${crypto.randomBytes(1).toString('hex').toUpperCase()}${crypto.randomBytes(6).toString('hex')}1234`
    }

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

    describe('#Middleware admin test', ()=>{

        test('it it shold validate token', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.headers.authorization = `Bearer ${process.env.TOKEN_TEST}`

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce(true)

            await Authenticator.auth(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce(false)

            await Authenticator.auth(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                error: 'Invalid Token',
            })

            delete req.headers.authorization

            await Authenticator.auth(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Token not provided',
            })
            
        })

        test('it should validate provider admin', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()

            req.params.id = '1'
            req.userAuth.id = 2
            req.userAuth.provider = true
            const res = params.mockResponse()
            const next = params.mockNext()

            jest.spyOn(db.User, "findOne").mockResolvedValueOnce(true)
            
            await AdminValidator.providerValidate(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.User, "findOne").mockResolvedValueOnce(null)           
            
            await AdminValidator.providerValidate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)

            delete req.params.id

            await AdminValidator.providerValidate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'id parameter must be a number',
            })

            req.params.id = 1
            req.userAuth.id = 1

            await AdminValidator.providerValidate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenLastCalledWith({
                status: 'ERR',
                description: 'The user must contain another id',
            })

            req.userAuth.id = 2
            req.userAuth.provider = false

            await AdminValidator.providerValidate(req, res, next)

            expect(res.status).toHaveBeenLastCalledWith(403)
            expect(res.json).toHaveBeenLastCalledWith({
                status: 'ERR',
                description: 'User needs to be admin',
            })
        })

        test('it should validate admin handler status file', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            await AdminValidator.validateFileStatus(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'id parameter must be a number',
            })

            req.params.id = 1
            req.params.status = 'trueasd'

            await AdminValidator.validateFileStatus(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'status parameter must be a boolean',
            })
            
            req.params.status = 'true'
            req.userAuth.id = 2
            req.userAuth.provider = true

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(true)

            jest.spyOn(JSON, JSON.parse.name).mockResolvedValueOnce()
            
            await AdminValidator.validateFileStatus(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(null)

            await AdminValidator.validateFileStatus(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Song does not exist',
            })

            req.userAuth.provider = false

            await AdminValidator.validateFileStatus(req, res, next)

            expect(res.status).toHaveBeenCalledWith(403)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'User needs to be admin',
            })

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

            delete req.params.id

            await AdminValidator.validateDestroySong(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'id parameter must be a number',
            })

            req.params.id = 1
            req.userAuth.provider = false

            await AdminValidator.validateDestroySong(req, res, next)

            expect(res.status).toHaveBeenCalledWith(403)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'User needs to be admin',
            })

            req.userAuth.provider = true

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(null)

            await AdminValidator.validateDestroySong(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Song does not exist',
            })

            req.userAuth.id = 2

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({userId: 2})

            await AdminValidator.validateDestroySong(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'The user must contain another id',
            })
        })
    })

    describe('#Middleware delete songs by user', ()=>{
        test('it should validate the user permission to delete a song', async ()=>{
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

            delete req.params.id

            await DeleteMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'id parameter must be a number',
            })

            req.params.id = 1
            req.userAuth.id = 1

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({userId: 2})

            await DeleteMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'User not authorized to delete music from other users',
            })

            jest.spyOn(db.Song, 'findOne').mockRejectedValue()

            await DeleteMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Failed to validate user data',
            })
        })
    })

    describe('#Middleware get public songs', ()=>{
        test('it should validate that a file is public and can be returned', async ()=>{
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

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce(null)

            await GetPublicSongMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Song does not exist',
            })

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({adminStatus: true})

            await GetPublicSongMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Song does not exist',
            })

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({adminStatus: false, private: true})
            
            await GetPublicSongMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Music blocked by creator',
            })

            jest.spyOn(db.Song, 'findOne').mockRejectedValueOnce()

            await GetPublicSongMiddleware.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Failed to validate user data',
            })
        })
    })

    describe('#middleware validation login', ()=>{
        test('it should validate if a user can login', async () =>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.body = {
                ...objUser
            }

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce({
                id:true,
                name: true,
                provider:true
            })
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)

            await ValidateLogin.validate(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(false)

            await ValidateLogin.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'user not found',
            })

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce({
                id:true,
                name: true,
                provider:true
            })
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

            await ValidateLogin.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Password does not match!',
            })

            delete req.body.email

            await ValidateLogin.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(403)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Validation fails',
                errors: [
                    "Email is required",
                ]
            })
        })
    })

    describe('#Middleware register user', ()=>{
        test("it should validate a user's registration", async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.body = {
                name: 'test',
                password: 'Password1234',
                email:'test@test.com',
                passwordConfirm: "Password1234"
            }

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(null)

            await MiddlewareRegister.registerData(req, res, next)
            
            expect(next).toHaveBeenCalled()

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)

            await MiddlewareRegister.registerData(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenLastCalledWith({
                status: 'ERR',
                description: 'user exists',
            })

            jest.spyOn(db.User, 'findOne').mockRejectedValueOnce({error:{
                errors:undefined
            } })

            await MiddlewareRegister.registerData(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Validation fails',
                error: undefined
            })
        })
    })

    describe('#Middleware update user', ()=>{

        test('it should validate data for user update', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.body = {
                name:'',
                email:'',
                password:'Test1234',
                passwordConfirm:'Test1234',
                oldPassword:'Test1234',
                email: 'test@test.com'
            }

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce({email:'test2@test.com'})
            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)

            req.file = {
                mimetype : 'image/gif'
            }

            await MiddlewareUpdate.validade(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce({email:'test2@test.com'})
            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)

            req.file.mimetype = 'test'

            await MiddlewareUpdate.validade(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Unsupported file type for operation',
            })

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce({email:'test2@test.com'})
            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

            await MiddlewareUpdate.validade(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Password does not match',
            })

            jest.spyOn(db.User, 'findByPk').mockResolvedValueOnce({email:'test@test.com'})
            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(true)

            await MiddlewareUpdate.validade(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'User already exists',
            })

            jest.spyOn(db.User, 'findByPk').mockRejectedValueOnce({error:{errors:undefined}})

            await MiddlewareUpdate.validade(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Validation fails',
                errors: undefined
            })
        })
    })

    describe('#Middleware update song', () => {
        test('it should validate data for music update', async ()=> {
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.body = {
                tittle:'',
                artist:'',
                songwriter:'',
                genre:'',
                private:'',
            }

            req.userAuth.id = 1
            req.params.id = 10

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({userId:1})

            await MiddlewareUpdateSong.validate(req, res, next)

            expect(next).toHaveBeenCalled()

            jest.spyOn(db.Song, 'findOne').mockResolvedValueOnce({userId:2})

            await MiddlewareUpdateSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'User not authorized to update data',
            })

            req.params.id = false

            await MiddlewareUpdateSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'id parameter must be a number',
            })

            jest.spyOn(db.Song, 'findOne').mockRejectedValueOnce({error:{errors:undefined}})

            req.params.id = 4

            await MiddlewareUpdateSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Validation fails',
                errors: undefined,
            })

            req.body.genre = 'unsupported'

            
            await MiddlewareUpdateSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Unsupported file type for operation',
            })


        })
    })

    describe('#Middleware insert songs', ()=>{
        test('it should validate data to insert music', async ()=>{
            const params = {
                ...defaultParams
            }

            let req = params.mockRequest()
            const res = params.mockResponse()
            const next = params.mockNext()

            req.body = {
                tittle:'test',
                artist:'test',
                songwriter:'test',
                genre:'test',
                private:'false',
            }

            req.file.mimetype = 'Unsupported'

            await MiddlewareInsertSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Unsupported file type for operation',
            })

            req.file.mimetype = 'audio/flac'
            req.body.genre = 'undefined'

            await MiddlewareInsertSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: 'Unsupported genre type',
            })

            req.body.genre = 'blues'

            await MiddlewareInsertSong.validate(req, res, next)

            expect(next).toHaveBeenCalled()

            req.body.private = undefined

            await MiddlewareInsertSong.validate(req, res, next)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                description: undefined,
            })
        })
    })
})