const form = document.getElementById("applicationForm");

const result = document.getElementById("result");
const details = document.getElementById("details");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    const studentId =
        document.getElementById("studentId").value;

    const building =
        document.getElementById("building").value;

    const room =
        document.getElementById("room").value;


    result.className = "";
    result.style.display = "block";

    result.textContent = "Выполняется проверка...";

    details.innerHTML = "";


    try {

        // GET №1
        // Проверяем студента

        const studentResponse =
            await fetch(`/api/student/${studentId}`);

        const student =
            await studentResponse.json();


        // GET №2
        // Проверяем корпус

        const buildingResponse =
            await fetch(`/api/building/${building}`);

        const buildingData =
            await buildingResponse.json();


        // GET №3
        // Проверяем комнату

        const roomResponse =
            await fetch(
                `/api/room/${building}/${room}`
            );

        const roomData =
            await roomResponse.json();



        // Показываем результаты проверок

        details.innerHTML = `
            <p>
                ${student.nonResident ? "✅" : "❌"}
                Студент иногородний
            </p>

            <p>
                ${buildingData.forStudents ? "✅" : "❌"}
                Корпус предназначен для студентов
            </p>

            <p>
                ${roomData.free ? "✅" : "❌"}
                Комната свободна
            </p>
        `;



        // Главная валидация
        // 

        if (
            student.nonResident &&
            buildingData.forStudents &&
            roomData.free
        ) {

            result.textContent =
                "✅ Заявка одобрена. Студент может заселиться.";

            result.className = "success";

        } else {

            result.textContent =
                "❌ Отказ в заселении.";

            result.className = "error";
        }


    } catch (error) {

        console.error(error);

        result.textContent =
            "Ошибка при получении данных от сервера.";

        result.className = "error";
    }

});