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
                    },


                    {
                        startedAt: "2024-08-12T15:52:52.574Z",
                        finishedAt: "2024-08-12T17:22:52.574Z",
                        duration: 90,
                        durationWithOvertime: 90,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-12T17:32:52.574Z",
                        finishedAt: "2024-08-12T19:02:52.574Z",
                        duration: 90,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-12T20:00:52.574Z",
                        finishedAt: "2024-08-12T21:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-12T22:00:52.574Z",
                        finishedAt: "2024-08-12T23:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    

                    {
                        startedAt: "2024-08-15T15:52:52.574Z",
                        finishedAt: "2024-08-15T17:22:52.574Z",
                        duration: 90,
                        durationWithOvertime: 90,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-15T17:32:52.574Z",
                        finishedAt: "2024-08-15T19:02:52.574Z",
                        duration: 90,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-16T20:00:52.574Z",
                        finishedAt: "2024-08-16T21:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-16T22:00:52.574Z",
                        finishedAt: "2024-08-16T23:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },





                    {
                        startedAt: "2024-08-08T11:00:52.574Z",
                        finishedAt: "2024-08-08T12:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 90,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-08T12:32:52.574Z",
                        finishedAt: "2024-08-08T13:32:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-08T15:00:52.574Z",
                        finishedAt: "2024-08-08T16:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-07T22:00:52.574Z",
                        finishedAt: "2024-08-07T23:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },



                    {
                        startedAt: "2024-08-05T11:00:52.574Z",
                        finishedAt: "2024-08-05T12:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 90,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-05T12:32:52.574Z",
                        finishedAt: "2024-08-05T13:32:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-05T15:00:52.574Z",
                        finishedAt: "2024-08-05T16:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-05T17:00:52.574Z",
                        finishedAt: "2024-08-05T18:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },





                    {
                        startedAt: "2024-08-04T11:00:52.574Z",
                        finishedAt: "2024-08-04T12:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 90,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-03T12:32:52.574Z",
                        finishedAt: "2024-08-03T13:32:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-08-01T15:00:52.574Z",
                        finishedAt: "2024-08-01T16:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-07-28T17:00:52.574Z",
                        finishedAt: "2024-07-28T18:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },






                    {
                        startedAt: "2024-07-26T12:00:52.574Z",
                        finishedAt: "2024-07-26T13:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    {
                        startedAt: "2024-07-26T14:00:52.574Z",
                        finishedAt: "2024-07-26T15:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },



                    {
                        startedAt: "2024-07-25T12:00:52.574Z",
                        finishedAt: "2024-07-25T13:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    {
                        startedAt: "2024-07-25T14:00:52.574Z",
                        finishedAt: "2024-07-25T15:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },




                    {
                        startedAt: "2024-07-22T12:00:52.574Z",
                        finishedAt: "2024-07-22T13:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    {
                        startedAt: "2024-07-22T14:00:52.574Z",
                        finishedAt: "2024-07-22T15:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-07-22T16:00:52.574Z",
                        finishedAt: "2024-07-22T17:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    {
                        startedAt: "2024-07-22T18:00:52.574Z",
                        finishedAt: "2024-07-22T19:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },


                    


                    {
                        startedAt: "2024-07-20T12:00:52.574Z",
                        finishedAt: "2024-07-20T13:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },

                    {
                        startedAt: "2024-07-20T14:00:52.574Z",
                        finishedAt: "2024-07-20T15:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                    {
                        startedAt: "2024-07-20T16:00:52.574Z",
                        finishedAt: "2024-07-20T17:00:52.574Z",
                        duration: 60,
                        durationWithOvertime: 60,
                        successful: true
                    },
                ]
            }
        }
    })
}

main().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e)=> {
    console.error(e)
    await prisma.$disconnect
    process.exit(1)
})