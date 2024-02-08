"use client";

import { newVerification } from "@/actions/auth";
import { CardWrapper } from "@/components/auth/layout/card-wrapper";
import { Alert } from "@/components/form/alert";
import { DEFAULT_LOGIN_URL } from "@/routes";
import { ActionResponseType, AuthResponseType } from "@/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GridLoader } from "react-spinners";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loginResponse, setLoginResponse] = useState<AuthResponseType>({
    type: "",
    message: "",
  });

  const onSubmit = useCallback(() => {
    if (!token) {
      setLoginResponse({
        type: "error",
        message: "Missing token!",
      });
      return;
    }
    newVerification(token)
      .then((data) => {
        const type = Object.keys(data)?.[0] as ActionResponseType;
        const message = data?.[type] || "";
        setLoginResponse({
          type,
          message,
        });
      })
      .catch(() => {
        setLoginResponse({
          type: "error",
          message: "Something went wrong",
        });
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref={DEFAULT_LOGIN_URL}
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center text-rose-300 flex-col gap-4 mx-auto max-w-40">
        {!loginResponse.type && <GridLoader />}
        <Alert
          variant={
            loginResponse?.type === "error" ? "destructive" : "constructive"
          }
          title={loginResponse?.message}
        />
      </div>
    </CardWrapper>
  );
};
