import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  username: z.string().min(2, { message: "Le nom d'utilisateur doit avoir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse e-mail valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  mobile: z.boolean().default(false).optional(),
});

export function RegisterPage() {
  const token = process.env.API_TOKEN;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      mobile: false,
    },
  });
  const mobile = form.watch("mobile");


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.mobile) {
      alert("Veuillez accepter les conditions avant de vous inscrire.");
      return;
      

    }
    console.log(mobile.valueOf);
    try {
      const response = await fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });


      const responseData = await response.json();

      if (response.ok) {
        console.log("Inscription réussie", responseData);
        return (window.location.href = "/rate");
        // Vous pouvez ici rediriger l'utilisateur vers une autre page ou afficher un message de succès
      } else {
        console.error("Erreur lors de l'inscription", responseData);
        // Gérer les erreurs de réponse, par exemple afficher un message d'erreur
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande", error);
      // Gérer les erreurs de réseau ou les erreurs inattendues
    }
  };

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <Image
          src="/Fond_d'ecran_login_page.jpg"
          layout="fill"
          objectFit="cover"
          alt="Fond d'écran de la page d'accueil"
        />
        <div className="absolute top-0 right-0 m-4 mt-2 mr-8 md:mr-24 z-20">
          <Image src="/Rate_logo.png" width={250} height={250} alt="Logo Rate" />
        </div>
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-black z-10">
          <div className="flex h-full items-center justify-center"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-end z-20 mt-32 md:mt-32 ">
          <div className="max-w-md p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#F7FDF2] text-center hidden md:block">
              Le monde de la mode s&apos;ouvre à toi
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input className="text-white" placeholder="Rate_user" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input className="text-white" placeholder="Rate_user@rate.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input className="text-white" placeholder="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="bg-[#4E6B47] flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox

                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Use different settings for my mobile devices
                        </FormLabel>
                        <FormDescription>
                          <span className="text-white">condition d&apos;utilisateu{" "}</span> 
                          <Link href="/examples/forms">mobile settings</Link> 
                          <span className="text-white">page.</span> 
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <Button onClick={onSubmit} className="bg-[#4E6B47] m-4">S&apos;inscrire</Button>
              </form>
            </Form>
            <p className="mt-4 text-center text-[#F7FDF2]">
            déjà un compte? {''}
            <Link href="/login" className="text-[#3D5441]">
              se connecter
            </Link>
          </p>
          </div>
        </div >
      </div>
    </>
  );
}
