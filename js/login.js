const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号';
    }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function (val) {
    if (!val) {
        return '请填写密码';
    }
})

// 找到表单元素
const form = document.querySelector('.user-form');

form.onsubmit = async function (e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator)
    console.log(result)
    if (!result) {
        return;
    }
    // 传入表单dom，得到一个表单数据对象
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    const resp = await API.login(data)

    if (resp.code === 0) {
        alert('登录成功，即将跳转到首页')
        location.href = './index.html'
    } else {
        loginIdValidator.p.innerText = '账号或密码错误，请重新输入'
        loginPwdValidator.input.value = ''
    }
}