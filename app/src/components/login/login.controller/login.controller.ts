import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { loginSchema, registerSchema } from "./schemas"
import { toast } from "../../../../../hooks/use-toast"

export const registerController = (
  isRegister: boolean,
  setIsLoading: (loading: boolean) => void,
  router: any
) => {
  const schema = isRegister ? registerSchema : loginSchema

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true)

    try {
      const endpoint = isRegister ? "/api/user" : "/api/auth/signin"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          title: isRegister ? "Registro exitoso" : "Inicio de sesión exitoso",
          description: isRegister
            ? "Tu cuenta ha sido creada correctamente."
            : "Bienvenido de vuelta!",
        })

        if (!isRegister) router.push("/dashboard") // Redirige a dashboard tras login
        form.reset()
      } else {
        const errorMessage = await response.text()
        toast({ title: "Error", description: errorMessage })
      }
    } catch (error) {
      console.error(error)
      toast({ title: "Error", description: "Ocurrió un problema inesperado." })
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit }
}
