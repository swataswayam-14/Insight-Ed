"use server"

import client from "@/db"
export async function TeacherSignup(username:string, firstname:string, lastname:string, password:string, phoneno:string, address:string, email:string){
    try {
        const teacher = await client.teacher.create({
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
        if(teacher){
            console.log('Teacher created successfully with id: '+teacher.id);
            return true
        }
    } catch (error) {
        console.log(error);
        return false
    }
}

export async function TeacherSignin(email:string, password:string) {
    try {
        const teacher = await client.teacher.findUnique({
            where:{
                email,
                password
            }
        })
        if(teacher){
            console.log('Teacher is successfully signed in having the id '+teacher.id);
            
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}