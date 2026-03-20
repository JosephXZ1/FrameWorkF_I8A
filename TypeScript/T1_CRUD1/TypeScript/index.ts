type Task = { id: string; text: string };

const form = document.getElementById("form") as HTMLFormElement;
const input = document.getElementById("input") as HTMLInputElement;
const list = document.getElementById("list") as HTMLUListElement;

let tasks: Task[] = load();

function save()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load(): Task[]
{
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) as Task[] : [];
}

function render()
{
    list.innerHTML = "";
    tasks.forEach(t =>
    {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "item-text";
        span.textContent = t.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Editar";
        editBtn.addEventListener("click", () => startEdit(t.id));

        const delBtn = document.createElement("button");
        delBtn.textContent = "Borrar";
        delBtn.className = "delete";
        delBtn.addEventListener("click", () => removeTask(t.id));

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(actions);
        list.appendChild(li);
    });
}

function addTask(text: string)
{
    const newTask: Task = { id: cryptoRandomId(), text };
    tasks.push(newTask);
    save();
    render();
}

function removeTask(id: string)
{
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
}

function startEdit(id: string)
{
    const t = tasks.find(x => x.id === id);
    if (!t) return;
    const newText = prompt("Editar tarea", t.text);
    if (newText === null) return;
    t.text = newText.trim();
    save();
    render();
}

function cryptoRandomId(): string
{
    return Math.random().toString(36).slice(2, 9);
}

form.addEventListener("submit", (e) =>
{
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addTask(value);
    input.value = "";
});

render();