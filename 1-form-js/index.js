import { cities, workshops, employees } from "./mock.data.js";

//Определение списков
const citySelect = document.getElementById("city");
const workshopSelect = document.getElementById("workshop");
const employeeSelect = document.getElementById("employee");

//Инициализация списков согласно моковым данным
citySelect.innerHTML = `<option value="default" selected disabled>Выберите город</option>
${cities.map((city) => `<option value="${city.id}">${city.name}</option>`).join("")}`;

//Обработка выбора города
citySelect.addEventListener("change", function () {
  const selectedCity = +citySelect.value;

  //Присвоение цехов соответствующих городу
  const filteredWorkshops = workshops.filter((workshop) => workshop.cityId === selectedCity);
  workshopSelect.innerHTML = `<option value="default" selected disabled>Выберите цех</option>
    ${filteredWorkshops
      .map((workshop) => `<option value="${workshop.id}">${workshop.name}</option>`)
      .join("")}`;
  workshopSelect.disabled = false;
  employeeSelect.disabled = true;
  employeeSelect.innerHTML = `<option value="default" selected disabled>Выберите сотрудника</option>`;
});

//Обработка выбора цеха
workshopSelect.addEventListener("change", function () {
  const selectedWorkshop = +workshopSelect.value;

  //Присвоение сотрудников соответствующих цеху
  const filteredEmployees = employees.filter(
    (employee) => employee.workshopId === selectedWorkshop
  );
  employeeSelect.innerHTML = `<option value="default" selected disabled>Выберите сотрудника</option>
    ${filteredEmployees
      .map((employee) => `<option value="${employee.id}">${employee.name}</option>`)
      .join("")}`;
  employeeSelect.disabled = false;
});

//Определение списков зависимых от времени
const brigadeSelect = document.getElementById("brigade");
const shiftSelect = document.getElementById("shift");
const currentTimeBlock = document.getElementById("current-time");

//Определение времени для логики определения бригады и смены
function updateClock() {
  const currentTime = new Date().toLocaleTimeString();
  currentTimeBlock.innerText = `${currentTime}`;
  setBrigade(currentTime);
}
updateClock();
setInterval(updateClock, 1000);

//Определение бригады и смены
function setBrigade(time) {
  brigadeSelect.value = time >= "20:00" ? "Первая (8:00 - 20:00)" : "Вторая (20:00 - 8:00)";
  shiftSelect.value = time >= "20:00" ? "Первая" : "Вторая";
}

const resetFormButton = document.getElementById("reset");
const form = document.getElementById("form");

resetFormButton.addEventListener("click", resetForm);

function resetForm() {
  citySelect.value = "default";
  workshopSelect.value = "default";
  employeeSelect.value = "default";
  workshopSelect.disabled = true;
  employeeSelect.disabled = true;
  brigadeSelect.disabled = true;
  shiftSelect.disabled = true;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (employeeSelect.value === "default") {
    alert("Заполните форму");
    return;
  }

  brigadeSelect.disabled = false;
  shiftSelect.disabled = false;
  const formData = new FormData(this);
  let formObject = {};
  formData.forEach((value, key) => {
    console.log(key, value);
    formObject[key] = value;
  });
  alert(JSON.stringify(formObject));
  resetForm();
});
