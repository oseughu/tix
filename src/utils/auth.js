import { User } from '#models/user.model'
import 'dotenv/config'
import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
)

export const authMiddleware = passport.authenticate('jwt', {
  session: false
})
