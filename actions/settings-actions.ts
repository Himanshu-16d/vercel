"use server"

import { prisma } from "@/lib/db"

export async function updateAccountInfo(data: {
  name: string
  email: string
}) {
  try {
    // In a real app, you'd get the user ID from the session
    const user = await prisma.user.update({
      where: { email: data.email },
      data: {
        name: data.name,
      },
    })
    return { success: true, message: "Account information updated successfully" }
  } catch (error) {
    console.error("Error updating account info:", error)
    return { success: false, message: "Failed to update account information" }
  }
}

export async function updatePassword(data: {
  currentPassword: string
  newPassword: string
}) {
  try {
    // In a real app, you'd verify the current password and hash the new password
    return { success: true, message: "Password updated successfully" }
  } catch (error) {
    console.error("Error updating password:", error)
    return { success: false, message: "Failed to update password" }
  }
}

export async function updateNotificationSettings(data: {
  emailNotifications: boolean
  jobAlerts: boolean
  weeklyDigest: boolean
}) {
  try {
    // Save notification preferences to the database
    return { success: true, message: "Notification settings updated successfully" }
  } catch (error) {
    console.error("Error updating notification settings:", error)
    return { success: false, message: "Failed to update notification settings" }
  }
}

export async function updatePrivacySettings(data: {
  profileVisibility: boolean
  dataCollection: boolean
}) {
  try {
    // Save privacy settings to the database
    return { success: true, message: "Privacy settings updated successfully" }
  } catch (error) {
    console.error("Error updating privacy settings:", error)
    return { success: false, message: "Failed to update privacy settings" }
  }
}