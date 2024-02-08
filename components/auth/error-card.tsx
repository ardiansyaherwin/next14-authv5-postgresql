import { CardWrapper } from "@/components/auth/layout/card-wrapper";
import { DEFAULT_LOGIN_URL } from "@/routes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const AuthErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref={DEFAULT_LOGIN_URL}
      backButtonLabel="Back to login"
    >
      <div className="w-full flex items-center justify-center">
        <ExclamationTriangleIcon className=" text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default AuthErrorCard;
