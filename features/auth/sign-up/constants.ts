export const SignUpFormValues = {
  name: {
    name: "name",
    label: "Full Name",
    placeholder: "Vlad Mon",
    type: "text",
  },
  email: {
    name: "email",
    label: "Email",
    placeholder: "vlad@mon.com",
    type: "email",
  },
  password: {
    name: "password",
    label: "Password",
    placeholder: "******",
    type: "password",
  },
} as const;
