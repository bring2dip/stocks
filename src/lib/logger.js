export default {
  // change the argument name to show if it changes the content hash
  // it doesn't change in minified mode
  log: (...abc) => console.log(abc),
  error: (e) => console.error(e),
};

