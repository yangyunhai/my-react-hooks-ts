//项目正式上线process.env.REACT_APP_IS_Mock可以去掉
if (process.env.NODE_ENV === 'development'
 ||process.env.REACT_APP_IS_Mock==='dev') {
  require('./order');
  require('./user');
}

export default {};