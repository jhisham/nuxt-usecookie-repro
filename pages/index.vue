<template>
  <div>
    <!-- <input type="text" v-model="username" placeholder="enter username" />
    <input
      type="password"
      v-model="userPassword"
      name="password"
      id="password"
      placeholder="enter password"
    /> -->
    <button @click="authUser">Get Token</button>

    <div v-if="fetchingUsers">fetching users...</div>
    <div v-else-if="error">woops... {{ fetchError }}</div>
    <div v-else>
      <ul v-if="usersData">
        <li v-for="user in usersData.users.edges">{{ user.node.username }}</li>
      </ul>
    </div>

    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <div v-else-if="data">
      {{ data.tokenAuth.token }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { USERS } from "@/graphql/queries";
import { AUTH_USER } from "@/graphql/mutations";
import { useQuery, useMutation } from "@urql/vue";

const username = ref("student1");
const password = ref("$Password123$");

// query available users
const { fetching: fetchingUsers, data: usersData, error: fetchError } = useQuery({
  query: USERS,
});

// call useMutation
const { executeMutation: authMutation, fetching, data, error } = useMutation(AUTH_USER);

// execute the mutation (authMutation)
const authUser = async () => {
  await authMutation({
    username: username.value,
    password: password.value,
  });
};

// watch for changes in the token
watch([data], () => {
  /**
   * Simple use of useCookie with httpOnly set to true
   * Expected behavior: Cookie is set in the browser
   * Actual behavior: Cookie is set in the brower
   */
  const token1 = useCookie("token1", { httpOnly: true });
  token1.value =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJpbGxAZXhhbXBsZS5jb20iLCJleHAiOjE2NTg5MzQ0ODEsIm9yaWdJYXQiOjE2NTg5MzI2ODF9.uOIEUPKHavAz7MALyUvK2wEKrgUVV2zu0J09OwtCPfI";

  /**
   * Using useCookie with httpOnly set to false (default) and obtaining data from API
   * Expected behavior: Cookie is set in the browser
   * Actual behavior: Cookie is set in the brower
   */
  const token2 = useCookie("token2");
  token2.value = data.value.tokenAuth.token;

  /**
   * Using useCookie with httpOnly set to true and obtaining data from API
   * Expected behavior: Cookie is set in the browser
   * Actual behavior: Cookie is not set in the brower
   */
  const token3 = useCookie("token3", { httpOnly: true });
  token3.value = data.value.tokenAuth.token;

  // log the token to console to check if they really have value
  console.log(token1.value);
  console.log(token2.value);
  console.log(token3.value);
});
</script>

<style scoped></style>
