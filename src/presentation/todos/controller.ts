import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  // DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id; //+ convierte a numero ya que recibimos un string

    if (isNaN(id))
      res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) res.status(400).json("error: Text property is required");

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null,
    };

    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ Error: "Id argument is not number" });

    const todo = todos.find((todo) => todo.id == id);
    if (!todo)
      return res.status(400).json({ error: `Todoo with ${id} not found` });

    const { text, completedAt } = req.body;

    // Si viene el valor usalo || si no viene que lo conserve
    todo.text = text || todo.text;

    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = todos.find((todo) => todo.id == id);
    if (!todo)
      return res.status(400).json({ error: `Todoo with ${id} not found` });
    
    todos.splice(todos.indexOf(todo), 1);
    res.json(todo)
  };
}
