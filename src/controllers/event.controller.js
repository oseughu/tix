import { Event } from '#models/event.model'
import { User } from '#models/user.model'

export const createEvent = async (req, res) => {
  const {
    type,
    name,
    description,
    location,
    locationTips,
    customUrl,
    startDate,
    endDate,
    socialDetails,
    category,
    userId
  } = req.body

  try {
    const user = await User.findById(userId)

    const newEvent =
      user &&
      Event.create({
        type,
        name,
        description,
        location,
        locationTips,
        customUrl,
        startDate,
        endDate,
        socialDetails,
        category,
        user: userId
      })

    res.status(201).json(newEvent)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error creating event.')
  }
}

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
    res.json(events)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error getting events.')
  }
}

export const getUserEvents = async (req, res) => {
  const { userId } = req.params
  try {
    const events = await Event.find({ user: userId })
    res.json(events)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error getting events.')
  }
}

export const editEvent = async (req, res) => {
  const { eventId } = req.params

  const {
    name,
    description,
    location,
    locationTips,
    customUrl,
    startDate,
    endDate,
    socialDetails,
    category,
    userId
  } = req.body

  try {
    const user = await User.findById(userId)

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        name,
        description,
        location,
        locationTips,
        customUrl,
        startDate,
        endDate,
        socialDetails,
        category,
        user
      },
      { new: true }
    )

    res.status(204).json(updatedEvent)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error editing event.')
  }
}

export const deleteEvent = async (req, res) => {
  const { eventId } = req.params

  try {
    Event.findByIdAndDelete(eventId)
    res.json({ message: 'Event deleted successfully.' })
  } catch (err) {
    console.log(err)
    res.status(500).json('Error deleting event.')
  }
}
