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
import ServiceUser from "../../services/userServices.js"
import ServiceFiles from "../../services/filesServices.js"

describe('#Service test suit', ()=>{

    describe('#Service admin test', ()=>{

        test('it should delete a user', async ()=>{

            jest.spyOn(db,'sequelize').mockResolvedValue()

            jest.spyOn(db.User, 'destroy').mockResolvedValueOnce()

            const service = await ServiceAdmin.deleteUser(1)

            expect(service).toHaveBeenCalledWith({
                status: 'OK',
                description: 'User deleted successfully',
            })
        })
    })
    describe('#Service user test', ()=>{
        
    })
    describe('#Service files test', ()=>{
        
    })
})