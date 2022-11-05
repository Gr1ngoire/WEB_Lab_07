<script>
export default {
  props: {
    status: Boolean,
    email: String,
    name: String,
    surname: String,
    secondName: String,
    group: String,
    birthDate: String,
    phoneNumber: String,
    password: String,
    gender: String,
    onChangeTableRowStatus: Function,
  },
};
</script>

<template>
  <tr>
    <td>
      <input
        v-if="email"
        type="checkbox"
        @change="(event) => onChangeTableRowStatus(event, email)"
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
</template>

<style scoped></style>
