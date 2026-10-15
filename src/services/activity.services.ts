import { prisma } from "../lib/prisma";

const activityInclude = {
  user: {
    select: {
      id: true,
      email: true,
      library_name: true,
    },
  },
};

type ActivityWithUser = {
  user?: { id: number; email: string; library_name: string | null } | null;
  [key: string]: unknown;
};

const mapActivity = (activity: ActivityWithUser) => {
  const { user, ...rest } = activity;
  return {
    ...rest,
    user_email: user?.email ?? null,
    user_name: user?.library_name ?? null,
  };
};

export const listActivities = async () => {
  const activities = await prisma.activity.findMany({
    include: activityInclude,
    orderBy: { activity_date: "desc" },
  });

  return activities.map(mapActivity);
};

export const listPublished = async () => {
  const activities = await prisma.activity.findMany({
    where: { publish: true },
    include: activityInclude,
    orderBy: { activity_date: "asc" },
  });

  return activities.map(mapActivity);
};

export const listByUser = async (user_id: number) => {
  const activities = await prisma.activity.findMany({
    where: { user_id },
    include: activityInclude,
    orderBy: { activity_date: "desc" },
  });

  return activities.map(mapActivity);
};

export const getActivity = async (id: number) => {
  const activity = await prisma.activity.findUnique({
    where: { id },
    include: activityInclude,
  });

  return activity ? mapActivity(activity) : null;
};

export const createActivity = async (
  user_id: number,
  data: Record<string, unknown>,
  imageUrl?: string,
) => {
  const activity = await prisma.activity.create({
    data: {
      user_id,
      title: data.title as string,
      subtitle: (data.subtitle as string) ?? null,
      activity_date: new Date(data.activity_date as string),
      activity_time: (data.activity_time as string) ?? null,
      venue: (data.venue as string) ?? null,
      description: (data.description as string) ?? null,
      image_url: imageUrl ? `/uploads/${imageUrl}` : null,
      type: (data.type as string) ?? "Workshop",
      organized_by: (data.organized_by as string) ?? null,
      publish: data.publish === "true" || data.publish === true,
    },
    include: activityInclude,
  });

  return mapActivity(activity);
};

export const updateActivity = async (
  id: number,
  data: Record<string, unknown>,
  imageUrl?: string,
) => {
  const payload: Record<string, unknown> = {};

  if (data.title !== undefined) payload.title = data.title;
  if (data.subtitle !== undefined) payload.subtitle = data.subtitle;
  if (data.activity_date !== undefined)
    payload.activity_date = new Date(data.activity_date as string);
  if (data.activity_time !== undefined) payload.activity_time = data.activity_time;
  if (data.venue !== undefined) payload.venue = data.venue;
  if (data.description !== undefined) payload.description = data.description;
  if (data.type !== undefined) payload.type = data.type;
  if (data.organized_by !== undefined) payload.organized_by = data.organized_by;
  if (data.publish !== undefined)
    payload.publish = data.publish === "true" || data.publish === true;
  if (imageUrl) payload.image_url = `/uploads/${imageUrl}`;

  const activity = await prisma.activity.update({
    where: { id },
    data: payload,
    include: activityInclude,
  });

  return mapActivity(activity);
};

export const deleteActivity = async (id: number) => {
  await prisma.activity.delete({ where: { id } });
  return null;
};
