import { 
    describe,
    test,
    jest,
    expect,
    beforeEach
} from "@jest/globals"

import db from "../../database/models/index.js"

import ServiceAdmin from "../../services/adminServices.js"
import ServiceFiles from "../../services/filesServices.js"
import UserServices from "../../services/userServices.js"

import JsonWebToken from "../../utils/jwt.js"

describe('#Service test suit', ()=>{

    describe('#Service admin test', ()=>{

        test('it should delete a user', async ()=>{

            jest.spyOn(db.User, 'destroy').mockResolvedValueOnce()

            let service
            
            service = await ServiceAdmin.deleteUser()

            expect(service.status).toBe('OK')
            expect(service.description).toBe('User deleted successfully')

            jest.spyOn(db.User, 'destroy').mockRejectedValueOnce()

            service = await ServiceAdmin.deleteUser(1)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to delete user')
        })

        
        test('it should update a user to provider', async ()=>{

            jest.spyOn(db.User, 'update').mockResolvedValueOnce()

            let service
            
            service = await ServiceAdmin.userToProvider()

            expect(service.status).toBe('OK')
            expect(service.description).toBe('User updated successfully')

            jest.spyOn(db.User, 'update').mockRejectedValueOnce()

            service = await ServiceAdmin.userToProvider(1)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to updated user')
        })

        
        test('it should update a song to lock it', async ()=>{

            jest.spyOn(db.Song, 'update').mockResolvedValueOnce()

            let service
            
            service = await ServiceAdmin.statusUpdate()

            expect(service.status).toBe('OK')
            expect(service.description).toBe('File updated successfully')

            jest.spyOn(db.Song, 'update').mockRejectedValueOnce()

            service = await ServiceAdmin.statusUpdate()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to updated file')
        })

        
        test('it should destroy the audio file', async ()=>{

            jest.spyOn(db.Song, 'destroy').mockResolvedValueOnce(1)

            let service
            
            service = await ServiceAdmin.destroySong()
            
            expect(service.status).toBe('OK')
            expect(service.description).toBe('lines deleted 1')

            jest.spyOn(db.Song, 'destroy').mockRejectedValueOnce()

            service = await ServiceAdmin.destroySong()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to destroy file')
        })
    })
    describe('#Service user test', ()=>{
        
        test('it should register a user', async ()=>{

            jest.spyOn(db.User, 'create').mockResolvedValueOnce({id:'1', name:'test', email:'test', provider:'test',})
            
            let service
            
            service = await UserServices.store()

            expect(service.status).toBe('OK')
            expect(typeof service.token).toBe('string')

            jest.spyOn(db.User, 'create').mockRejectedValueOnce()
        
            service = await UserServices.store()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to create data')
        })

        test('it should get data with user token', async ()=>{

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce('test')
            
            let service
            
            service = await UserServices.findProfileWithToken(1)
            
            expect(service.status).toBe('OK')
            expect(service.description).toBe('test')

            jest.spyOn(db.User, 'findOne').mockRejectedValue()
        
            service = await UserServices.findProfileWithToken()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to get data')
        })

        test('it should delete a user', async ()=>{

            jest.spyOn(db.User, 'destroy').mockResolvedValueOnce('1')
            
            let service
            
            service = await UserServices.destroy(1)

            expect(service.status).toBe('OK')
            expect(service.affectedRows).toBe('1')

            jest.spyOn(db.User, 'destroy').mockRejectedValueOnce()
        
            service = await UserServices.destroy()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to destroy account')
        })

        test('it should destroy the audio file', async ()=>{

            jest.spyOn(db.User, 'create').mockResolvedValueOnce({id:'1', name:'test', email:'test', provider:'test',})
            
            let service
            
            service = await UserServices.store()

            expect(service.status).toBe('OK')
            expect(typeof service.token).toBe('string')

            jest.spyOn(db.User, 'create').mockRejectedValueOnce()
        
            service = await UserServices.store()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to create data')
        })

        test('it should login user', async ()=>{

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(Promise.resolve({id: 1, name: 'teste', email:'test', provider:'test', createdAt:'', updatedAt:''}))

            let service;

            service = await UserServices.login({email:'test'})

            expect(service.status).toBe('OK')
            expect(typeof service.token).toBe('string')

            jest.spyOn(db.User, 'findOne').mockRejectedValue()
            
            service = await UserServices.login({email:'test'})

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to create data')
        })

        test('it should update user', async ()=>{

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(Promise.resolve({id: 1, name: 'teste', email:'test', provider:'test', createdAt:'', updatedAt:''}))
            jest.spyOn(db.User, 'update').mockResolvedValueOnce(Promise.resolve([null, {id: 1, name: 'teste', email:'test', provider:'test', createdAt:'', updatedAt:''}]))
            jest.spyOn(db.File, 'create').mockResolvedValueOnce(Promise.resolve({id: 1}))

            let service;

            service = await UserServices.update({id:1, email:'test'}, true, undefined)

            expect(service.status).toBe('OK')
            expect(typeof service.token).toBe('string')


            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce(Promise.resolve({id: 1, name: 'teste', email:'test', provider:'test', avatar: true, createdAt:'', updatedAt:''}))
            jest.spyOn(db.User, 'update').mockResolvedValueOnce(Promise.resolve([null, {id: 1, name: 'teste', email:'test', provider:'test', createdAt:'', updatedAt:''}]))
            jest.spyOn(db.File, 'create').mockResolvedValueOnce(Promise.resolve({id: 1}))

            service = await UserServices.update({id:1, email:'test'}, true, undefined)

            expect(service.status).toBe('OK')
            expect(typeof service.token).toBe('string')

            jest.spyOn(db.User, 'findOne').mockRejectedValue()

            service = await UserServices.update({id:1, email:'test'}, true, undefined)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to update data')
        })

        test('it should list all users', async ()=>{

            jest.spyOn(db.User, 'findAll').mockResolvedValueOnce(Promise.resolve('OK'))

            let service;

            service = await UserServices.allUser({email:'test'})

            expect(service.status).toBe('OK')
            expect(service.description).toBe('OK')

            jest.spyOn(db.User, 'findAll').mockRejectedValueOnce()

            service = await UserServices.allUser({email:'test'})

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to get data')
        })
    })
    describe('#Service files test', ()=>{
        test('it should insert music', async ()=>{

            jest.spyOn(db.Song, 'create').mockResolvedValue()

            let service;

            service = await ServiceFiles.store(undefined, {filename:'test'}, {id:1})

            expect(service.status).toBe('OK')
            expect(service.description).toBe(undefined)

            jest.spyOn(db.Song, 'create').mockRejectedValue()

            
            service = await ServiceFiles.store(undefined, {filename:'test'}, {id:1})

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to create data')
        })

        test('it should destroy music', async ()=>{

            jest.spyOn(db.Song, 'destroy').mockResolvedValue()

            let service;

            service = await ServiceFiles.destroy(1)

            expect(service.status).toBe('OK')
            expect(service.description).toBe('File deleted successfully')

            jest.spyOn(db.Song, 'destroy').mockRejectedValue()

            
            service = await ServiceFiles.destroy(1)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to delete file')
        })

        test('it should get private songs with personal token', async ()=>{

            jest.spyOn(db.Song, 'findOne').mockResolvedValue('Ok')

            let service;

            service = await ServiceFiles.getPrivateSong(1)

            expect(service.status).toBe('OK')
            expect(service.description).toBe('Ok')

            jest.spyOn(db.Song, 'findOne').mockResolvedValue(null)

            service = await ServiceFiles.getPrivateSong(1)

            expect(service.status).toBe('OK')
            expect(service.description).toBe('music by another author or does not exist')

            jest.spyOn(db.Song, 'findOne').mockRejectedValue()

            
            service = await ServiceFiles.getPrivateSong(1)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to get data')
        })


        test('it should get public songs without personal token', async ()=>{

            jest.spyOn(db.Song, 'findOne').mockResolvedValue('Ok')

            let service;

            service = await ServiceFiles.getPublicSong({id:1})

            expect(service.status).toBe('OK')
            expect(service.description).toBe('Ok')

            jest.spyOn(db.Song, 'findOne').mockResolvedValue(null)
 
            service = await ServiceFiles.getPublicSong({id:1})

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to get data')
        })

        test('it should update the files', async ()=>{

            jest.spyOn(db.Song, 'update').mockResolvedValue(Promise.resolve('OK'))

            let service;

            service = await ServiceFiles.updatedFile(null, 1)

            expect(service.status).toBe('OK')
            expect(service.description).toBe('OK')

            jest.spyOn(db.Song, 'update').mockRejectedValue()

            
            service = await ServiceFiles.updatedFile(null, 1)

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Failed to updated file')
        })
    })
})