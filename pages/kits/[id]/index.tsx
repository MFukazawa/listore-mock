import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Image from 'next/image';
import favicon from '../../../public/favicon.ico';
import { ITodo, ITodoList, ISection } from '../../../types/index';
import { todoList } from './constants';
import KitSection from '../../../components/KitSection';

const Kits = () => {
  const [sections, setSections] = useState<ISection[]>(todoList.todos);
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

  const editTodo = (
    e: ChangeEvent<HTMLInputElement>,
    section: ISection,
    todo: ITodo
  ) => {
    todo.content = e.target.value;

    setSections((prev) => {
      const sectionIndex = prev.findIndex((s) => s.id === section.id);
      const todoIndex = prev[sectionIndex].todos.findIndex(
        (t) => t.id === todo.id
      );
      prev[sectionIndex].todos.splice(todoIndex, 1, todo);
      return [...prev];
    });
  };

  const deleteTodo = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    section: ISection,
    todo: ITodo
  ) => {
    if (section.todos.length === 1) {
      alert('最後のToDoを削除することができません');
      return;
    }
    setSections((prev) => {
      const sectionIndex = prev.findIndex((s) => s.id === section.id);
      prev[sectionIndex].todos = prev[sectionIndex].todos.filter(
        (t) => t.id !== todo.id
      );
      return [...prev];
    });
  };

  const editSectionName = (
    e: ChangeEvent<HTMLInputElement>,
    section: ISection
  ) => {
    section.name = e.target.value;
    setSections((prev) => {
      const index = prev.findIndex((s) => s.id === section.id);
      prev.splice(index, 1, section);
      return [...prev];
    });
  };

  const addSection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    section: ISection
  ) => {
    setSections((prev) => {
      prev.push({
        name: '',
        id: String(sections.length + 10),
        todos: [],
      });
      return [...prev];
    });
  };

  const deleteSection = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    section: ISection
  ) => {
    if (sections.length === 1) {
      alert('最後のセクションを削除することができません');
      return;
    }

    setSections((prev) => {
      return prev.filter((s) => s.id !== section.id);
    });
  };

  const sectionsMap = sections.map((section) => {
    return (
      <KitSection
        key={section.id}
        isOwner={isOwner}
        section={section}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
        editSectionName={editSectionName}
        addSection={addSection}
        deleteSection={deleteSection}
        setSections={setSections}
      />
    );
  });

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

        <div>{sectionsMap}</div>

        {/* {isOwner && (
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
        )} */}
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
            alt='Twitter icon'
          />
        </span>
        <span className='pointer'>
          <Image
            src='https://s2.svgbox.net/social.svg?ic=facebook'
            width='30'
            height='30'
            alt='Facebook icon'
          />
        </span>
      </article>
    </>
  );
};

export default Kits;
