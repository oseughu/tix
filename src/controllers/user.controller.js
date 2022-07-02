import { User } from '#models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    console.log(err)
    res.json('Error getting users.')
  }
}

export const getUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.json('Error getting user.')
  }
}

export const register = async (req, res) => {
  const { type, country, firstName, lastName, email, password } = req.body

  try {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err)
        res.json('Error hashing password.')
      }

      const newUser = new User({
        type,
        country,
        firstName,
        lastName,
        email,
        password: hash
      })

      await newUser.save()
      res.status(201).json(newUser)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong.' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    User.findOne({ email }, (err, foundUser) => {
      if (err) {
        console.log(err)
        res.status(401).json({ message: 'Email or password does not match!' })
      } else {
        bcrypt.compare(password, foundUser.password, (err, result) => {
          const jwtToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.SECRET
          )

          result &&
            res.json({
              message: 'Welcome to Tix!',
              token: jwtToken
            })
        })
      }
    })
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized.' })
  }
}
