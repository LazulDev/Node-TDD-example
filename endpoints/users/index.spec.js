const handlers = require('./index')

describe('Endpoints' , () => {
    describe('users' , () => {
        describe('get' , () => {
            it('return to user json' , async () => {
                const axios = {
                    get: jest.fn().mockResolvedValue({ data: 1 })
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                }
                await handlers({ axios }).get({}, res)
                expect(res.status.mock.calls).toEqual([
                    [200]
                ])
                expect(res.send.mock.calls).toEqual([
                    [1]
                ])
    
            })
        })
        
        describe('post', () => {
            it('creates a resource' , async () => {
                const { axios, req, res } = postMock()
                await handlers({ axios }).post(req, res)
                expect(res.status.mock.calls).toEqual([
                    [201]
                ])
                expect(res.send.mock.calls).toEqual([
                    [1]
                ])
                expect(axios.post.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users' , 'request body']
                ])
    
            })
        });

        describe('put', () => {
            it('updates resource ', async () => {
                const { axios, req, res } = putMock()
                await handlers({ axios }).put(req, res)

                expect(res.status.mock.calls).toEqual([
                    [204]
                ])
                expect(axios.put.mock.calls).toEqual([
                    ['https://jsonplaceholder.typicode.com/users/12', 'request body']
                ])
                
            });
            describe('delete', () => {
                it('deletes a resource', async () => {
                    const req = {
                        params: {
                            id: 54
                        }
                    }
                    const axios = {
                        delete: jest.fn()
                    }
                    const res = {
                        sendStatus: jest.fn()
                    }

                    await handlers({ axios }).delete(req, res)
                    expect(axios.delete.mock.calls).toEqual([
                        ['https://jsonplaceholder.typicode.com/users/54']
                    ])

                    expect(res.sendStatus.mock.calls).toEqual([
                        [204]
                    ])
                    
                });
            });
        });
    })  
})

function postMock() {
    const axios = {
        post: jest.fn().mockResolvedValue({ data: 1 })
    }
    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    }
    const req = {
        body: 'request body'
    }
    return { axios, req, res }
}


function putMock() {
    const axios = {
        put: jest.fn().mockResolvedValue({ data: 1 })
    }            
    const req = {
        body:  'request body',
        params: {
            id: 12,
        }
    }
    const res = {
        status: jest.fn(),
    }
    return { axios, req, res }
}
