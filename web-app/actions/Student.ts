"use server"

import client from "@/db"
export async function StudentSignup(username:string, firstname:string, lastname:string, password:string, phoneno:string, address:string, email:string){
    try {
        const student = await client.student.create({
            data:{
                username,
                email,
                firstname,
                lastname,
                phoneno,
                address,
                password
            }
        })
        if(student){
            console.log('Student created successfully with id: '+student.id);
            return student.id;
        }
    } catch (error) {
        console.log(error);
        return -1;
    }
}

export async function StudentSignin(email:string, password:string) {
    try {
        const student = await client.student.findUnique({
            where:{
                email,
                password
            }
        })
        if(student){
            console.log('student is successfully signed in having the id '+student.id);
            return student.id;
        }
    } catch (error) {
        console.log(error);
        return -1;
    }
}

export async function getStudentDetails(id:string) {
    try {
        const student = await client.student.findUnique({
            where:{
                id:id
            }
        });
        if(student){
            const username = student.username;
            const email = student.email;
            const id = student.id;

            return {username, email, id};
        }
    } catch (error) {
        console.log(error);
    }
}

export async function RegisterCourse(subjectId:string, studentemail:string) {
    console.log('hit');
    
    try {
        const student = await client.student.findUnique({
            where:{
                email:studentemail
            }
        })
        console.log(student);
        
        if(student){
            const studentid = student.id;
            const register = await client.studentsubject.create({
                data:{
                    studentid:studentid,
                    subjectid:subjectId
                }
            })
            if(register){
                console.log('Registration id ' + register.id);
                return student.id;
                
            }
        }
    } catch (error) {
        console.log(error);
        return -1;
    }
}

export async function YourCourses(studentid:string) {
    const studentSubject = await client.studentsubject.findMany({
        where:{
            studentid:studentid
        },
        select:{
            subject:true
        }
    });

    const subjects = studentSubject.map((e)=> e.subject);

    return subjects;
}