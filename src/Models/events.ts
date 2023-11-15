import mongoose from "mongoose";

const AttendeesSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true},
    email: {type: String, required: true },
    phone_number: { type: String, required: true  },
});

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    stack: { type: String, required: true},
    event: {type: String, required: true },
    location: { type: String, required: true  },
    date: { type: String, required: true },
    platform: { type: String, required: true },
    registration: [AttendeesSchema],
});

export const EventModel = mongoose.model('event', EventSchema);

export const getEvents = () => EventModel.find();
export const getEventById = (id: string) => EventModel.findById(id);
export const createEvent = (values: Record<string, any>) => new EventModel(values).save().then((event) => event.toObject());
export const deleteEventById = (id: string ) => EventModel.findOneAndDelete({ _id: id});
export const updateEventById = (id: string, values: Record<string, any>) => EventModel.findByIdAndUpdate(id, values);