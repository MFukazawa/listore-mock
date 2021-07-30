import { ITodoList } from '../../types/';

export const todoList: ITodoList = {
  id: '1123412341235123',
  title: 'BBQの持ち物リスト',
  description: 'BBQをするのに必要なものリスト',
  isPublished: false,
  todos: [
    {
      name: 'バーベキュー道具',
      id: '1',
      todos: [
        {
          id: '1',
          content: 'バーベキューコンロ',
          isDone: true,
        },
        {
          id: '2',
          content: '網',
          isDone: false,
        },
        {
          id: '3',
          content: '炭',
          isDone: false,
        },
        {
          id: '4',
          content: '炭バサミ',
          isDone: false,
        },
        {
          id: '5',
          content: '着火剤',
          isDone: false,
        },
        {
          id: '6',
          content: 'ガズバーナー',
          isDone: false,
        },
        {
          id: '7',
          content: 'テーブル',
          isDone: false,
        },
        {
          id: '8',
          content: '調理用トング',
          isDone: false,
        },
      ]
    },
    {
      name: '雑費',
      id: '2',
      todos: [
        {
          id: '9',
          content: 'クーラーBOX',
          isDone: false,
        },
        {
          id: '10',
          content: '紙皿',
          isDone: false,
        },
        {
          id: '11',
          content: '割り箸',
          isDone: false,
        },
        {
          id: '12',
          content: 'コップ',
          isDone: false,
        },
      ]
    }
  ],
};
