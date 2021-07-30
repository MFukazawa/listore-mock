export const toggleTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
  todo.isDone = e.target.checked;

  setSections((prev) => {
    const index = prev.findIndex((t) => t.id === todo.id);
    prev.splice(index, 1, todo);
    return [...prev];
  });
};

export const editTodo = (e: ChangeEvent<HTMLInputElement>, section: ISection, todo: ITodo) => {
  todo.content = e.target.value;

  setSections((prev) => {
    const sectionIndex = prev.findIndex((s) => s.id === section.id);
    const todoIndex = prev[sectionIndex].todos.findIndex((t) => t.id === todo.id)
    prev[sectionIndex].todos.splice(todoIndex, 1, todo)
    return [...prev]
  })
};

export const editSectionName = (e: ChangeEvent<HTMLInputElement>, section: ISection) => {
  section.name = e.target.value;
  setSections((prev) => {
    const index = prev.findIndex((s) => s.id === section.id);
    prev.splice(index, 1, section);
    return [...prev]
  })
}

export const deleteSection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, section: ISection) => {
  if (sections.length === 1) {
    alert('最後のセクションを削除することができません')
    return;
  }

  setSections((prev) => {
    return prev.filter((s) => s.id !== section.id)
  })
}

export const deleteTodo = (
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