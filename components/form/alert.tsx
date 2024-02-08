import {
  ExclamationTriangleIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

import {
  Alert as AlertUI,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";

interface FormErrorProps {
  title: string;
  description?: string;
  variant?: VariantProps<typeof alertVariants>["variant"];
}

export const Alert = ({ title, description, variant }: FormErrorProps) => {
  if (!title && !description) return null;

  return (
    <AlertUI variant={variant} className="flex gap-2 items-center">
      {variant === "destructive" ? (
        <ExclamationTriangleIcon className="h-4 w-4 !relative !top-auto !left-auto" />
      ) : (
        <CheckCircledIcon className="h-4 w-4 !relative !top-auto !left-auto" />
      )}
      <div className="flex flex-col gap-2 !p-0 !pt-1">
        {title && <AlertTitle className="mb-0">{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </div>
    </AlertUI>
  );
};
