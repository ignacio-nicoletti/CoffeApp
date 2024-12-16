"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "../../../hooks/use-toast"
import { Button } from "./ui/button"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Aquí iría la lógica de autenticación
    console.log(values)

    // Simulamos una demora en la respuesta
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)

    // Mostramos un toast de éxito
    toast({
      title: "Inicio de sesión exitoso",
      description: "Bienvenido de vuelta!",
    })

    // Redirigimos al usuario (esto es solo un ejemplo)
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="tu@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full " disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <Link href="/forgot-password" className="text-blue-500 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </div>
    </div>
  )
}

