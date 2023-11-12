export const userConnected = {
    slug: 'G0001',
    username: 'gabyhenaux',
    password: '1234',
    firstName: 'Gabriel',
    lastName: 'Henaux',
    email: 'gaby.henaux@gmail.com',
}

  
  export default function handler(req, res) {
    res.status(200).json(userConnected)
  }