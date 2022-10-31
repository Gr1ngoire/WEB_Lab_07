<script lang="ts">
import { defineComponent } from "vue";
import vSelect from "vue-select";
import { mask } from "vue-the-mask";
import { SignUpValidator } from "@/validation/sign-up/sign-up.validator";
import type {
  RegistrationErrors,
  StudentGroup,
  UserRegisterData,
} from "@/common/types/types";
import { defaultUserDataValues } from "@/common/default-user-data-values";
import { defaultErrorsValues } from "@/common/default-errors-values";
import "vue-select/dist/vue-select.css";

type ActionRow = {
  status: boolean;
  data: UserRegisterData;
};

const groups: String[] = ["IA-11", "IA-12", "IA-13", "IA-14"];
const validator: SignUpValidator = new SignUpValidator();

const resetStatuses = (data: ActionRow[]): ActionRow[] => {
  return data.map((row) => ({ ...row, status: false }));
};

export default defineComponent({
  components: {
    vSelect,
  },
  directives: {
    mask,
  },
  data: () => ({
    groups: groups as String[],
    tableData: [] as ActionRow[],
    userData: defaultUserDataValues as UserRegisterData,
    errors: defaultErrorsValues as RegistrationErrors,
    isRegistrationLocked: true as boolean,
  }),
  methods: {
    handleChangeUserDataProperty(name: string, newValue: string): void {
      this.userData[name] = newValue as StudentGroup;
      try {
        validator.validateField(name, newValue);
        const isFormInvalid = Object.values(this.userData).some((el) => !el);
        this.isRegistrationLocked = isFormInvalid;
        this.errors = { ...this.errors, [name]: "" };
      } catch (e) {
        this.isRegistrationLocked = true;
        this.errors = { ...this.errors, [name]: (e as Error).message };
      }
    },
    handleSubmit(event: any): void {
      event.preventDefault();
      this.tableData.push({ status: false, data: this.userData });
      this.userData = {
        email: "",
        phoneNumber: this.userData.phoneNumber,
        name: "",
        surname: "",
        secondName: "",
        gender: this.userData.gender,
        group: this.userData.group,
        birthDate: "",
        password: "",
      };
      this.isRegistrationLocked = true;
    },
    handleDeleteSelected(): void {
      this.tableData = this.tableData.filter((row) => !row.status);
      this.tableData = resetStatuses(this.tableData);
    },
    handleCopySelected(): void {
      this.tableData = [
        ...this.tableData,
        ...this.tableData.filter((row: ActionRow) => row.status),
      ];
      this.tableData = resetStatuses(this.tableData);
    },
    handleChangeTableRowStatus(event: any, email: string): void {
      const res = this.tableData.filter(
        (row: ActionRow) => row.data.email === email
      );
      res.forEach((row: ActionRow) => {
        row.status = event.target.checked;
      });
    },
  },
});
</script>

