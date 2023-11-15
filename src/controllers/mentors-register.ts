import express from 'express';

import { getMentors, getMentorById, deleteMentorRoleById,  createMentorRole } from '../Models/register-mentor';

//get all mentors
export const getAllMentors = async (req: express.Request, res: express.Response) => {
    try {
        const mentors = await getMentors();
    return res.status(200).json(mentors);
    } catch (error) {
        console.error(error);
    return res.sendStatus(400);
    }
}

//new mentor registration

export const newMentor = async (req: express.Request, res: express.Response) => {

        try {
            const {   firstname, lastname, phone_number, email, country_of_residence, date_of_birth, preferred_time_zone, linkedin, programs: [], skillset:[], yearsOfExperience, 
                leadershipLevel, mentorsYearsOfExperience, mentees_number, mentee_expectation, other_info  } = req.body;
            const newMentor = await createMentorRole({
                firstname, lastname, email, phone_number, country_of_residence, date_of_birth, preferred_time_zone, linkedin, programs: [], skillset:[], yearsOfExperience, 
                leadershipLevel, mentorsYearsOfExperience, mentees_number, mentee_expectation, other_info 
        });
        return res.status(201).json(newMentor);
        } catch (error) {
            console.error(error);
        return res.sendStatus(500);
    }
};

// Update an Mentors role

export const updateMentorsRole = async (req: express.Request, res: express.Response) => 
{
    try {
        const { id } = req.params;
        const {   firstname, lastname, email, phone_number, country_of_residence, date_of_birth, preferred_time_zone, linkedin, programs, skillset, yearsOfExperience, 
                leadershipLevel, mentorsYearsOfExperience, mentees_number, mentee_expectation, other_info  } = req.body;

        const mentorship = await getMentorById(id);

        mentorship.firstname = firstname,
        mentorship.lastname = lastname,
        mentorship.email = email,
        mentorship.phone_number = phone_number,
        mentorship.country_of_residence = country_of_residence,
        mentorship.date_of_birth = date_of_birth,
        mentorship.preferred_time_zone = preferred_time_zone,
        mentorship.linkedin = linkedin, mentorship.programs = programs || [], mentorship.skillset = skillset || [], mentorship.yearsOfExperience = yearsOfExperience;
        mentorship.leadershipLevel = leadershipLevel, mentorship.mentorsyearsOfExperience = mentorsYearsOfExperience,
        mentorship.mentees_number = mentees_number, mentorship.mentee_expectation = mentee_expectation, mentorship.other_info = other_info;

        await mentorship.save()
            if (mentorship) {
                return res.status(200).json(mentorship);
            } else {
            return res.status(404).json({ error: 'Event not found' });
            }
            } catch (error) {
                console.error(error);
                return res.sendStatus(500);
    }
};

// Delete an mentors-role
export const deleteMentorsRole = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleteRole = await deleteMentorRoleById(id);
        return res.json(deleteRole)

    }catch (error){

    }
}
