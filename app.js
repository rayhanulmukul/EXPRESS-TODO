import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

const findNextId = (tasks) => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

if (!fs.existsSync('tasks.json')) {
    fs.writeFileSync('tasks.json', '[]');
}

app.get('/', (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    res.render('tasks', { tasks });
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const newTask = { id: findNextId(tasks), title, completed: false };
    tasks.push(newTask);
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.redirect('/');
});

app.post('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    const { completed } = req.body;
    console.log(completed);
    tasks[taskIndex].completed = completed === 'on';
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})