'use server'

import { auth, signIn, signOut } from "../../auth";

export async function signInGithub() {
  return await signIn('github', {redirect: true})
}

export async function signInEmail(email: string, password: string) {
  return await signIn('credentials', {
    email,
    password,
    redirectTo: '/dashboard'
  })
}

export async function logout() {
  return await signOut({
    redirectTo: '/'
  })
}

export async function getSession() {
  return await auth()
}