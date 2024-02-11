"use client";

import { settings } from "@/actions/settings";
import { Alert } from "@/components/form/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SettingsSchema } from "@/schemas/zod";
import { ActionResponseType, AuthResponseType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
  const { update } = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [updateResponse, setUpdateResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const handleUpdate = (values: z.infer<typeof SettingsSchema>) => {
    setUpdateResponse({
      type: "",
      message: "",
    });
    startTransition(() => {
      settings(values).then((res) => {
        const type = Object.keys(res)?.[0] as ActionResponseType;
        const message = res?.[type] || "";
        setUpdateResponse({
          type,
          message,
        });
        update();
      });
    });
  };

  useEffect(() => {
    if (showPassword) {
      form.register("password");
      form.register("newPassword");
    } else {
      form.unregister("password");
      form.unregister("newPassword");
    }
  }, [showPassword]);

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6"
          >
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
                        placeholder="John"
                        disabled={isPending}
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
                        placeholder="mail@domain.com"
                        disabled={isPending || user?.isOAuth}
                      />
                    </FormControl>
                    <FormDescription>Your using social account</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Label
                htmlFor="toggle-password"
                className="flex gap-2 items-center font-normal text-xs"
              >
                <Switch
                  disabled={isPending}
                  checked={showPassword}
                  name="toggle-password"
                  onCheckedChange={() => setShowPassword((prev) => !prev)}
                />
                Enable to update password
              </Label>

              {!user?.isOAuth && showPassword && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="unodostres"
                            placeholder="******"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            autoComplete="unodostres"
                            placeholder="******"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!user?.isOAuth && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Alert
              variant={
                updateResponse?.type === "error"
                  ? "destructive"
                  : "constructive"
              }
              title={updateResponse?.message}
            />
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
