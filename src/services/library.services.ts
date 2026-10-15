import { prisma } from "../lib/prisma";

const userSelect = {
  id: true,
  email: true,
  name: true,
  picture: true,
  role: true,
  library_name: true,
  library_address_lane1: true,
  library_address_lane2: true,
  library_address_lane3: true,
  library_contact_mobile: true,
  library_contact_landline: true,
  library_establishment_date: true,
  library_incorporation_act: true,
  library_type: true,
  library_nature: true,
  officer_name: true,
  officer_designation: true,
  officer_email: true,
  officer_contact_number: true,
  officer_whatsapp_number: true,
  institution_name: true,
  head_of_institution: true,
  institution_address_lane1: true,
  institution_address_lane2: true,
  institution_address_lane3: true,
  institution_contact_mobile: true,
  institution_whatsapp: true,
  user_status: true,
  is_active: true,
  description: true,
  image_url: true,
  createdAt: true,
  updatedAt: true,
};

export const getLibrary = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
  return user;
};

export const updateLibrary = async (
  id: number,
  data: Record<string, unknown>,
  imageUrl?: string,
) => {
  const allowedFields = [
    "name",
    "library_name",
    "library_type",
    "library_nature",
    "library_incorporation_act",
    "library_contact_mobile",
    "library_contact_landline",
    "library_address_lane1",
    "library_address_lane2",
    "library_address_lane3",
    "officer_name",
    "officer_designation",
    "officer_email",
    "officer_contact_number",
    "officer_whatsapp_number",
    "institution_name",
    "head_of_institution",
    "institution_address_lane1",
    "institution_address_lane2",
    "institution_address_lane3",
    "institution_contact_mobile",
    "institution_whatsapp",
    "description",
  ];

  const payload: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (data[field] !== undefined) {
      payload[field] = data[field];
    }
  }

  if (data.library_establishment_date !== undefined) {
    payload.library_establishment_date = data.library_establishment_date
      ? new Date(data.library_establishment_date as string)
      : null;
  }

  if (imageUrl) {
    payload.image_url = `/uploads/${imageUrl}`;
  }

  const updated = await prisma.user.update({
    where: { id },
    data: payload,
    select: userSelect,
  });

  return updated;
};

export const createWithdrawRequest = async (user_id: number, message: string) => {
  const request = await prisma.withdrawRequest.create({
    data: { user_id, message },
  });
  return request;
};
