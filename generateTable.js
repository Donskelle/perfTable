window.generateTableData = () => {
  const params = new URLSearchParams(location.search);

  const rows = params.get('rows') ? parseInt(params.get('rows')) : 100;
  const columns = params.get('columns') ? parseInt(params.get('columns')) : 100;

  const data = [];

  for (let i = 0; i < rows; i++) {
    const entrys = [];
    for (let j = 0; j < columns; j++) {
      entrys.push(i * j);
    }
    data.push(entrys);
  }

  return data;
};
