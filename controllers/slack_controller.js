const bcrypt = require('bcrypt');
const slackClient = require('../config/slack');
const db = require('../models');
const modal = require('../config/payloads');
const randomPassword = require('../helpers/passwords');

const controller = {};

const Book = db.books;
const User = db.users;

controller.appMention = async (payload) => {
  try {
    await slackClient.chat.postMessage({
      channel: payload.event.channel,
      text: `Hello <@${payload.event.user}>! :v:`,
    });
  } catch (error) {
    console.log(error);
  }
};

controller.message = async (payload, responseText) => {
  try {
    await slackClient.chat.postMessage({
      channel: payload.event.channel,
      text: responseText,
    });
  } catch (error) {
    console.log(error);
  }
};

controller.memberJoinedChannel = async (payload) => {
  const password = randomPassword();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await slackClient.conversations.open({
      return_im: true,
      users: payload.event.user,
    });
    const userData = await slackClient.users.info({
      user: payload.event.user,
    });
    const unregisteredUser = await User.findOne({
      where: { email: userData.user.profile.email },
    });

    if (!unregisteredUser) {
      await User.create({
        email: userData.user.profile.email,
        password: hashedPassword,
      });
      await slackClient.chat.postMessage({
        channel: data.channel.id,
        text: `Hi, your password is: ${password}`,
      });
    } else {
      await slackClient.chat.postMessage({
        channel: data.channel.id,
        text: 'Welcome back :heart: ! your password is the same',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

controller.command = async (payload) => {
  try {
    await slackClient.views.open({
      trigger_id: payload.trigger_id,
      view: JSON.stringify(modal),
    });
  } catch (error) {
    console.log(error);
  }
};

controller.viewSubmission = async (payload) => {
  try {
    const userData = await slackClient.users.info({
      user: payload.user.id,
    });

    const newBook = payload.view.state.values;

    const userDataDB = await User.findOne({
      where: { email: userData.user.profile.email },
    });

    await Book.create({
      title: newBook.input_title.title_input.value,
      author: newBook.input_author.author_input.value,
      publication_date:
        newBook.input_publication_date.publication_date_input.selected_date,
      abstract: newBook.input_abstract.abstract_input.value,
      userId: userDataDB.dataValues.id,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = controller;
