const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号';
    }
    const resp = await API.exists(val)
    if (resp.data) {
        return '该用户名已存在，请重新选择一个用户名'
    }
})

const nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '请填写昵称';
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function (val){
    if(!val) {
        return '请填写密码';
    }
})
const loginPwdAgainValidator = new FieldValidator('txtLoginPwdConfirm', async function (val){
    if(!val) {
        return '请填写确认密码';
    }
    if(val !== loginPwdValidator.input.value){
        return '两次密码不一致，请重新输入';
    }
})

// 找到表单元素
const form = document.querySelector('.user-form');

form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, loginPwdAgainValidator)
    console.log(result)
    if(!result){
        return;
    }
    // 传入表单dom，得到一个表单数据对象
    const formData = new FormData(form)
    const data= Object.fromEntries(formData.entries())
    const resp = await API.reg(data)
    
    if(resp.code === 0){
        alert('注册成功，即将跳转到登录页面')
        location.href = './login.html'
    }
}