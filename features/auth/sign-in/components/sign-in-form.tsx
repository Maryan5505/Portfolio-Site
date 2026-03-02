"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "../schemas";
import { SignInFormValues } from "../constants";

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-5">
            {Object.entries(SignInFormValues).map(([key, formField]) => (
              <Controller
                key={key}
                name={formField.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>{formField.label}</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder={formField.placeholder}
                      type={formField.type}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              ></Controller>
            ))}
            <Button>Log In</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
