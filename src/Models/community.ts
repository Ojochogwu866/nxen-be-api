import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    options: { type: [String], required: true},
    email: { type:  String, required: true, unique: true }
});

export const CommunityModel = mongoose.model('event', CommunitySchema);

export const getInterest = () => CommunityModel.find();
export const getInterestsByEmail = (email: string) => CommunityModel.findOne({ email })
export const createInterest = (values: Record<string, any>) => new CommunityModel(values).save().then((interest) => interest.toObject());