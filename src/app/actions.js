import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";

export async function createInvite(formData) {
  "use server";
  
  const coupleNames = formData.get("coupleNames");
  const dateStr = formData.get("date");
  const location = formData.get("location");
  const message = formData.get("message") || "";
  
  let imageUrl = null;
  const imageField = formData.get("image");
  if (imageField && imageField.size > 0) {
    const arrayBuffer = await imageField.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    imageUrl = `data:${imageField.type};base64,${base64}`;
  }
  
  const invite = await prisma.invitation.create({
    data: {
      coupleNames,
      date: new Date(dateStr),
      location,
      message,
      imageUrl,
    }
  });
  
  redirect(`/dashboard/${invite.id}`);
}

export async function submitRsvp(formData) {
  "use server";
  
  const invitationId = formData.get("invitationId");
  const name = formData.get("name");
  const attendingStatus = formData.get("attending");
  const note = formData.get("note") || "";
  
  const attending = attendingStatus === "yes";

  await prisma.guest.create({
    data: {
      invitationId,
      name,
      attending,
      note,
    }
  });

  // Revalidate path is optional, but helps cache invalidation. Since we redirect or show success, it's fine.
  // We will redirect them back to the invite with a success flag
  redirect(`/invite/${invitationId}?success=true`);
}
