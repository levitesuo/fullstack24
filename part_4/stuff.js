const blog = {
    'title': 'stuff',
    'author': 'Leevi',
    'likes': 6,
    'id': 3
}

const tran = ({id, ...rest}) => ({...rest})

console.log(tran(blog))