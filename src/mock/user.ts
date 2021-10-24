import Mock from 'mockjs'

Mock.mock(`${process.env.REACT_APP_BASE_URL}/user/login`, 'post', {
  success: true,
  msg: '@cparagraph',
  data:{
    token:'@time()',
    auths:'order,order-list,business-list,user-list,user-role,add-business',
    pic:'https://images.pexels.com/users/avatars/109303118/kyle-karbowski-380.jpeg?auto=compress&fit=crop&h=60&w=60',
  }
});

Mock.mock(`${process.env.REACT_APP_BASE_URL}/user/getUserList`, 'post', {
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


Mock.mock(`${process.env.REACT_APP_BASE_URL}/user/getRoleList`, 'post', {
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
