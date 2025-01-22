const newBlog = async (page, title, author, url) => {
    const textboxes = await page.getByRole('textbox').all()
    await textboxes[0].fill(title)
    await textboxes[1].fill(author)
    await textboxes[2].fill(url)
    await page.getByText('submit').click()
}

const likeTitle = async (page, title) => {
    await page.getByTestId('like '+ title).click()
}

const numberOfLikes = async (page, a, b, c) => {
    
}

export { newBlog, likeTitle }