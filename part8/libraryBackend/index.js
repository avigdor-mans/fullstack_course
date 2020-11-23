const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const pubsub = new PubSub()
require('dotenv').config()
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String):[Book!]!
    allAuthors:[Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title:String!
      author:String!
      published:Int!
      genres:[String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Subscription {
    bookAdded: Book!
  }  
`

const resolvers = {
  Query: {
    bookCount: (root, args) => {
      if(!args.author)
        return Book.collection.countDocuments()
      const author = Author.find({name: args.author})
      return Book.find({author:author._id}).length
    },
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author', {name:1})

      if(!args.genre && !args.author)
        return books
      if(!args.author){
        console.log(books)
        console.log(books.filter((b)=> b.genres.includes(args.genre)))
        return books.filter((b)=> b.genres.includes(args.genre))
      }
      if(!args.genre)
        return books.filter((b)=> b.author===args.author)
      return books.filter((b)=> b.author===args.author && b.genres.includes(args.genre))
    },
    allAuthors: async () =>{
      const authors = await Author.find({})
      return authors
      // .map(async(a)=>({
      //   name: a.name,
      //   born: a.born,
      //   bookCount: (await Book.find({author:a._id})).length,
      // }))
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new UserInputError("Log in first")
      }
      let author = await Author.findOne({name:args.author})
      if(!author)
        author = new Author({name:args.author})
      else
        author = {...author, bookCount: author.bookCount+1}
      try{
        await author.save()
      }catch(err){
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      

      const book = new Book({...args, author: author._id})
      try{
        await book.save()
      }catch(err){
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new UserInputError("Log in first")
      }

      const author = await Author.findOne({name: args.name})
      if(!author)
        return null

      const editedAuthor = {name:args.name, born: args.setBornTo}
      const updatAuthors = Author.findByIdAndUpdate(author._id, editedAuthor,{new: true})
      return updatAuthors
    },
    createUser:  (root, args) => {
      const user = new User({ username: args.username , favoriteGenre: args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})