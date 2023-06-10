const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
  try {
    const token = req.get('authorization')
    if(!token) res.status(401).send('There is no token')
    jwt.verify(token.split(' ')[1] , process.env.JWT_SECRET , (err) => {
      if (err) return res.status(401).send('Invalid Token')  
    })
    next()
  } catch (err) {
    return res.status(401).send('Unauthorized')
  }
}

module.exports = {Auth};