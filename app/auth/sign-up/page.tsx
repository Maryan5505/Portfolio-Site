"use client";

import { signUpSchema } from "@/app/schemas/auth";
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
import { FormValues } from "./constants";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {
    console.log("dsadas");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-5">
            {Object.entries(FormValues).map(([key, formField]) => (
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
              />
            ))}
            <Button>Sign Up</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
