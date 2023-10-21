<template>
  <div>
    <!-- Форма для выбора параметров -->
    <form @submit.prevent="submitForm">
      <!-- Выпадающий список для выбора города -->
      <custom-select
        selectId="city"
        label="Город"
        defaultValue="Выберите город"
        :options="citiesComputed"
        v-model="form.city"
        @change="cityChanged"
      />
      <!-- Выпадающий список для выбора цеха -->
      <custom-select
        selectId="workshop"
        label="Цех"
        defaultValue="Выберите цех"
        :options="workshopsComputed"
        v-model="form.workshop"
        @change="workshopChanged"
        :disabled="form.city === 'default'"
      />
      <!-- Выпадающий список для выбора сотрудника -->
      <custom-select
        selectId="employee"
        label="Сотрудник"
        defaultValue="Выберите сотрудника"
        :options="employeesComputed"
        v-model="form.employee"
        :disabled="form.workshop === 'default'"
      />
      <!-- Отображение текущего времени для проверки работы подбора бригады и смены-->
      <span>Текущее время: {{ currentTime }}</span>
      <!-- Поля для отображения бригады и смены-->
      <label>Бригада:</label>
      <input :value="form.brigade" readonly disabled />
      <label>Смена:</label>
      <input :value="form.shift" readonly disabled />
      <!-- Кнопки для сброса и отправки формы -->
      <button class="reset" type="button" @click="resetForm">Сбросить</button>
      <button class="submit" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import CustomSelect from "@/components/UI/CustomSelect.vue";
import { cities, workshops, employees } from "@/assets/mock.data";
import VueCookies from "vue-cookies";

export default {
  components: {
    CustomSelect,
  },
  data() {
    return {
      currentTime: this.getCurrentTime(),
      form: this.getFormData(),
    };
  },
  computed: {
    // Фильтрация свойств передаваемых пропсами в компоненты
    citiesComputed() {
      return cities.map((city) => ({ id: city.id, name: city.name }));
    },
    workshopsComputed() {
      // Фильтрация цехов в зависимости от выбранного города
      const workshopsFilteredByCity =
        this.form.city !== "default"
          ? workshops.filter((workshop) => workshop.cityId === +this.form.city)
          : workshops;

      return workshopsFilteredByCity.map((workshop) => ({ id: workshop.id, name: workshop.name }));
    },
    employeesComputed() {
      // Фильтрация сотрудников в зависимости от выбранного цеха
      const employeesFilteredByWorkshop =
        this.form.workshop !== "default"
          ? employees.filter((employee) => employee.workshopId === +this.form.workshop)
          : employees;

      return employeesFilteredByWorkshop.map((employee) => ({
        id: employee.id,
        name: employee.name,
      }));
    },
  },
  methods: {
    // Обработчик изменения выбранного города
    cityChanged() {
      this.form.workshop = "default";
      this.form.employee = "default";
    },
    // Обработчик изменения выбранного цеха
    workshopChanged() {
      this.form.employee = "default";
    },
    // Сброс значений формы
    resetForm() {
      this.form.city = "default";
      this.form.workshop = "default";
      this.form.employee = "default";
    },
    // Отправка формы
    submitForm() {
      if (this.form.employee === "default") {
        alert("Заполните форму");
      } else {
        alert(JSON.stringify(this.form));
      }
      this.resetForm();
    },
    // Сохранение изменений формы в куки
    watchFormChanges() {
      VueCookies.set("form", this.form, "1d");
    },
    // Загрузка данных формы из куки и присвоение значений в форму
    getFormData() {
      const formData = VueCookies.get("form");
      if (!formData) {
        return {
          city: "default",
          workshop: "default",
          employee: "default",
          brigade: this.getBrigade(),
          shift: this.getShift(),
        };
      }
      return {
        city: formData.city,
        workshop: formData.workshop,
        employee: formData.employee,
        brigade: this.getBrigade(),
        shift: this.getShift(),
      };
    },
    // Получение текущего времени
    getCurrentTime() {
      return new Date().toLocaleTimeString();
    },
    // Определение бригады
    getBrigade() {
      return this.currentTime >= "20:00" ? "Первая (8:00 - 20:00)" : "Вторая (20:00 - 8:00)";
    },
    // Определение смены
    getShift() {
      // Логика выбора смены не описана в техническом задании, поэтому принята в соответствии со временем
      return this.currentTime >= "20:00" ? "Первая" : "Вторая";
    },
  },
  created() {
    // Обновление текущего времени каждую секунду
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);

    // Отслеживание изменений формы
    this.$watch("form", this.watchFormChanges, { deep: true });
  },
};
</script>

<style scoped>
form {
  width: 300px;
  margin: 0 auto 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
label {
  display: block;
  margin-top: 10px;
}
input {
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #000;
  padding: 0;
}
h1,
h2 {
  font-size: 24px;
  margin: 0 auto 10px;
}
button {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #fff;
  margin-top: 10px;
}
button:hover {
  background-color: #f3f3f3;
  cursor: pointer;
}
.reset {
  background-color: rgb(255, 214, 214);
}
.reset:hover {
  background-color: rgb(255, 185, 185);
}
.submit {
  background-color: rgb(214, 255, 214);
}
.submit:hover {
  background-color: rgb(185, 255, 185);
}
</style>
