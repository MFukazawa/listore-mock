import React, { useState } from 'react';
import Image from 'next/image';
import { ISection } from '../../types';

interface ToDoSectionProps {
  isOwner: boolean;
  section: ISection;
  addSection: Function;
  deleteSection: Function;
  editSectionName: Function;
  toggleTodo: Function;
  editTodo: Function;
  setSections: Function;
  deleteTodo: Function;
}

const ToDoSection = ({
  isOwner,
  section,
  addSection,
  deleteSection,
  editSectionName,
  toggleTodo,
  editTodo,
  setSections,
  deleteTodo,
}: ToDoSectionProps) => {
  const [newContent, setNewContent] = useState<string>('');

  const handleNewTodo = () => {
    if (newContent.length === 0) return

    setSections((prev: ISection[]) => {
      const sectionIndex = prev.findIndex((s) => s.id === section.id);
      prev[sectionIndex].todos.push({
        id: String(prev[sectionIndex].todos.length + 1),
        content: newContent,
        isDone: false,
      });

      setNewContent('');

      return [...prev];
    });
  };

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
            onClick={(e) => addSection(e, section)}
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
                onChange={(e) => toggleTodo(e, section, todo)}
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
      <label htmlFor='todo'>ToDo追加</label>
      <input
        type='text'
        name='todo'
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        onKeyUp={(e) => (e.key === 'Enter' ? handleNewTodo() : '')}
      />
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
              onChange={(e) => toggleTodo(e, section, todo)}
            />
            <span>{todo.content}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoSection;
