const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); 


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


app.post('/registro', (req, res) => {
    // Obtener la información del formulario
    const { name, email, password } = req.body;
    // Leer los datos del archivo JSON
    const data = fs.readFileSync('server.json');
    const json = JSON.parse(data);
    // Crear un nuevo objeto con la información del formulario
    const newUser = {
        name,
        email,
        password
    };
    // Agregar el nuevo objeto al arreglo de usuarios en el archivo JSON
    json.usuarios.push(newUser);
    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync('server.json', JSON.stringify(json, null, 2));
    // Responder con un mensaje de éxito
    res.send('Registro exitoso');
});


app.post('/citas', (req, res) => {
    // Obtener la información del formulario
    const {representative, email, adress, opcional,country,state,zip } = req.body;
    // Leer los datos del archivo JSON
    const data = fs.readFileSync('server.json');
    const json = JSON.parse(data);
    // Crear un nuevo objeto con la información de la cita
    const newCita = {
      representative,
      email,
      adress,
      opcional,
      country,
      state,
      zip
    };
    // Agregar el nuevo objeto al arreglo de citas en el archivo JSON
    json.citas.push(newCita);
    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync('server.json', JSON.stringify(json, null, 2));
    // Responder con un mensaje de éxito
    res.send('Cita creada exitosamente');
  });


  app.post('/contacto', (req, res) => {
    // Obtener la información del formulario
    const { name, email, mesagge } = req.body;
    // Leer los datos del archivo JSON
    const data = fs.readFileSync('server.json');
    const json = JSON.parse(data);
    // Crear un nuevo objeto con la información del formulario
    const newCon = {
        name,
        email,
        mesagge
    };
    // Agregar el nuevo objeto al arreglo de usuarios en el archivo JSON
    json.usuarios.push(newCon);
    // Escribir los datos actualizados en el archivo JSON
    fs.writeFileSync('server.json', JSON.stringify(json, null, 2));
    // Responder con un mensaje de éxito
    res.send('Registro exitoso');
});
