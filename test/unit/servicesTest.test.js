import { 
    describe,
    test,
    jest,
    expect,
    beforeEach
} from "@jest/globals"

import db from "../../database/models/index.js"

const { sequelize } = db

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

        test('it should destroy the audio file', async ()=>{

            jest.spyOn(db.User, 'findOne').mockResolvedValueOnce()
            
            let service
            
            service = await UserServices.findProfileWithToken()

            expect(service.status).toBe('OK')
            expect(service.description).toBe('test')

            jest.spyOn(db.User, 'findOne').mockRejectedValueOnce()
        
            service = await UserServices.findProfileWithToken()

            expect(service.status).toBe('ERR')
            expect(service.description).toBe('Fail to get data')
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
    })
    describe('#Service files test', ()=>{
        
    })
})