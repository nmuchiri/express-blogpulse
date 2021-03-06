let express = require('express')
let db = require('../models')
const article = require('../models/article')
const comment = require('../models/comment')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post and its author
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.author]
  })
  
  .then((article) => {
    if (!article) throw Error()
    // console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.post('/:id', (req, res) => {
  // console.log(req.body)
  db.comment.create({
    firstName: req.body.name,
    content: req.body.commentLink,
    articleId: req.body.articleId

  })
  .then((createdComment) => {
    console.log(createdComment)
    res.render('comments/show', {createdComment: createdComment})
    // res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// router.get('/:id/comments', (req, res) => {
//   db.comment.findAll({
//     where:{id: req.params.id}
//   })
//   .then((comments) => {
//     res.render(comments/show, { comment: comment })
//   })
  
//   .catch((error) => {
//     res.status(400).render('main/404')
//   })
// })

module.exports = router
