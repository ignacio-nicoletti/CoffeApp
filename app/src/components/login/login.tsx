"use client";
// imagenes
import trustLogo from "@assets/logoTrustFund.svg";
import logoMobile from "@assets/logo.svg";

import { loginFormController } from "./login.controller/login.controller";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputPassword from "../inputs/inputPassword";
import { Button } from "../ui/button";
import Modal from "../modal";


function LoginForm() {
  const { emailValue, setEmailValue, error, setError, form, onSubmit, handleClickForgotPassword } =
    loginFormController();

  return (
    <section className="w-full h-screen flex p-0 m-0">
      <div className=" flex justify-center items-center p-4 md:w-full w-3/4 mx-auto mt-16 md:m-auto">
        <div className="w-full  flex flex-col gap-6">
          <h1 className="text-4xl font-bold leading-10 tracking-tighter ">Iniciar sesión</h1>
          <p className="text-base text-slate-500 font-medium">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 items-center  text-center w-full  "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label className="text-start flex w-full" htmlFor="email">
                      Correo electrónico
                    </Label>
                    <FormControl>
                      <Input
                        placeholder="Ingresá tu correo electrónico"
                        id="email"
                        className="border border-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label htmlFor="password" className="text-start flex w-full text-foreground">
                      Contraseña
                    </Label>
                    <FormControl>
                      {/* Pasarle al InputPassword valores de react-form */}
                      <InputPassword
                        id="password"
                        // icons={{ Eye, eyeSlash }}
                        value={field.value}
                        onChange={field.onChange}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Modal
                  isOTP={false}
                  showModalText="¿Olvidaste tu contraseña?"
                  showModalStyles="h-min bg-transparent p-0 text-base font-medium duration-100 hover:cursor-pointer text-foreground"
                  title="Recupera tu contraseña"
                  text="Ingresá tu correo electrónico y recibirás un código para recuperar tu contraseña."
                  btnConfirmText="Enviar"
                  btnRejectText="Cancelar"
                  btnRejectStyles=""
                  btnConfirmStyles="bg-primary duration-100 hover:text-muted-foreground border-none outline-none"
                  onSubmit={handleClickForgotPassword}
                >
                  {/* <EmailForgotPassReqForm
                    emailValue={emailValue}
                    setEmailValue={setEmailValue}
                    error={error}
                    setError={setError}
                  /> */}
                </Modal>
              <Button
                type="submit"
                className="w-full  duration-100 hover:bg-primary/80 hover:text-white border-none"
                disabled={!form.formState.isValid}
              >
                Ingresar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
