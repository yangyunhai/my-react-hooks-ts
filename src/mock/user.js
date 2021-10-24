const Mock =require('mockjs');


Mock.mock(`${process.env.REACT_APP_BASE_URL}/user/getUserList`, 'get', {
  success: true,
  msg: '@cparagraph',
  'list|5': [
    {
      'id|+1': 1, //数字从1开始，后续依次加1
      userName: '@cname', //名字为随机中文名
      'userSex|1': ['男', '女'], //性别是数组里的随机一项
      'createtime':'@date("yyyy-MM-dd")',//任意日期
      "pic":"@image('300x250, '#fb0a2a')",
    }
  ]
});


Mock.mock(`${process.env.REACT_APP_BASE_URL}/user/getRoleList`, 'get', {
  success: true,
  msg: '@cparagraph',
  'list|6': [
    {
      'id|+1': 1, //数字从1开始，后续依次加1
      name: '@cname', //名字为随机中文名
      createtime:'@date("yyyy-MM-dd")',//任意日期
    }
  ]
});
