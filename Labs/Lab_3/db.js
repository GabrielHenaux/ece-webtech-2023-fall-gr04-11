const db = {
  articles: [
      {
          id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
          title: 'My article',
          content: 'Content of the article.',
          date: '04/10/2022',
          author: 'Tanguy Velay'
      },
      {
          id: '7da0fd5e-15c0-44da-9f5e-3b8ad9ecb0c2',
          title: 'Second article',
          content: 'This is the content for the second article.',
          date: '05/10/2022',
          author: 'Gabriel Henaux'
      },
      {
          id: '8ea1bf4a-18c0-43da-8a5f-4c8ad9edc3d3',
          title: 'Third article',
          content: 'More insights in this third article.',
          date: '06/10/2022',
          author: 'Matheo Gonnet'
      }

  ],
  comments: [
      {
          id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          timestamp: 1664835049,
          content: 'Very Good Article !.',
          articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
          author: 'Bob Marley'
      },
      {
          id: '2a4deb5f-3b8e-4bod-9cde-3b1d7c4dc7ef',
          timestamp: 1664936050,
          content: 'Amazing article!',
          articleId: '7da0fd5e-15c0-44da-9f5e-3b8ad9ecb0c2',
          author: 'Will Smith'
      },
      {
          id: '3b5dec6g-4c9f-5eod-8def-4b2e8d5ef8gh',
          timestamp: 1665037051,
          content: 'This third article is really insightful.',
          articleId: '8ea1bf4a-18c0-43da-8a5f-4c8ad9edc3d3',
          author: 'Emma Watson'
      }
  ]
}

module.exports = db;
