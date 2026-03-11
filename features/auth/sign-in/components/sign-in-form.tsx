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
import { signIn } from "../../server/actions";
import type z from "zod";
import Link from "next/link";
type SignInValues = z.infer<typeof signInSchema>;
export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    await signIn(values);
  };
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-center">Sign in</CardTitle>
        <CardDescription className="flex justify-center">
          Please enter your details
        </CardDescription>
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
            <Button>Sign In</Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline hover:text-primary">
                Sign up
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
