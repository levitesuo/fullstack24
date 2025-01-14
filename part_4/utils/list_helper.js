const dummy = (blogs) => {
    return 1
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current
    })
}

const totalLikes = (blogs) => {
        return blogs.reduce((acc, blog) => ({
            likes: acc.likes + blog.likes
        })).likes
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}