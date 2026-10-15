import { prisma } from "../lib/prisma";

const mapInstitution = (institution: {
  id: number;
  institution_name: string;
  head_of_institution: string | null;
  address_lane1: string | null;
  address_lane2: string | null;
  address_lane3: string | null;
  contact_number: string | null;
  whatsapp_number: string | null;
}) => ({
  institution_id: institution.id,
  institution_name: institution.institution_name,
  head_of_institution: institution.head_of_institution,
  institution_address_lane1: institution.address_lane1,
  institution_address_lane2: institution.address_lane2,
  institution_address_lane3: institution.address_lane3,
  institution_contact_mobile: institution.contact_number,
  institution_whatsapp: institution.whatsapp_number,
});

export const listLibraries = async () => {
  const libraries = await prisma.user.findMany({
    where: { role: "user" },
    select: {
      id: true,
      email: true,
      name: true,
      library_name: true,
      library_type: true,
      library_address_lane1: true,
      library_address_lane2: true,
      library_address_lane3: true,
      library_contact_mobile: true,
      library_contact_landline: true,
      library_establishment_date: true,
      library_incorporation_act: true,
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
      image_url: true,
      description: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return libraries;
};

export const getStats = async () => {
  const total_users = await prisma.user.count({ where: { role: "user" } });

  const total_registered_members = await prisma.user.count({
    where: { role: "user", user_status: "APPROVED" },
  });

  const total_institutions = await prisma.institution.count();

  return { total_users, total_registered_members, total_institutions };
};

export const listInstitutions = async () => {
  const institutions = await prisma.institution.findMany({
    orderBy: { institution_name: "asc" },
  });

  return institutions.map(mapInstitution);
};

export const createInstitution = async (data: Record<string, unknown>) => {
  const institution = await prisma.institution.create({
    data: {
      institution_name: data.institution_name as string,
      head_of_institution: (data.head_of_institution as string) ?? null,
      address_lane1: (data.address_lane1 as string) ?? null,
      address_lane2: (data.address_lane2 as string) ?? null,
      address_lane3: (data.address_lane3 as string) ?? null,
      contact_number: (data.contact_number as string) ?? null,
      whatsapp_number: (data.whatsapp_number as string) ?? null,
    },
  });

  return mapInstitution(institution);
};

export const updateInstitution = async (
  id: number,
  data: Record<string, unknown>,
) => {
  const payload: Record<string, unknown> = {};

  if (data.institution_name !== undefined)
    payload.institution_name = data.institution_name;
  if (data.head_of_institution !== undefined)
    payload.head_of_institution = data.head_of_institution;
  if (data.address_lane1 !== undefined) payload.address_lane1 = data.address_lane1;
  if (data.address_lane2 !== undefined) payload.address_lane2 = data.address_lane2;
  if (data.address_lane3 !== undefined) payload.address_lane3 = data.address_lane3;
  if (data.contact_number !== undefined)
    payload.contact_number = data.contact_number;
  if (data.whatsapp_number !== undefined)
    payload.whatsapp_number = data.whatsapp_number;

  const institution = await prisma.institution.update({
    where: { id },
    data: payload,
  });

  return mapInstitution(institution);
};

export const deleteInstitution = async (id: number) => {
  await prisma.institution.delete({ where: { id } });
  return null;
};

export const updateUserStatus = async (
  id: number,
  status: string,
  active: boolean,
) => {
  const user = await prisma.user.update({
    where: { id },
    data: { user_status: status, is_active: active },
    select: {
      id: true,
      email: true,
      name: true,
      library_name: true,
      library_type: true,
      library_address_lane1: true,
      library_address_lane2: true,
      library_address_lane3: true,
      library_contact_mobile: true,
      library_contact_landline: true,
      library_establishment_date: true,
      library_incorporation_act: true,
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
      image_url: true,
      description: true,
      createdAt: true,
    },
  });

  return user;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({ where: { id } });
  return null;
};

export const listWithdrawRequests = async () => {
  const requests = await prisma.withdrawRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const userIds = [...new Set(requests.map((request) => request.user_id))];

  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      email: true,
      library_name: true,
      user_status: true,
    },
  });

  const userMap = new Map(users.map((user) => [user.id, user]));

  return requests.map((request) => {
    const user = userMap.get(request.user_id);
    return {
      id: request.id,
      request_id: request.id,
      user_id: request.user_id,
      user_email: user?.email ?? null,
      library_name: user?.library_name ?? null,
      user_status: user?.user_status ?? null,
      message: request.message,
      status: request.status,
      created_at: request.createdAt,
    };
  });
};

export const approveWithdrawRequest = async (id: number) => {
  const request = await prisma.withdrawRequest.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  await prisma.user.update({
    where: { id: request.user_id },
    data: { user_status: "WITHDRAWN", is_active: false },
  });

  return request;
};

export const rejectWithdrawRequest = async (id: number) => {
  const request = await prisma.withdrawRequest.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  return request;
};
