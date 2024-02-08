"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
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
// import { FormError } from "@/components/form-error";
import { Alert } from "@/components/form/alert";
import { login } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ActionResponseType, AuthResponseType } from "@/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";

  const [isLoggingIn, startLoggingIn] = useTransition();
  const [loginResponse, setLoginResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setLoginResponse({
      type: "",
      message: "",
    });
    startLoggingIn(async () => {
      const res = await login(values);
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
      headerLabel="Welcome Back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                  <Button
                    size="sm"
                    variant="link"
                    className="px-0 font-normal"
                    asChild
                  >
                    <Link href="/auth/reset">Forgot password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={urlError} /> */}
          <Alert
            variant={
              loginResponse?.type === "error" || !!urlError
                ? "destructive"
                : "constructive"
            }
            title={loginResponse?.message || urlError}
          />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
