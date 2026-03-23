/*
    Modo de activación del servidor: en PowerShell/CMD y ubicados en la carpeta del proyecto (en este caso ubicados en T2_CRUD2) escribir: npx json-server --watch db.json para encenderlo

    Para apagarlo escribir: Ctrl + C
*/

const url = "http://localhost:3000/usuarios";

const lista = document.getElementById("lista");
const formulario = document.getElementById("formulario");

async function obtenerUsuarios()
{
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    lista.innerHTML = "";

    datos.forEach(function(usuario)
    {
        const li = document.createElement("li");
        li.textContent = usuario.nombre + " - " + usuario.edad;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.onclick = function()
        {
            eliminarUsuario(usuario.id);
        };

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

formulario.addEventListener("submit", async function(e)
{
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    await fetch(url,
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
        {
            nombre: nombre,
            edad: edad
        })
    });

    formulario.reset();
    obtenerUsuarios();
});

async function eliminarUsuario(id)
{
    await fetch(url + "/" + id,
    {
        method: "DELETE"
    });

    obtenerUsuarios();
}

obtenerUsuarios();