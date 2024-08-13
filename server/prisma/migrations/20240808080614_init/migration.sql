-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "breakStarts" TIMESTAMP(3)[],
    "breakEnds" TIMESTAMP(3)[],
    "duration" INTEGER NOT NULL,
    "successful" BOOLEAN,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
