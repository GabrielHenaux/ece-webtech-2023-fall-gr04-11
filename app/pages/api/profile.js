export const db = {
    slug: 'G0001',
    firstName: 'Gaby',
    lastName: 'Henaux',
    email: 'gaby.henaux@gmail.com',
    password: '1234',
}

  
  export default function handler(req, res) {
    res.status(200).json(db)
  }