const form = document.getElementById("applicationForm");

const result = document.getElementById("result");
const details = document.getElementById("details");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const studentId =
        Number(document.getElementById("studentId").value);

    const buildingNumber =
        Number(document.getElementById("building").value);

    const roomNumber =
        Number(document.getElementById("room").value);


    result.className = "";
    result.style.display = "block";

    result.textContent = "Выполняется проверка...";

    details.innerHTML = "";


    try {

        // ==========================================
        // GET №1 — получаем студентов
        // ==========================================

        const studentsResponse =
            await fetch("./students.json");

        if (!studentsResponse.ok) {
            throw new Error("Ошибка получения студентов");
        }

        const students =
            await studentsResponse.json();


        // ==========================================
        // GET №2 — получаем корпуса
        // ==========================================

        const buildingsResponse =
            await fetch("./buildings.json");

        if (!buildingsResponse.ok) {
            throw new Error("Ошибка получения корпусов");
        }

        const buildings =
            await buildingsResponse.json();


        // ==========================================
        // GET №3 — получаем комнаты
        // ==========================================

        const roomsResponse =
            await fetch("./rooms.json");

        if (!roomsResponse.ok) {
            throw new Error("Ошибка получения комнат");
        }

        const rooms =
            await roomsResponse.json();



        // ==========================================
        // Ищем введённые данные
        // ==========================================

        const student =
            students.find(
                student => student.id === studentId
            );


        const building =
            buildings.find(
                building =>
                    building.number === buildingNumber
            );


        const room =
            rooms.find(
                room =>
                    room.building === buildingNumber &&
                    room.number === roomNumber
            );



        // ==========================================
        // Проверка существования данных
        // ==========================================

        const studentIsNonResident =
            student && student.nonResident;

        const buildingForStudents =
            building && building.forStudents;

        const roomIsFree =
            room && room.free;



        // ==========================================
        // Показываем 3 проверки
        // ==========================================

        details.innerHTML = `

            <p>
                ${studentIsNonResident ? "✅" : "❌"}
                Студент иногородний
            </p>

            <p>
                ${buildingForStudents ? "✅" : "❌"}
                Корпус предназначен для студентов
            </p>

            <p>
                ${roomIsFree ? "✅" : "❌"}
                Комната свободна
            </p>

        `;



        // ==========================================
        // Финальная валидация
        // ==========================================

        if (
            studentIsNonResident &&
            buildingForStudents &&
            roomIsFree
        ) {

            result.textContent =
                "✅ Заявка одобрена. Студент может заселиться.";

            result.className = "success";

        }

        else {

            result.textContent =
                "❌ Отказ в заселении.";

            result.className = "error";

        }


    }

    catch (error) {

        console.error(error);

        result.textContent =
            "Ошибка при получении данных.";

        result.className = "error";

    }

});