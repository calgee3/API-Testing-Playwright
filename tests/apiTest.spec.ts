import {test, expect, Page } from '@playwright/test'
import { request } from 'http';


test('Get Single User ID', async ({ request }) => {

    const response = await request.get('https://gorest.co.in/public/v2/posts')
    expect (response.status()).toBe(200)

    const responseBody = await response.json();

    const targetUserId = 7572098

    const userIds = responseBody.map((post: {user_id: 7572098 }) => post.user_id)

    expect(userIds).toContain(7572098);

})

test('Get Multiple User IDs', async ({ request }) => {
    const response = await request.get('https://gorest.co.in/public/v2/posts')
    expect (response.status()).toBe(200)

    const responseBody = await response.json();

    const targetUserIds = [7572097, 7572095, 7572094, 7572093];

    const userIds = responseBody.map((post: {user_id: 7572097, 7572095, 7572094, 7572093 }) => post.user_id)

    targetUserIds.forEach((targetUserId) => {
        expect(userIds).toContain(targetUserId)
    })


})

test('Create a new user using POST API', async ({ request }) => {

    const user = {
        "name": "Cee Gee",
        "email": "cee@test.com",
        "gender": "male",
        "status": "active"
      }

    const authToken = 'Bearer 934e18da64f498655c1116d5170bad1a26b3c1f5982cd6292fe7a84ba2bdf26b';

    const response = await request.post('https://gorest.co.in/public/v2/users',{
        data: user,
        headers: {
            
            "ACCEPT": "applications/JSON",
            "Authorization": authToken,
            "Content-Type": "application/json"

        }

    });

    const responseBody = await response.json();
    expect(response.status()).toBe(201)
    expect(responseBody.name).toBe(`${user.name}`)
    expect(responseBody.gender).toBe(`${user.gender}`)

})

test('Update user using POST API', async ({ request }) => {

    const user = {
            "id": 7575098,
            "name": "Atmaja Pillai",
            "email": "pillai_atmaja@kilback.test",
            "gender": "male",
            "status": "inactive"
          
    }

    const authToken = 'Bearer 934e18da64f498655c1116d5170bad1a26b3c1f5982cd6292fe7a84ba2bdf26b';

    const response = await request.put('https://gorest.co.in/public/v2/comments',{
        data: user,
        headers: {
            
            "ACCEPT": "applications/JSON",
            "Authorization": authToken,
            "Content-Type": "application/json"

        }

    });

    const responseBody = await response.json();
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe(`${user.name}`)
    expect(responseBody.gender).toBe(`${user.gender}`)

})





