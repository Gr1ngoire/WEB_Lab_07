<script lang="ts">
import { defineComponent } from "vue";
import vSelect from "vue-select";
import { mask } from "vue-the-mask";
import { SignUpValidator } from "@/validation/sign-up/sign-up.validator";
import type {
  ActionRow,
  RegistrationErrors,
  StudentGroup,
  UserRegisterData,
} from "@/common/types/types";
import { defaultUserDataValues } from "@/common/default-user-data-values";
import { defaultErrorsValues } from "@/common/default-errors-values";
import "vue-select/dist/vue-select.css";
import UsersTable from "@/components/users-table.vue";

const groups: String[] = ["IA-11", "IA-12", "IA-13", "IA-14"];
const validator: SignUpValidator = new SignUpValidator();

const resetStatuses = (data: ActionRow[]): ActionRow[] => {
  return data.map((row) => ({ ...row, status: false }));
};

export default defineComponent({
  components: {
    UsersTable,
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
      <h3 class="formHeading">????????????????????</h3>
      <label class="formLabel">Email</label>
      <input
        placeholder="?????? email"
        type="email"
        name="email"
        :value="userData.email"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
      />
      <label class="errorLabel">{{ errors.email }}</label>
      <label class="formLabel">?????????? ????????????????</label>
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
      <label class="formLabel">????'??</label>
      <input
        placeholder="???????? ????'??"
        type="text"
        name="name"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.name"
      />
      <label class="errorLabel">{{ errors.name }}</label>
      <label class="formLabel">????????????????</label>
      <input
        placeholder="???????? ????????????????"
        type="text"
        name="surname"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.surname"
      />
      <label class="errorLabel">{{ errors.surname }}</label>
      <label class="formLabel">????-????????????????</label>
      <input
        placeholder="???????? ????-????????????????"
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
        <label class="formLabel">??????????</label>
        <div class="genderSectionFraction">
          <input
            placeholder="???????? ????-????????????????"
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
          <label class="genderOptionLabel">????????????????</label>
        </div>
        <div class="genderSectionFraction">
          <input
            placeholder="???????? ????-????????????????"
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
          <label class="genderOptionLabel">????????????</label>
        </div>
        <div class="genderSectionFraction">
          <input
            placeholder="???????? ????-????????????????"
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
          <label class="genderOptionLabel">????????</label>
        </div>
      </ul>
      <label class="errorLabel">{{ errors.gender }}</label>
      <label class="formLabel">???????? ????????????????????</label>
      <input
        placeholder="???????? ???????? ????????????????????"
        type="date"
        name="birthDate"
        @input="
          (event) =>
            handleChangeUserDataProperty(event.target.name, event.target.value)
        "
        :value="userData.birthDate"
      />
      <label class="errorLabel">{{ errors.birthDate }}</label>
      <label class="formLabel">?????????????? ???????? ??????????</label>
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
      <label class="formLabel">????????????</label>
      <input
        placeholder="?????? ????????????"
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
        ??????????????????????????????
      </button>
    </form>
  </div>
  <UsersTable
    :table-data="tableData"
    :onDeleteSelected="handleDeleteSelected"
    :onCopySelected="handleCopySelected"
    :onChangeTableRowStatus="handleChangeTableRowStatus"
  />
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

@media (max-width: 1200px) {
  .signUpForm {
    width: 350px;
    margin-top: 200px;
  }
}
</style>
