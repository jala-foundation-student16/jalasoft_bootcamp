export function transformToOptions(data) {
  const newData = data.map((d) => {
    return { value: d.id, label: d.name };
  });
  return newData;
}

export function transformCustomersToOptions(data) {
  const newData = data.map((d) => {
    return { value: d.id, label: d.company_name };
  });
  return newData;
}
