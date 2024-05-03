import prisma from ".";

export const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error: any) {
        console.error("Error connecting to database", error.message);
    }
}