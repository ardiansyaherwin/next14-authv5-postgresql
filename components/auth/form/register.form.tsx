"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/layout/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { Alert } from "@/components/form/alert";
import { register } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ActionResponseType, AuthResponseType } from "@/types";
import { DEFAULT_LOGIN_URL } from "@/routes";

export const RegisterForm = () => {
  const [isLoggingIn, startLoggingIn] = useTransition();
  const [loginResponse, setLoginResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setLoginResponse({
      type: "",
      message: "",
    });
    startLoggingIn(async () => {
      const res = await register(values);
      const type = Object.keys(res)?.[0] as ActionResponseType;
      const message = res?.[type] || "";
      setLoginResponse({
        type,
        message,
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={DEFAULT_LOGIN_URL}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoggingIn}
                      placeholder="John Doe"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoggingIn}
                      placeholder="john@example.com"
                      type="email"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoggingIn}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <Alert
            variant={
              loginResponse?.type === "error" ? "destructive" : "constructive"
            }
            title={loginResponse?.message}
          />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
