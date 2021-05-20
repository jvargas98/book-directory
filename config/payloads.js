const modal = {
  title: {
    type: 'plain_text',
    text: 'Add a book',
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
  },
  blocks: [
    {
      type: 'input',
      block_id: 'input_title',
      element: {
        type: 'plain_text_input',
        action_id: 'title_input',
        placeholder: {
          type: 'plain_text',
          text: 'Book name',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Title',
      },
    },
    {
      type: 'input',
      block_id: 'input_author',
      element: {
        type: 'plain_text_input',
        action_id: 'author_input',
        placeholder: {
          type: 'plain_text',
          text: 'Author name',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Author',
        emoji: true,
      },
    },
    {
      type: 'input',
      block_id: 'input_abstract',
      element: {
        type: 'plain_text_input',
        action_id: 'abstract_input',
        multiline: true,
        placeholder: {
          type: 'plain_text',
          text: '..........',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Abstract',
      },
      hint: {
        type: 'plain_text',
        text: 'Description of the book',
      },
    },
    {
      type: 'input',
      block_id: 'input_publication_date',
      element: {
        type: 'datepicker',
        initial_date: '1990-04-28',
        placeholder: {
          type: 'plain_text',
          text: 'Select the publication date',
          emoji: true,
        },
        action_id: 'publication_date_input',
      },
      label: {
        type: 'plain_text',
        text: 'Publication date',
        emoji: true,
      },
    },
  ],
  type: 'modal',
  callback_id: '123456789',
};

module.exports = modal;
