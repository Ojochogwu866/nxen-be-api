import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required:  true},
    email:{ type: String, required: true},
    phone_number:{ type: String, required: true},
    date_of_birth: { type: String, required: true},
    country_of_residence:{ type: String, required: true},
    preferred_time_zone:{ type: String, required: true},
    linkedin: { type: String, required: true},
    programs: { type: [String], required: true},
    yearsOfExperience:{ type: String, required: true},
    leadershipLevel:{ type: String, required: true},
    skillset: { type: [String], required: true},
    mentorsyearsOfExperience:{ type: String, required: true},
    mentee_expectation:{ type: String, required: true},
    mentees_number:  { type: String, required: true },
    other_info:  { type: String, required: true},
});

export const MentorModel = mongoose.model('mentor', MentorSchema);

export const getMentors = () => MentorModel.find();
export const getMentorById = (id: string) => MentorModel.findById(id);
export const createMentorRole = (values: Record<string, any>) => new MentorModel(values).save().then((mentor) => mentor.toObject());
export const deleteMentorRoleById = (id: string ) => MentorModel.findOneAndDelete({ _id: id});
export const updateMentorRoleById = (id: string, values: Record<string, any>) => MentorModel.findByIdAndUpdate(id, values);