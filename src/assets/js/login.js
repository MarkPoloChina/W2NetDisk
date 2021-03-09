

var app = new Vue({
    el: '#controller',
    data: {
        form_login:{username:'',passwd:'',rem:true}

    },
    methods: {
        login(){
            if (this.form_login.username == '')
                return alert("请输入账号！");
            else if (this.form_login.passwd == '')
                return alert("请输入密码！");
            axios({
                method:'post',
                url: 'http://localhost:12306',
                data: {
                    username:this.form_login.username,
                    passwd:this.form_login.passwd
                },
            })
            .then(function (response) {
                console.log(response.status);
                if (response.status==200)
                {
                    // sessionStorage.clear()
                    // sessionStorage.setItem('userid',JSON.stringify(res.data.userInfo.id))
                    // sessionStorage['token']=JSON.stringify(res.data.token)
                    alert("OK")
                    window.location.replace("/index.html")
                }
                else if (response.status==1000)
                {
                    alert("PIN ERR")
                    this.form_login.passwd = ''
                }
                else
                {
                    alert("CON ERR")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
})