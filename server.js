const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;


// Отдаём HTML/CSS/JS
app.use(express.static(path.join(__dirname)));


// ТЕСТОВЫЕ ДАННЫЕ

const students = [

    {
        id: 1,
        name: "Радмир",
        nonResident: true
    },

    {
        id: 2,
        name: "Эмир",
        nonResident: false
    },

    {
        id: 3,
        name: "Алина",
        nonResident: true
    }

];


const buildings = [

    {
        number: 1,
        forStudents: true
    },

    {
        number: 2,
        forStudents: false
    },

    {
        number: 3,
        forStudents: true
    }

];


const rooms = [

    {
        building: 1,
        number: 101,
        free: true
    },

    {
        building: 1,
        number: 102,
        free: false
    },

    {
        building: 2,
        number: 201,
        free: true
    },

    {
        building: 3,
        number: 301,
        free: true
    }

];



app.get("/api/student/:id", (req, res) => {

    const id = Number(req.params.id);

    const student =
        students.find(student => student.id === id);


    if (!student) {

        return res.status(404).json({
            error: "Студент не найден",
            nonResident: false
        });

    }


    res.json(student);

});



app.get("/api/building/:number", (req, res) => {

    const number =
        Number(req.params.number);


    const building =
        buildings.find(
            building => building.number === number
        );


    if (!building) {

        return res.status(404).json({
            error: "Корпус не найден",
            forStudents: false
        });

    }


    res.json(building);

});



app.get(
    "/api/room/:building/:room",

    (req, res) => {

        const building =
            Number(req.params.building);

        const roomNumber =
            Number(req.params.room);


        const room = rooms.find(

            room =>
                room.building === building &&
                room.number === roomNumber

        );


        if (!room) {

            return res.status(404).json({
                error: "Комната не найдена",
                free: false
            });

        }


        res.json(room);

    }
);



app.listen(PORT, () => {

    console.log(
        `Сервер запущен: http://localhost:${PORT}`
    );

});