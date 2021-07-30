export interface ITodo {
  id: string;
  content: string;
  isDone: boolean;
}

export interface ISection {
  name: string;
  id: number,
  todos: ITodo[];
}

export interface ITodoList {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  todos: ISection[];
}

export const initTodoState: ITodo = { id: '', content: '', isDone: false };
