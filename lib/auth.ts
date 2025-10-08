"use client"

export interface User {
  email: string
  name: string
}

export const AUTH_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@ahmedmagdy.com",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123",
}

export function login(email: string, password: string): User | null {
  if (email === AUTH_CREDENTIALS.email && password === AUTH_CREDENTIALS.password) {
    const user: User = { email, name: "Admin" }
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user))
    }
    return user
  }
  return null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

export function getUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}
