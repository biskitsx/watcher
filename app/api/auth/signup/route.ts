import prisma from '@/prisma';
import { connectToDatabase } from '@/prisma/connect';
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json(); 
        if (!name || !email || !password) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,   
            }
        })

        return Response.json({ message: "User created successfully", data: newUser }, { status: 201 });

    } catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
} 