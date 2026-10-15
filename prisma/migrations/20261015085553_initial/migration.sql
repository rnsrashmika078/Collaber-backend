-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "picture" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "library_name" TEXT,
    "library_address_lane1" TEXT,
    "library_address_lane2" TEXT,
    "library_address_lane3" TEXT,
    "library_contact_mobile" TEXT,
    "library_contact_landline" TEXT,
    "library_establishment_date" TIMESTAMP(3),
    "library_incorporation_act" TEXT,
    "library_type" TEXT,
    "library_nature" TEXT,
    "officer_name" TEXT,
    "officer_designation" TEXT,
    "officer_email" TEXT,
    "officer_contact_number" TEXT,
    "officer_whatsapp_number" TEXT,
    "institution_name" TEXT,
    "head_of_institution" TEXT,
    "institution_address_lane1" TEXT,
    "institution_address_lane2" TEXT,
    "institution_address_lane3" TEXT,
    "institution_contact_mobile" TEXT,
    "institution_whatsapp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
