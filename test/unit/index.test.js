import { 
    describe,
    test,
    jest,
    expect
} from "@jest/globals"

describe("#Route test suit", ()=>{

    const defaultParams = {
        mockRequest: () => {
          const req = {}
          req.body = jest.fn().mockReturnValue(req)
          req.params = jest.fn().mockReturnValue(req)
          return req
        },
      
        mockResponse: () => {
          const res = {}
          res.send = jest.fn().mockReturnValue(res)
          res.status = jest.fn().mockReturnValue(res)
          res.json = jest.fn().mockReturnValue(res)
          return res
        },
        mockNext: () => jest.fn()
      }

    describe("#User test suite", ()=>{
        test.todo("it should create user")

        test.todo("it should get profile data")
    
        test.todo("it should get profile data whit token")
    
        test.todo("it should delete profile")
    
        test.todo("it should update profile")
    })

})