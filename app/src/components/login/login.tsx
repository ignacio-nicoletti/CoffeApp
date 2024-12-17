"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { toast } from "../../../../hooks/use-toast"
import { Button } from "../ui/button"
import { registerController } from "./login.controller/login.controller"

export default function AuthForm() {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { form, onSubmit } = registerController(isRegister, setIsLoading, router)

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{isRegister ? "Regístrate" : "Iniciar Sesión"}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {isRegister
            ? "Crea una cuenta para empezar a usar nuestros servicios"
            : "Ingresa tus credenciales para acceder a tu cuenta"}
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
          {isRegister && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? isRegister
                ? "Registrando..."
                : "Iniciando sesión..."
              : isRegister
              ? "Registrarse"
              : "Iniciar Sesión"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-blue-500 hover:underline"
        >
          {isRegister
            ? "¿Ya tienes una cuenta? Inicia sesión"
            : "¿No tienes una cuenta? Regístrate"}
        </button>
      </div>
    </div>
  )
}
