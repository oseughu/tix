import { Event } from '#models/event.model'
import { Ticket } from '#models/ticket.model'

export const createTicket = async (req, res) => {
  const { eventId } = req.params

  const { type, name, description, stock, limit, perks, price, guestFee } =
    req.body

  try {
    const event = await Event.findById(eventId)

    const newTicket = new Ticket({
      type,
      name,
      description,
      stock,
      limit,
      perks,
      price,
      guestFee,
      event
    })

    await newTicket.save()
    res.status(201).json(newTicket)
  } catch (err) {
    console.log(err)
    res.status(500).json('Error creating ticket.')
  }
}
