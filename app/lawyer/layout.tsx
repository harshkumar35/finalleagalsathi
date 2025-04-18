import type React from "react"
import DashboardLayout from "@/app/(dashboard)/layout"

export default function LawyerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
