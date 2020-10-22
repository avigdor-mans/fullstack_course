const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const { blogsInDb } = require('./test_helper')
  
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog=>new Blog(blog))
  const promiseArray = blogObjects.map(blog=> blog.save())
  await Promise.all(promiseArray)

})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verifies that the unique identifier property of the blog posts is named id', async ()=>{
  const response = await api.get('/api/blogs')
  const blogIdList = response.body.map(blog=>blog.id)
  blogIdList.forEach(element => {
    expect(element).toBeDefined()
  })
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(r=>r.title)
  expect(title).toContain('Go To Statement Considered Harmful')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Cohen N. Yosy',
    url: "localhost:1234/async&await",
    likes: 50,
  }

    const myUser = await api
      .post('/api/login')
      .send({username: "test10",
      password: "10101010"})

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${myUser.body.token}` })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)

  expect(titles).toContain('async/await simplifies making async calls')
})

test('likes property is missing from the request, it will default to the value 0', async ()=>{
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Cohen N. Yosy',
    url: "localhost:1234/async&await",
  }    
    const myUser = await api
      .post('/api/login')
      .send({username: "test10",
      password: "10101010"})

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${myUser.body.token}` })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[2].likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const noTitleBlog = {
    author: 'Mansbach K. Avigdor',
    url: 'localhost:none',
    likes: 0
  }
  const myUser = await api
      .post('/api/login')
      .send({username: "test10",
      password: "10101010"})

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .set({ Authorization: `Bearer ${myUser.body.token}` })
    .expect(400)

  const noUrlBlog = {
    author: 'Mansbach K. Avigdor',
    title: 'localhost:none',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .set({ Authorization: `Bearer ${myUser.body.token}` })
    .expect(400)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {

  const newBlog = {
    title: 'blog to delete',
    author: 'Avi Man',
    url: "localhost:1234/todelete",
    likes: 78
  }

  const myUser = await api
      .post('/api/login')
      .send({username: "test10",
      password: "10101010"})

  const blogToDelete = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${myUser.body.token}` })

  const blogsAtMiddle = await helper.blogsInDb()
  expect(blogsAtMiddle).toHaveLength(helper.initialBlogs.length + 1)

  await api
    .delete(`/api/blogs/${blogToDelete.body.id}`)
    .set({ Authorization: `Bearer ${myUser.body.token}` })
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})