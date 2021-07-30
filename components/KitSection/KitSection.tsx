import React, { useState } from 'react';
import Image from 'next/image';
import { ITodo, ISection } from '../../types';

interface KitSectionProps {
  isOwner: boolean;
  section: ISection;
  addSection: Function;
  deleteSection: Function;
  editSectionName: Function;
  editTodo: Function;
  setSections: Function;
  deleteTodo: Function;
}

const KitSection = ({ isOwner, section, editTodo, deleteTodo, addSection, deleteSection, editSectionName, setSections }: KitSectionProps) => {
  const [newContent, setNewContent] = useState<string>('');

  const handleNewTodo = () => {
    if (newContent.length === 0) return;

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
    <section key={section.id}>
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
      {section.todos.map((todo: ITodo) => {
        return (
          <div key={todo.id} className='todo-item grid'>
            <input type='checkbox' disabled />
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
      <label htmlFor='todo'>ToDo追加</label>
      <input
        type='text'
        name='todo'
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        onKeyUp={(e) => (e.key === 'Enter' ? handleNewTodo() : '')}
      />

    </section>
  ) : (
    <section key={section.id}>
      <h3>{section.name}</h3>
      {section.todos.map((todo: ITodo) => {
        return (
          <div key={todo.id} className='todo-item grid'>
            <input type='checkbox' disabled />
            <span>{todo.content}</span>
          </div>
        );
      })}
    </section>
  );
};

export default KitSection;
