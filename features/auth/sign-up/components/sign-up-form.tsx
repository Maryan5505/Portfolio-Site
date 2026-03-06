"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../schemas";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SignUpFormValues } from "../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "../../server/actions";
import type z from "zod";
import Link from "next/link";

type SignUpValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: SignUpValues) => {
    await signUp(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">Sign Up</CardTitle>
        <CardDescription className="flex justify-center">
          Create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-5">
            {Object.entries(SignUpFormValues).map(([key, formField]) => (
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
            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline hover:text-primary">
                Sign in
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
