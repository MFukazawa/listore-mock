import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Image from 'next/image';
import favicon from '../../../public/favicon.ico';
interface ITodo {
  id: string;
  content: string;
  isDone: boolean;
}

interface ITodoList {
  id: string;
  title: string;
  description: string;
  isPublished: boolean;
  todos: ITodo[];
}

const todoList: ITodoList = {
  id: '1123412341235123',
  title: 'BBQの持ち物リスト',
  description: 'BBQをするのに必要なものリスト',
  isPublished: false,
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
  ],
};

const initTodoState: ITodo = { id: '', content: '', isDone: false };

const Kits = () => {
  const [todo, setTodo] = useState<ITodo>(initTodoState);
  const [todos, setTodos] = useState<ITodo[]>(todoList.todos);
  const [title, setTitle] = useState(todoList.title);
  const [description, setDescription] = useState(todoList.description);
  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const [debouncedDescription, setDebouncedDescription] = useState(description);
  const [publishStatus, setPublishStatus] = useState(todoList.isPublished);
  const [isOwner, setIsOwner] = useState(false);

  // TODO: Custom Hook
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTitle(title);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [title]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedDescription(description);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [description]);

  useEffect(() => {
    // INFO: 初期レンダリング時は処理しない
    if (
      debouncedTitle === todoList.title &&
      debouncedDescription === todoList.description
    )
      return;

    console.log('APIを叩く');
  }, [debouncedTitle, debouncedDescription]);

  const toggleTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    todo.isDone = e.target.checked;

    setTodos((prev) => {
      const index = prev.findIndex((t) => t.id === todo.id);
      prev.splice(index, 1, todo);
      return [...prev];
    });
  };

  const editTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    todo.content = e.target.value;
    setTodos((prev) => {
      const index = prev.findIndex((t) => t.id === todo.id);
      prev.splice(index, 1, todo);
      return [...prev];
    });
  };

  const deleteTodo = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    todo: ITodo
  ) => {
    if (todos.length === 1) {
      alert('最後のToDoを削除することができません');
      return;
    }
    setTodos((prev) => {
      return prev.filter((t) => t.id !== todo.id);
    });
  };

  const todoMap = todos.map((todo) => {
    return isOwner ? (
      <div key={todo.id} className='todo-item grid'>
        <input type='checkbox' disabled />
        <input
          type='text'
          value={todo.content}
          onChange={(e) => editTodo(e, todo)}
          onKeyPress={(e) =>
            e.key === 'Enter' ? alert('保存しました！') : null
          }
        />
        <Image
          src='https://s2.svgbox.net/materialui.svg?ic=drag_indicator'
          alt='ドラッグアイコン'
          className='pointer'
          width='30'
          height='30'
        />
        <Image
          src='/Trash.svg'
          alt='trash can'
          className='pointer'
          width='30'
          height='30'
          onClick={(e) => deleteTodo(e, todo)}
        />
      </div>
    ) : (
      <div key={todo.id} className='todo-item grid'>
        <input type='checkbox' disabled />
        <span>{todo.content}</span>
      </div>
    );
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [...prev, todo]);
    setTodo(initTodoState);
  };

  return (
    <>
      <fieldset>
        <label htmlFor='owner'>
          {isOwner ? 'キットオーナー' : 'オーナー以外の人'}
        </label>
        <input
          type='checkbox'
          id='owner'
          name='owner'
          role='switch'
          onChange={(e) => setIsOwner(e.target.checked)}
          checked={isOwner}
        />
      </fieldset>
      <article>
        {isOwner && (
          <fieldset className='publish'>
            <label htmlFor='publish'>{publishStatus ? '公開' : '非公開'}</label>
            <input
              type='checkbox'
              id='publish'
              name='publish'
              role='switch'
              onChange={(e) => setPublishStatus(e.target.checked)}
              checked={publishStatus}
            />
          </fieldset>
        )}
        {isOwner ? (
          <fieldset>
            <label htmlFor='title'>タイトル</label>
            <input
              name='title'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              data-tip='🔧適当なタイトルをつけることによって、検索時にみつけやすくなります！'
            />
            <ReactTooltip />
            <label htmlFor='description'>説明</label>
            <input
              name='description'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              data-tip='🔧見つけやすくするには、ここで関連しているキーワードを書いてね！'
            />
            <label htmlFor='image'>カバー画像</label>
            <input name='image' type='file' />
          </fieldset>
        ) : (
          <>
            <button>キットをコピー</button>
            <h1 className='todo-list__title'>{title}</h1>
            <p>{description}</p>
          </>
        )}

        {isOwner && <label>Todos</label>}

        <div>{todoMap}</div>

        {isOwner && (
          <>
            <br />
            <form onSubmit={handleSubmit}>
              <label htmlFor='todo'>ToDo追加</label>
              <input
                type='text'
                name='todo'
                value={todo.content}
                onChange={(e) => {
                  setTodo(() => {
                    return {
                      id: String(todos.length + 1),
                      content: e.target.value,
                      isDone: false,
                    };
                  });
                }}
              />
            </form>
          </>
        )}
      </article>
      <article className='flex flex-start'>
        <span className='author-image'>
          <Image src={favicon} alt='リストアのロゴ' width='50' height='50' />
        </span>
        <span className='pointer'>黒木拓巳</span>
        <span className='pointer'>
          <Image
            src='https://s2.svgbox.net/social.svg?ic=twitter'
            width='30'
            height='30'
            alt="Twitter icon"
          />
        </span>
        <span className='pointer'>
          <Image
            src='https://s2.svgbox.net/social.svg?ic=facebook'
            width='30'
            height='30'
            alt="Facebook icon"
          />
        </span>
      </article>
    </>
  );
};

export default Kits;
