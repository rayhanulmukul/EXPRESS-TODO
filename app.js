import express from 'express';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    const tasks = [
        { id: 1, title: 'Task One', completed: false },
        { id: 2, title: 'Task Two', completed: true },
        { id: 3, title: 'Task Three', completed: false }
    ]
    res.render('tasks', { tasks });
});

app.post('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})