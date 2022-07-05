export const getFoldersFromLS = () => {
  const data = localStorage.getItem('folders');

  const items = data? JSON.parse(data) : [];
  
  return items;
}