type Obj = {
  [key: string]: boolean;
};

const classes = (str: string, obj: Obj) => {
  const classes = [];
  for (const key in obj) {
    if (obj[key]) {
      classes.push(key);
    }
  }

  return `${str} ${classes.join(' ')}`;
};

export { classes };
export default classes;
