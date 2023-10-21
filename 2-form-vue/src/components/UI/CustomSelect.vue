<template>
  <div>
    <!-- Метка для селектора -->
    <label :for="selectId">{{ label }}:</label>
    <div>
      <!-- Выпадающий список селектора -->
      <select :id="selectId" :value="modelValue" @change="updateSelect" :disabled="disabled">
        <!-- Опция для выбора по умолчанию -->
        <option disabled value="default">{{ defaultValue }}</option>
        <!-- Динамическое создание опций на основе массива options -->
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectId: String, // Идентификатор селектора
    label: String, // Текст метки
    defaultValue: String, // Текст опции по умолчанию
    options: Array, // Массив опций
    disabled: Boolean, // Флаг для отключения селектора
    modelValue: String, // Значение селектора
  },
  methods: {
    // Метод обновления выбранной опции
    updateSelect(event) {
      // Эмиттирование события с обновленным значением
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  margin-bottom: 10px;
}
select:focus {
  border-color: #007bff;
  outline: none;
}
select:not([disabled]):hover {
  background-color: #f3f3f3;
  cursor: pointer;
}
</style>
