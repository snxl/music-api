import { 
    describe,
    test,
    it,
    jest,
    expect,
    beforeEach,
    afterAll
} from "@jest/globals"
import App from "../../app.js"
import request from "supertest"
import crypto from "crypto"

const app = new App().app

const objectUser = {
    name: `Jest`,
    email: `${crypto.randomBytes(4).toString('hex')}@email.com`,
    password: `jestTest1234`,
    passwordConfirm: `jestTest1234`
}

describe('#Routes suits', ()=>{
    test('Register user',  function(done) {
        request(app)
            .post('/user')
            .set("Content-Type", "multipart/form-data")
            .send({
                ...objectUser
            })
            .expect(201)
            .end((err, resp) => {
                if (err) {
                   return done(err)
                }
                
                done()
            })
    })
})