"use client"

import { useForm } from "react-hook-form"
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation"

import { LogOut } from "lucide-react"
import { useToast } from "../../../../../hooks/use-toast"
import { Form } from "../../ui/form"
import { Button } from "../../ui/button"

type LogoutProps = {
  size: 'default' | 'icon' | 'lg' | 'sm'
  variant: "default" | "destructive" | "ghost" | "outline" | "link" | "secondary"
  className?: string
}

export default function Logout(props: LogoutProps) {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm()

  async function onSubmit() {
    signOut({redirect: false})
      .then(() => {
        toast({
          title: "Sesión finalizada ✅",
          description: "Gracias por usar el servicio!",
          variant: "success" 
        })
        router.refresh()
      })
      .catch(error => console.log(error))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center ${props.className}`} >
        <Button variant={props.variant} type="submit" size={props.size} className={props.className}>
          <LogOut />
          Cerrar sesión
        </Button>
      </form>
    </Form>

  )
}