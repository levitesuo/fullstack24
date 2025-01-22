const { test, expect, beforeEach, describe } = require('@playwright/test')
const { newBlog, likeTitle } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Leevi',
              username: 'lepa',
              password: 'myy'
            }
          })
        await request.post('http://localhost:3003/api/users', {
            data: {
              name: 'Myy',
              username: 'myyllerrys',
              password: 'leevi'
            }
          })
      
        await page.goto('http://localhost:5173')
    })

    test('login form is shown', async ({ page }) => {
        await expect(page.getByText('login to blogsapp')).toBeVisible()
        })
    
    describe('Login', () => {
        test('login successfull', async ({ page }) => {
            await page.getByRole('textbox').first().fill('lepa')
            await page.getByRole('textbox').last().fill('myy')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Leevi logged in.')).toBeVisible()
        })

        test('login failed', async ({ page }) => {
            await page.getByRole('textbox').first().fill('lepa')
            await page.getByRole('textbox').last().fill('pyy')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Incorrect username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('textbox').first().fill('lepa')
            await page.getByRole('textbox').last().fill('myy')
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByText('new blog').click()
            const textboxes = await page.getByRole('textbox').all()
            await textboxes[0].fill('Test Title')
            await textboxes[1].fill('Tero the Testaaja')
            await textboxes[2].fill('kokeilu.com')
            await page.getByText('submit').click()

            await expect(page.getByText('Test Title').first()).toBeVisible()
        })

        test('a created blog can be liked', async ({ page }) => {
            await page.getByText('new blog').click()
            const textboxes = await page.getByRole('textbox').all()
            await textboxes[0].fill('Test Title')
            await textboxes[1].fill('Tero the Testaaja')
            await textboxes[2].fill('kokeilu.com')
            await page.getByText('submit').click()

            await page.getByText('info').first().click()
            await page.getByText('Like').first().click()
            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        test('the user who created the blog can remove it', async ({ page }) => {
            await page.getByText('new blog').click()
            const textboxes = await page.getByRole('textbox').all()
            await textboxes[0].fill('Test Title')
            await textboxes[1].fill('Tero the Testaaja')
            await textboxes[2].fill('kokeilu.com')
            await page.getByText('submit').click()

            await page.getByText('info').first().click()
            await expect(page.getByText('remove')).toBeVisible()    
            await page.getByText('remove').click()
            await expect(page.getByText('Test Title')).not.toBeVisible()
        })

        test('a user who did not create the blog cant remove it', async ({ page }) => {
            await page.getByText('new blog').click()
            const textboxes = await page.getByRole('textbox').all()
            await textboxes[0].fill('Test Title')
            await textboxes[1].fill('Tero the Testaaja')
            await textboxes[2].fill('kokeilu.com')
            await page.getByText('submit').click()
            
            await page.getByText('logout').click()
            await page.getByRole('textbox').first().fill('myyllerrys')
            await page.getByRole('textbox').last().fill('leevi')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByText('info').click()
            await expect(page.getByText('remove')).not.toBeVisible()
        })

        describe('blogs in order', () => {
            beforeEach(async ({ page }) => {
                await page.getByText('new blog').click()
                await newBlog(page, 'a', 'myy', 'kissa.com')
                await newBlog(page, 'b', 'leevi', 'katti.com')
                await newBlog(page, 'c', 'kira', 'kolli.com')
                
            })
            test('the order is correct with 1, 2, 3 likes', async ({ page }) => {
                const showButtons = await page.getByText('info').all()

                await showButtons[0].click()
                await showButtons[1].click()
                await showButtons[2].click()

                await likeTitle(page, 'a')
                await likeTitle(page, 'b')
                await likeTitle(page, 'b')
                await likeTitle(page, 'c')
                await likeTitle(page, 'c')
                await likeTitle(page, 'c')

                
                const likeButtons = page.getByTestId(new RegExp('like ', "i"))
                console.log(likeButtons[0])

            })
        })
    })
})
