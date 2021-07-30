import React from 'react';
import Image from 'next/image';

const ToDoSection = ({
  isOwner,
  section,
  deleteSection,
  editSectionName,
  toggleTodo,
  editTodo,
  addTodo,
  deleteTodo,
  todo
}) => {
  return isOwner ? (
    <div key={section.id}>
      <div className='flex flex-between'>
        <label htmlFor='sectionTitle'>セクション名</label>
        <span>
          <Image
            src='https://s2.svgbox.net/materialui.svg?ic=add'
            alt='セクションを追加する足すアイコン'
            className='pointer'
            width='30'
            height='30'
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
            onClick={(e) => deleteSection(e, section)}
          />
        </span>
      </div>
      <input
        type='text'
        name='sectionTitle'
        value={section.name}
        onChange={(e) => editSectionName(e, section)}
      />
      <div>
        {section.todos.map((todo) => {
          return (
            <div key={todo.id} className='todo-item grid'>
              <input
                type='checkbox'
                checked={todo.isDone}
                onChange={(e) => toggleTodo(e, todo)}
              />
              <input
                type='text'
                value={todo.content}
                onChange={(e) => editTodo(e, section, todo)}
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
                onClick={(e) => deleteTodo(e, section, todo)}
              />
            </div>
          );
        })}
      </div>
      <form onSubmit={addTodo}>
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
    </div>
  ) : (
    <div key={section.id}>
      <h3>{section.name}</h3>
      {section.todos.map((todo) => {
        return (
          <div key={todo.id} className='todo-item grid'>
            <input
              type='checkbox'
              checked={todo.isDone}
              onChange={(e) => toggleTodo(e, todo)}
            />
            <span>{todo.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoSection;
