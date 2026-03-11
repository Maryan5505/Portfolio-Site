"use client";

import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { signUpSchema } from "../schemas";
import { SignUpFormValues } from "../constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { signUp } from "../../server/actions";
import type z from "zod";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type SignUpValues = z.infer<typeof signUpSchema>;

const steps = [
  ["username", "name", "surname"],
  ["email", "password"],
  ["phone", "country", "hobby"],
];

export function SignUpForm() {
  const [step, setStep] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(
    undefined
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      country: "",
      hobby: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, [step]);

  const onNext = async () => {
    const currentStepFields = steps[step] as (keyof SignUpValues)[];
    const isValid = await form.trigger(currentStepFields);
    if (isValid) setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const onBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (values: SignUpValues) => {
    await signUp(values);
  };

  const currentFields = steps[step];

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-start p-4 bg-white dark:bg-gray-900">
      <motion.div
        className="w-full max-w-3xl bg-background rounded-3xl shadow-2xl overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: containerHeight ? containerHeight + 180 : 450 }}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-red-500 to-pink-500 text-white text-center py-8 px-6">
          <h1 className="text-4xl font-bold mb-2">Sign Up</h1>
          <p className="text-white/80">
            Step {step + 1} of {steps.length}
          </p>
          <div className="h-2 w-full bg-white/30 rounded-full mt-3">
            <div
              className="h-2 bg-white rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between px-8 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={step === 0}
            className={`flex items-center gap-2 ${
              step === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 transition-transform duration-200"
            }`}
          >
            <FiChevronLeft size={20} />
            Back
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onNext}
            disabled={step === steps.length - 1}
            className={`flex items-center gap-2 ${
              step === steps.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 transition-transform duration-200"
            }`}
          >
            Next
            <FiChevronRight size={20} />
          </Button>
        </div>

        {/* Form Fields */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
          <div ref={containerRef} className="grid gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 w-full"
              >
                {currentFields.map((key) => {
                  const formField = SignUpFormValues[
                    key as keyof typeof SignUpFormValues
                  ] || {
                    name: key,
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    placeholder: "",
                    type: key === "password" ? "password" : "text",
                  };
                  return (
                    <Controller
                      key={key}
                      name={formField.name as keyof SignUpValues}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field className="w-full flex flex-col">
                          <FieldLabel>{formField.label}</FieldLabel>
                          <Input
                            {...field}
                            placeholder={formField.placeholder}
                            type={formField.type}
                            className="w-full px-4 py-3 rounded-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-400"
                            aria-invalid={fieldState.invalid}
                          />
                          <div className="min-h-5">
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </div>
                        </Field>
                      )}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sign Up button only on last step */}
          {step === steps.length - 1 && (
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                Sign Up
              </Button>
            </div>
          )}

          <p className="text-sm text-center text-muted-foreground mt-4 col-span-2">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline hover:text-red-500">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
