import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"




export function LoginPage() {
  const { toast } = useToast()
  const redirectWithDelay = () => {
    setTimeout(() => {
      window.location.href = "/rate";
    }, 1000); // Délai de 1 seconde
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.email,
          password: data.password,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log("Connexion réussie", responseData);
        localStorage.setItem('jwt', responseData.jwt);
        toast({
          description: "connexion reussie",
          style: { backgroundColor: 'black', color: 'white',border: '2px solid white' },
        })
        redirectWithDelay();
        
      } else {
        console.error("Erreur lors de la connexion", responseData);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande", error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src="/Fond_d'ecran_login_page.jpg"
        layout="fill"
        objectFit="cover"
        alt="Fond d'écran de la page d'accueil"
      />
      <div className="absolute top-0 right-0 m-8 mt-8 mr-8 md:mr-32 z-20">
        <Image src="/Rate_logo.png" width={250} height={250} alt="Logo Rate" className="max-w-full h-auto" />
      </div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-black z-10">
        <div className="flex h-full items-center justify-center"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-end z-20 mt-32">
        <div className="max-w-md p-4 md:p-12 mr-4 md:mr-6">
          <h2 className="text-2xl font-bold mb-4 text-[#F7FDF2] text-center ">
            Le monde de la mode s&apos;ouvre à toi
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">email</FormLabel>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">password</FormLabel>
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
              <Button onClick={onSubmit} className="bg-[#4E6B47] m-4">S&apos;inscrire</Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-[#F7FDF2]">
            Pas encore de compte? {''}
            <Link href="/register" className="text-[#3D5441]">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
