-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "institution_name" TEXT NOT NULL,
    "head_of_institution" TEXT,
    "address_lane1" TEXT,
    "address_lane2" TEXT,
    "address_lane3" TEXT,
    "contact_number" TEXT,
    "whatsapp_number" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);
