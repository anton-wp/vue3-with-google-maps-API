import { reactive } from "vue";
import { messageErrors } from "@/helpers/errors.js";
import { role } from "@/helpers/role.js";

const adminObj = (isMore) => {
  // if (["admin"].includes(role.value) && isMore)
  //   return {
  //     fax: {
  //       label: "Fax",
  //       value: "",
  //       rules: [],
  //     },
  //     address: {
  //       label: "Address",
  //       value: "",
  //       rules: [],
  //     },
  //   };
  // else
  return {};
};
export const infoBlock = (isMore) =>
  reactive({
    first_name: {
      label: "First Name",
      value: "",
      rules: [
        {
          key: "required",
          message: messageErrors({ key: "required", label: "first name" }),
        },
        {
          key: "letters",
          message: messageErrors({ key: "letters", label: "first name" }),
        },
      ],
    },
    last_name: {
      label: "Last Name",
      value: "",
      rules: [
        {
          key: "required",
          message: messageErrors({ key: "required", label: "last name" }),
        },
        {
          key: "letters",
          message: messageErrors({ key: "letters", label: "last name" }),
        },
      ],
    },
    email: {
      label: "Email",
      value: "",
      rules: [
        {
          key: "required",
          message: messageErrors({ key: "required", label: "email" }),
        },
        {
          key: "email",
          message: messageErrors({ key: "email", label: "email" }),
        },
      ],
    },
    phone: {
      label: "Phone",
      value: "",
      rules: [],
    },
    ...adminObj(isMore),
  });
