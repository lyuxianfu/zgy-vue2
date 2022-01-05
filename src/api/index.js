export const fetch = () => {
  return new Promise((resolve) => {
    resolve([
      { sex: "男", age: 22, name: "tom" },
      { sex: "女", age: 32, name: "amy" },
      { sex: "女", age: 19, name: "jason" },
      { sex: "男", age: 27, name: "john" },
      { sex: "男", age: 42, name: "sun" },
    ]);
  });
};
