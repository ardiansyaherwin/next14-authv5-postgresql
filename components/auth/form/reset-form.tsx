"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ResetSchema } from "@/schemas";
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
import { resetPassword } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ActionResponseType, AuthResponseType } from "@/types";
import { DEFAULT_LOGIN_URL } from "@/routes";

export const ResetForm = () => {
  const [isLoading, startTransition] = useTransition();
  const [loginResponse, setLoginResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setLoginResponse({
      type: "",
      message: "",
    });

    startTransition(async () => {
      const res = await resetPassword(values);
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
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref={DEFAULT_LOGIN_URL}
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
                      disabled={isLoading}
                      placeholder="john@example.com"
                      type="email"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