<template>
  <div class="signUpWrapper">
    <form class="signUpForm" @submit="(event) => handleSubmit(event)">
      <h3 class="formHeading">Реєстрація</h3>
      <label class="formLabel">Email</label>
      <input
        placeholder="Ваш email"
        type="email"
        name="email"
        :value="userData.email"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
      />
      <label class="errorLabel">{{ errors.email }}</label>
      <label class="formLabel">Номер телефону</label>
      <input
        name="phoneNumber"
        v-mask="'+38(0##)###-##-##'"
        placeholder="+38(0__)___-__-__"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
      />
      <label class="errorLabel">{{ errors.phoneNumber }}</label>
      <label class="formLabel">Ім'я</label>
      <input
        placeholder="Ваше ім'я"
        type="text"
        name="name"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.name"
      />
      <label class="errorLabel">{{ errors.name }}</label>
      <label class="formLabel">Прізвище</label>
      <input
        placeholder="Ваше прізвище"
        type="text"
        name="surname"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.surname"
      />
      <label class="errorLabel">{{ errors.surname }}</label>
      <label class="formLabel">По-батькові</label>
      <input
        placeholder="Ваше по-батькові"
        type="text"
        name="secondName"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.secondName"
      />
      <label class="errorLabel">{{ errors.secondName }}</label>
      <ul class="genderSection">
        <label class="formLabel">Стать</label>
        <div class="genderSectionFraction">
          <input
            placeholder="Ваше по-батькові"
            type="radio"
            value="male"
            name="gender"
            @input="
              (event) =>
                handleChangeUserDataProperty(
                  event.target.name,
                  event.target.value
                )
            "
          />
          <label class="genderOptionLabel">Чоловіча</label>
        </div>
        <div class="genderSectionFraction">
          <input
            placeholder="Ваше по-батькові"
            type="radio"
            value="female"
            name="gender"
            @input="
              (event) =>
                handleChangeUserDataProperty(
                  event.target.name,
                  event.target.value
                )
            "
          />
          <label class="genderOptionLabel">Жіноча</label>
        </div>
        <div class="genderSectionFraction">
          <input
            placeholder="Ваше по-батькові"
            type="radio"
            value="other"
            name="gender"
            @input="
              (event) =>
                handleChangeUserDataProperty(
                  event.target.name,
                  event.target.value
                )
            "
          />
          <label class="genderOptionLabel">Інше</label>
        </div>
      </ul>
      <label class="errorLabel">{{ errors.gender }}</label>
      <label class="formLabel">Дата народження</label>
      <input
        placeholder="Ваша дата народження"
        type="date"
        name="birthDate"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.birthDate"
      />
      <label class="errorLabel">{{ errors.birthDate }}</label>
      <label class="formLabel">Оберіть вашу групу</label>
      <v-select
        name="group"
        :options="groups"
        v-model="userData.group"
        @update="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
      ></v-select>
      <label class="errorLabel">{{ errors.group }}</label>
      <label class="formLabel">Пароль</label>
      <input
        placeholder="Ваш пароль"
        type="password"
        name="password"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.password"
      />
      <label class="errorLabel">{{ errors.password }}</label>
      <button
        :class="`signUpButton ${isRegistrationLocked && 'locked'}`"
        :disabled="isRegistrationLocked"
        type="submit"
      >
        Зареєструватись
      </button>
    </form>
    <div class="tableWrapper">
      <div class="actionSection">
        <button
          class="actionButton"
          type="button"
          @click="handleDeleteSelected()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            />
          </svg>
        </button>
        <button
          class="actionButton"
          type="button"
          @click="handleCopySelected()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clipboard-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"
            />
          </svg>
        </button>
      </div>
      <table class="dataTable" border="1" rules="rows">
        <thead>
          <tr>
            <th>Selected</th>
            <th>Email</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>По-батькові</th>
            <th>Група</th>
            <th>Дата народження</th>
            <th>Номер телефону</th>
            <th>Пароль</th>
            <th>Стать</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="{
              status,
              data: {
                email,
                name,
                surname,
                secondName,
                group,
                birthDate,
                phoneNumber,
                password,
                gender,
              },
            } in tableData"
            v-bind:key="email"
          >
            <td>
              <input
                v-if="email"
                type="checkbox"
                @change="(event) => handleChangeTableRowStatus(event, email)"
                :checked="status"
              />
            </td>
            <td>{{ email }}</td>
            <td>{{ name }}</td>
            <td>{{ surname }}</td>
            <td>{{ secondName }}</td>
            <td>{{ group }}</td>
            <td>{{ birthDate }}</td>
            <td>{{ phoneNumber }}</td>
            <td>{{ password }}</td>
            <td>{{ gender }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.signUpWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUpForm {
  margin: 100px 0 40px 0;
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 4px var(--secondary-background-color);
}

.signUpForm button {
  word-break: break-all;
  align-self: center;
  margin: 60px 0 10px 0;
}

.formHeading {
  text-align: center;
}

.formLabel {
  margin: 41px 0 5px 0;
}

.signUpButton {
  width: 30%;
  height: 39px;
  border: 2px solid var(--secondary-background-color);
  border-radius: 20px;
  background: var(--primary-background-color);
}

.signUpButton:hover {
  cursor: pointer;
  background: var(--secondary-background-color);
  color: white;
  transition: 0.2s;
}

.genderSection {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  padding: 0;
}

.genderSectionFraction {
  display: flex;
  align-items: center;
}

.genderOptionLabel {
  margin-left: 10px;
}

.locked {
  background: var(--secondary-background-color);
  color: white;
  transition: 0.2s;
  opacity: 0.75;
}

.locked:hover {
  cursor: default;
}

.errorLabel {
  padding: 5px;
  color: firebrick;
}

.dataTable {
  width: 100%;
  margin: 20px;
  padding: 40px 40px 40px 40px;
  text-align: left;
}

.dataTable th {
  padding: 10px;
}

.dataTable td {
  padding: 10px;
}

.tableWrapper {
  display: flex;
  flex-direction: column;
}

.actionSection {
  display: flex;
  margin-left: 20px;
}

.actionButton {
  margin-left: 5px;
  padding: 10px 20px;
  color: var(--secondary-background-color);
  background: var(--primary-background-color);
  border: 2px solid var(--secondary-background-color);
  border-radius: 10px;
}

.actionButton:hover {
  cursor: pointer;
  color: var(--primary-background-color);
  background: var(--secondary-background-color);
}

@media (max-width: 1200px) {
  .signUpForm {
    width: 350px;
    margin-top: 200px;
  }
}
</style>
