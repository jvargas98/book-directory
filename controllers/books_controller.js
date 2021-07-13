const PDFDocument = require('pdfkit');
const { query } = require('express');
const hbs = require('nodemailer-express-handlebars');
const MailConfig = require('../config/email');
const db = require('../models');

const gmailTransport = MailConfig.GmailTransport;

const Book = db.books;
const User = db.users;

const controller = {};

controller.index = async (req, res, next) => {
  try {
    const books = await Book.findAll({ where: { userId: req.user.id } });
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
        userId: req.user.id,
      });
      controller.sendEmail(req, 'created');
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
    controller.sendEmail(req, 'deleted');
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

controller.generatePdf = async (req, res, next) => {
  try {
    const doc = new PDFDocument();

    let filename = 'summary';
    // Stripping special characters
    filename = `${encodeURIComponent(filename)}.pdf`;

    const books = await Book.findAll({ where: { userId: req.user.id } });

    let content = `User: ${req.user.email}, date: ${new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '/')}\nBooks:\n`;

    content += books.map((book) => {
      let body = '';
      const element = `Title: ${book.title}, Author: ${book.author}\n`;
      body += element;
      return body;
    });

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');
    doc.y = 300;
    doc.text(content, 50, 50);
    doc.pipe(res);
    doc.end();
  } catch (err) {
    next(err);
  }
};

controller.sendEmail = (req, title) => {
  MailConfig.ViewOption(gmailTransport, hbs);
  const HelperOptions = {
    from: 'growing.tango@gmail.com',
    to: req.user.email,
    subject: title === 'created' ? 'Book created' : 'Book deleted',
    template: 'email',
    context: {
      name: req.user.first_name,
      title: title === 'created' ? 'added a new book to' : 'deleted a book of',
    },
  };
  gmailTransport.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('email is send');
    console.log(info);
  });
};

module.exports = controller;
