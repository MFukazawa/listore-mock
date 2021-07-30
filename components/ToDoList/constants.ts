import { ITodoList } from '../../types'

export const todoList: ITodoList = {
  id: '1123412341235123',
  title: 'ほげ',
  description: 'てげてげてげてげてげてげてげ',
  isPublished: false,
  todos: [
    {
      name: 'セクションA',
      id: 1,
      todos: [
        {
          id: '1',
          content: 'ちゃんぽん食べに行く',
          isDone: true,
        },
        {
          id: '2',
          content: 'Golangを勉強する',
          isDone: false,
        },
        {
          id: '3',
          content: '早く寝る',
          isDone: false,
        },
      ],
    },
    {
      name: 'セクションB',
      id: 2,
      todos: [
        {
          id: '11',
          content: 'ちゃんぽん食べに行く',
          isDone: true,
        },
        {
          id: '22',
          content: 'Golangを勉強する',
          isDone: false,
        },
        {
          id: '33',
          content: '早く寝る',
          isDone: false,
        },
      ],
    },
  ],
};
