const dummy = (blogs) => {
  return 1  
}

const totalLikes = (blogs) =>{
  return blogs.reduce((acc,cur)=>acc+cur.likes,0)
}

const favoriteBlog = (blogs) => {
  const resulte = blogs.length === 0 ? "the list is empty of blogs" :
    blogs.reduce((acc,cur)=> acc.likes>cur.likes ? acc : cur, {likes:Number.MIN_VALUE})
    console.log
  return  typeof resulte === "string" ? resulte : ({title: resulte.title, author: resulte.author, likes: resulte.likes})
}

const mostBlogs = (blogs) => {
const authorsList = blogs.sort((blogA, blogB)=>blogA.author<blogB.author ? -1 : 1)
  .reduce((acc,cur)=>
    acc[1].author===cur.author ?
      [acc[0],{author: acc[1].author, blogs: acc[1].blogs+1}] :
      acc[0].blogs<acc[1].blogs ? 
        [acc[1],{author:cur.author, blogs:1}] :
        [acc[0],{author:cur.author, blogs:1}]
      ,[{author:"", blogs:0},{author:"", blogs:0}])
  return authorsList[1].blogs===0 ? 
    "the list is empty of blogs" : 
    authorsList[0].blogs<authorsList[1].blogs ?
      authorsList[1] :
      authorsList[0]
}

const mostLikes = (blogs) => {
  const authorsList = blogs.sort((blogA, blogB)=>blogA.author<blogB.author ? -1 : 1)
    .reduce((acc,cur)=>
      acc[1].author===cur.author ?
        [acc[0],{author: acc[1].author, likes: acc[1].likes+cur.likes}] :
        acc[0].likes<acc[1].likes ? 
          [acc[1],{author:cur.author, likes:cur.likes}] :
          [acc[0],{author:cur.author, likes:cur.likes}]
        ,[{author:"", likes:0},{author:"", likes:0}])
  return authorsList[1].author==="" ? 
    "the list is empty of blogs" : 
    authorsList[0].likes<authorsList[1].likes ?
      authorsList[1] :
      authorsList[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}