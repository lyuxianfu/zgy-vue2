export const fetch = (data) => {
  console.log(data);
  return new Promise((resolve) => {
    if (data.page === 1) {
      setTimeout(() => {
        resolve({
          data: [
            { sex: "男", age: 22, name: "tom" },
            { sex: "女", age: 32, name: "amy" },
            { sex: "女", age: 19, name: "jason" },
            { sex: "男", age: 27, name: "john" },
            { sex: "男", age: 42, name: "sun" },
            { sex: "男", age: 22, name: "tom" },
            { sex: "女", age: 32, name: "amy" },
            { sex: "女", age: 19, name: "jason" },
            { sex: "男", age: 27, name: "john" },
            { sex: "男", age: 42, name: "sun" },
          ],
          totalCount: 17,
        });
      }, 1000);
    } else {
      setTimeout(() => {
        resolve({
          data: [
            { sex: "男", age: 22, name: "tom" },
            { sex: "女", age: 32, name: "amy" },
            { sex: "女", age: 19, name: "jason" },
            { sex: "男", age: 27, name: "john" },
            { sex: "男", age: 42, name: "sun" },
            { sex: "男", age: 22, name: "tom" },
            { sex: "女", age: 32, name: "amy" },
          ],
          totalCount: 17,
        });
      }, 1000);
    }
  });
};
