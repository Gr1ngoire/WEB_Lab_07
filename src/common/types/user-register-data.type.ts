import type { StudentGroup } from "@/common/types/student-group.type";
import type { Gender } from "@/common/types/student-gender.type";

type UserRegisterData = {
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
  secondName: string;
  gender: string;
  birthDate: string;
  group: StudentGroup;
  password: string;
};

export { type UserRegisterData };
