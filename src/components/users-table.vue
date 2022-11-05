<script lang="ts">
import type { ActionRow } from "@/common/types/action-row";
import UserTableRow from "./user-table-row.vue";

export default {
  components: {
    UserTableRow,
  },
  props: {
    tableData: Array<ActionRow>,
    onDeleteSelected: Function,
    onCopySelected: Function,
    onChangeTableRowStatus: Function,
  },
};
</script>

<template>
  <div class="tableWrapper">
    <div class="actionSection">
      <button class="actionButton" type="button" @click="onDeleteSelected()">
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
      <button class="actionButton" type="button" @click="onCopySelected()">
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
        <UserTableRow
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
          :email="email"
          :status="status"
          :name="name"
          :surname="surname"
          :second-name="secondName"
          :group="group"
          :birth-date="birthDate"
          :phone-number="phoneNumber"
          :password="password"
          :gender="gender"
          :onChangeTableRowStatus="onChangeTableRowStatus"
          v-bind:key="email"
        />
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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
</style>
