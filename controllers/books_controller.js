const { query } = require('express');
const db = require('../models');

const Book = db.books;

const controller = {};

controller.index = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.render('index', { title: 'Books', books });
  } catch (err) {
    next(err);
  }
};

controller.new = (req, res, next) => {
  res.render('bookedit', {
    title: 'Add book',
    docreate: true,
    notekey: '',
    book: undefined,
  });
};

controller.show = async (req, res, next) => {
  try {
    const book = await Book.findOne({ where: { id: req.query.id } });
    if (!book) {
      throw new Error(`No book found for ${req.query.id}`);
    } else {
      res.render('bookshow', {
        title: book ? book.title : '',
        id: req.query.id,
        book,
      });
    }
  } catch (err) {
    next(err);
  }
};

controller.create = async (req, res, next) => {
  try {
    if (req.body.docreate === 'create') {
      await Book.create({
        title: req.body.title,
        author: req.body.author,
        publication_date: req.body.publication_date,
        abstract: req.body.abstract,
        book_cover: req.body.book_cover,
      });
      res.redirect('/');
    } else {
      await controller.update({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        publication_date: req.body.publication_date,
        abstract: req.body.abstract,
        book_cover: req.body.book_cover,
      });
      res.redirect(`/books/view?id=${req.body.id}`);
    }
  } catch (err) {
    next(err);
  }
};

controller.edit = async (req, res, next) => {
  try {
    const book = await Book.findOne({ where: { id: req.query.id } });
    res.render('bookedit', {
      title: book ? `Edit ${book.title}` : 'Add a Book',
      docreate: false,
      id: req.query.id,
      book,
    });
  } catch (err) {
    next(err);
  }
};

controller.update = async (book) => {
  const bookCreated = await Book.findOne({ where: { id: book.id } });
  if (!bookCreated) {
    throw new Error(`No book found for ${book.id}`);
  } else {
    await Book.update(book, {
      where: { id: book.id },
    });
  }
};

controller.destroy = async (req, res, next) => {
  try {
    await Book.destroy({ where: { id: req.body.id } });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
