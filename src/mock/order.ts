import Mock from 'mockjs';
export default Mock.mock(`${process.env.BASE_API}/order/getOrderList`, 'get', {
  success: true,
  message: '@cparagraph',
  'list|10': [
    {
      'id|+1': 1, //数字从1开始，后续依次加1
      userName: '@cname', //名字为随机中文名
      'userAge|18-28': 25, //年龄是18-28之间的随机数
      'userSex|1': ['男', '女'], //性别是数组里的随机一项
      'title|1': ['苹果6s', '华为高端版', '小米终极版', '魅族家庭版'], //数组里的随机一项
      'createtime':'@date("yyyy-MM-dd")',//任意日期
      'address':'@county(true)'//任意地址  
    }
  ]
});
