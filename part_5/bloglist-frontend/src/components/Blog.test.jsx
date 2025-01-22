import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

describe('<Blog />', () => {
  let container, likeMock

  beforeEach(() => {
    const blog = {
      title: 'Test Title',
      author: 'Tero Testi',
      url: 'google.com',
      likes: 4
    }
    likeMock = vi.fn()

    container = render(<Blog blog={blog} likeHandler={likeMock}/>
    ).container
  })


  test('only title and  author show initally', () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('Test Title')
    expect(div).toHaveTextContent('Tero Testi')

    const togglableDiv = container.querySelector('.togglableContent')
    expect(togglableDiv).toHaveStyle('display: none')

  })

  test('all contenct shown when info cliked', async () => {
    const div = container.querySelector('.blog')

    const user = userEvent.setup()
    const button = screen.getByText('info')
    await user.click(button)

    expect(div).toHaveTextContent('Test Title')
    expect(div).toHaveTextContent('Tero Testi')
    expect(div).toHaveTextContent('google.com')
    expect(div).toHaveTextContent('4')

    const togglableDiv = container.querySelector('.togglableContent')
    expect(togglableDiv).not.toHaveStyle('display: none')
  })

  test('like called twice', async () => {
    const user = userEvent.setup()
    const showButton = screen.getByText('info')
    await user.click(showButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeMock.mock.calls).toHaveLength(2)
  })
})