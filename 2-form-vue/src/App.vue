<template>
  <div id="app">
    <form-page />
  </div>
</template>

<script>
import FormPage from "@/components/FormPage.vue";

export default {
  components: {
    FormPage,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
