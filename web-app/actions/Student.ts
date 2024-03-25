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
            
        }
    } catch (error) {
        console.log(error);
        
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
            
        }
    } catch (error) {
        console.log(error);
        
    }
}