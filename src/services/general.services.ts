import { prisma } from "../lib/prisma";

export const listMembers = async () => {
  const members = await prisma.user.findMany({
    where: { role: "user", user_status: "APPROVED" },
    select: {
      id: true,
      library_name: true,
      library_type: true,
      library_nature: true,
      library_address_lane1: true,
      library_address_lane2: true,
      library_address_lane3: true,
      library_contact_mobile: true,
      library_contact_landline: true,
      officer_name: true,
      officer_designation: true,
      officer_email: true,
      officer_contact_number: true,
      institution_name: true,
      description: true,
      image_url: true,
      createdAt: true,
    },
    orderBy: { library_name: "asc" },
  });

  return members;
};
