import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import ToDoSection from '../../../components/ToDoSection';
import { ITodo, ISection, ITodoList } from '../../../types';
import { todoList } from '../../../components/ToDoList/constants';

const Lists = () => {
  const [sections, setSections] = useState<ITodoList['todos']>(todoList.todos);
  const [title, setTitle] = useState(todoList.title);
  const [description, setDescription] = useState(todoList.description);
  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const [debouncedDescription, setDebouncedDescription] = useState(description);
  const [publishStatus, setPublishStatus] = useState(todoList.isPublished);
  const [isOwner, setIsOwner] = useState(true);

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

  const toggleTodo = (
    e: ChangeEvent<HTMLInputElement>,
    section: ISection,
    todo: ITodo
  ) => {
    todo.isDone = e.target.checked;

    setSections((prev) => {
      const sectionIndex = prev.findIndex((s) => s.id === section.id);
      const todoIndex = prev[sectionIndex].todos.findIndex(
        (t) => t.id === todo.id
      );
      prev[sectionIndex].todos.splice(todoIndex, 1, todo);
      return [...prev];
    });
  };

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

  const todoSections = sections.map((section: ISection) => {
    return (
      <ToDoSection
        key={section.id}
        isOwner={isOwner}
        section={section}
        addSection={addSection}
        deleteSection={deleteSection}
        editSectionName={editSectionName}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        setSections={setSections}
        deleteTodo={deleteTodo}
      />
    );
  });

  return (
    <>
      <fieldset>
        <label htmlFor='owner'>
          {isOwner ? 'ToDoリストオーナー' : 'ToDoリストメンバー'}
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
            />
            <label htmlFor='description'>詳細</label>
            <input
              name='description'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <label htmlFor='image'>カバー画像</label>
            <input name='image' type='file' />
          </fieldset>
        ) : (
          <>
            <h1 className='todo-list__title'>{title}</h1>
            <p>{description}</p>
          </>
        )}

        <div>{todoSections}</div>
      </article>
    </>
  );
};

export default Lists;
