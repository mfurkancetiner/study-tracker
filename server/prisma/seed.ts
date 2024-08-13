import { PrismaClient } from "@prisma/client";
import { guest } from "../src/database/userSeed";

const prisma = new PrismaClient()

async function main() {
    const guest = await prisma.user.upsert({
        where:{email:'guest@mail.com'},
        update:{},
        create:{
            username: 'guest',
            email:'guest@mail.com',
            password: '123456',
            activities: {
                create: [
                    {
                        startedAt: "2024-08-10T14:47:52.574Z",
                        finishedAt: "2024-08-10T15:57:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-10T15:47:52.574Z",
                        finishedAt: "2024-08-10T16:57:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-10T17:47:52.574Z",
                        finishedAt: "2024-08-10T18:57:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-10T19:47:52.574Z",
                        finishedAt: "2024-08-10T20:57:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    }
                ]
            }
        }
    })
    console.log({guest})
}

main().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e)=> {
    console.error(e)
    await prisma.$disconnect
    process.exit(1)
})