export const all = () => true;

export const overdue = (date = new Date()) => (item) => item.dueDate && item.dueDate < date;

export const today = (date = new Date()) => (item) => item.dueDate && item.dueDate.toLocaleDateString() === date.toLocaleDateString();

export const repeating = (item) => Object.values(item.repeatingDays).some((v) => v);
