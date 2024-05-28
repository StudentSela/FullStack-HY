import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

describe('<Blog />', () => {
  let blog
  let setBlogs
  let blogs
  let user
  let handleDelete
  let handleLike

  beforeEach(() => {
    blog = {
      id: '1',
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 10,
      user: {
        id: '12345',
        name: 'Test User',
        username: 'testuser'
      }
    }
    setBlogs = vi.fn()
    blogs = [blog]
    user = { username: 'testuser' }
    handleDelete = vi.fn()
    handleLike = vi.fn()
  })

  test('renders title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} handleDelete={handleDelete} handleLike={handleLike} />)

    expect(screen.getByText('Test Blog Title Test Author')).toBeDefined()
    expect(screen.queryByText('http://testblog.com')).toBeNull()
    expect(screen.queryByText('10 likes')).toBeNull()
  })

  test('shows url and likes when view button is clicked', async () => {
    render(<Blog blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} handleDelete={handleDelete} handleLike={handleLike} />)
    const userEventInstance = userEvent.setup()
    
    const button = screen.getByText('view')
    await userEventInstance.click(button)

    expect(screen.getByText('http://testblog.com')).toBeDefined()
    expect(screen.getByText('10 likes')).toBeDefined()
  })

  test('calls event handler twice if like button is clicked twice', async () => {
    render(<Blog blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} handleDelete={handleDelete} handleLike={handleLike} />)
    const userEventInstance = userEvent.setup()
    
    const viewButton = screen.getByText('view')
    await userEventInstance.click(viewButton)
    
    const likeButton = screen.getByText('like')
    await userEventInstance.click(likeButton)
    await userEventInstance.click(likeButton)

    expect(handleLike).toHaveBeenCalledTimes(2)
  })
})
