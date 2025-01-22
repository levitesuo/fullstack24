import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import { beforeEach, describe, expect } from 'vitest'

describe('<NewBlogForm />', () => {
  let container, newFormMock

  beforeEach(() => {
    newFormMock = vi.fn()
    container = render(<NewBlogForm newBlog={newFormMock} />)
  })

  test('On submit correct call to newBlog function', async () => {
    const user = userEvent.setup()

    const showInputBox = screen.getByText('new blog')
    await user.click(showInputBox)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'Test Title')
    await user.type(inputs[1], 'Tero Testaaja')
    await user.type(inputs[2], 'kokeilu.com')
    const submitButton = screen.getByText('submit')
    await user.click(submitButton)

    const expected = {
      title: 'Test Title',
      author: 'Tero Testaaja',
      url: 'kokeilu.com'
    }

    expect(newFormMock.mock.calls).toHaveLength(1)
    expect(newFormMock.mock.calls[0][0]).toStrictEqual(expected)
  })
})