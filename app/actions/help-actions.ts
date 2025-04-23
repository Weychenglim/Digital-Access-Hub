"use server"

import { revalidatePath } from "next/cache"
import clientPromise from "@/lib/mongodb"

export interface AssistanceRequestData {
  name: string
  email: string
  phone: string
  helpType: string
  message: string
  submittedAt?: Date
  status?: string
}

export async function submitAssistanceRequest(formData: AssistanceRequestData) {
  try {
    const client = await clientPromise
    const db = client.db("digital_access_hub")

    // Add submission timestamp and initial status
    const dataToInsert = {
      ...formData,
      submittedAt: new Date(),
      status: "pending", // pending, assigned, completed, etc.
    }

    // Insert into assistance_requests collection
    const result = await db.collection("assistance_requests").insertOne(dataToInsert)

    revalidatePath("/help")

    return {
      success: true,
      message: "Assistance request submitted successfully!",
      id: result.insertedId.toString(),
    }
  } catch (error) {
    console.error("Error submitting assistance request:", error)
    return {
      success: false,
      message: "There was an error submitting your request. Please try again.",
    }
  }
}
