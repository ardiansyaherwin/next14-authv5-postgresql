"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas/zod";
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
import { Alert } from "@/components/form/alert";
import { newPassword, resetPassword } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ActionResponseType, AuthResponseType } from "@/types";
import { DEFAULT_LOGIN_URL } from "@/routes";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, startTransition] = useTransition();
  const [loginResponse, setLoginResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setLoginResponse({
      type: "",
      message: "",
    });

    startTransition(async () => {
      const res = await newPassword(values, token);
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
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref={DEFAULT_LOGIN_URL}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Alert
            variant={
              loginResponse?.type === "error" ? "destructive" : "constructive"
            }
            title={loginResponse?.message}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
