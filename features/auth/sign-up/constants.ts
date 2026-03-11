export const SignUpFormValues = {
  name: {
    name: "name",
    label: "First Name",
    placeholder: "Vlad",
    type: "text",
  },
  surname: {
    name: "surname",
    label: "Surname",
    placeholder: "Mon",
    type: "text",
  },
  username: {
    name: "username",
    label: "Username",
    placeholder: "Vladmon",
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
  phone: {
    name: "phone",
    label: "Phone",
    placeholder: "+380...",
    type: "text",
  },
  country: {
    name: "country",
    label: "Country",
    placeholder: "Ukraine",
    type: "text",
  },
  hobby: {
    name: "hobby",
    label: "Hobby",
    placeholder: "Coding, Music...",
    type: "text",
  },
} as const;
