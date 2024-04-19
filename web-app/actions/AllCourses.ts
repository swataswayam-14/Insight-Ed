"use server"

import client from "@/db"

export default async function getAllCourses() {
    try {
        const subjects = await client.subject.findMany({
            include: {
                teacher: {
                    select: {
                        firstname: true,
                        lastname: true
                    }
                }
            }
        });

        if(subjects){
            const subjectsWithTeacherNames = subjects.map(subject => {
                const teacherName = `${subject.teacher.firstname} ${subject.teacher.lastname}`;
                return {
                    ...subject,
                    teacherName
                };
            });

            //console.log(subjectsWithTeacherNames);
            return subjectsWithTeacherNames;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}