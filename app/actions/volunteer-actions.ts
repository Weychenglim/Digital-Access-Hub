"use server"

import { revalidatePath } from "next/cache"
import clientPromise from "@/lib/mongodb"

export interface VolunteerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  interests: string[]
  availability: string[]
  experience: string
  message: string
  submittedAt?: Date
}

export async function submitVolunteerApplication(formData: VolunteerFormData) {
  try {
    const client = await clientPromise
    const db = client.db("digital_access_hub")

    // Add submission timestamp
    const dataToInsert = {
      ...formData,
      submittedAt: new Date(),
    }

    // Insert into volunteers collection
    const result = await db.collection("volunteers").insertOne(dataToInsert)

    revalidatePath("/volunteer")

    return {
      success: true,
      message: "Volunteer application submitted successfully!",
      id: result.insertedId.toString(),
    }
  } catch (error) {
    console.error("Error submitting volunteer application:", error)
    return {
      success: false,
      message: "There was an error submitting your application. Please try again.",
    }
  }
}
