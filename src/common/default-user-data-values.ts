import type { UserRegisterData } from "@/common/types/user-register-data.type";

const defaultUserDataValues: UserRegisterData = {
  email: "",
  phoneNumber: "",
  name: "",
  surname: "",
  secondName: "",
  gender: "",
  birthDate: "",
  group: "IA-11",
  password: ""
};

export { defaultUserDataValues };