var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        allItem:[],
        show:false,
        selected:{},
        index:-1,
        todo:{},
        key:"id",
        value:"",
        ip:"http://114.115.240.16/",
        token:localStorage.getItem("token"),
        role:localStorage.getItem("role"),
        page:"supplier",
        dataUrl:"data/供应商.json",
        freezeView:false
    },
    mounted:function () {
        this.init();
    },
    methods:{
        init:function(){
            var self = this;
            $(document).ready(function() {
                $.ajax({
                    url: self.ip+"api/user/getAllSuppliers",
                    type: 'get',
                    success: function (res) {
                        var data = res.data;
                        console.log(data);
                        self.showItems = data;
                    },
                    fail: function (res) {
                        console.log(res)
                    }
                })
            });
        },
        search:function(){
            console.log(this.value);
            console.log(this.value=="");
            if (this.value==""){
                this.init();
                return;
            }
            var self = this;
            var url="api/user/getUserById";
            var key = 'id';
            if (this.key==='email'){
                key = 'email';
                url = 'api/user/getUserByEmail'
            }
            $.ajax({
                url: self.ip+url,
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify({
                    [key]: self.value
                }),
                success: function (data) {
                    if (data.status===0){
                        if (self.key=='id')
                            alert("不存在的用户ID");
                        else
                            alert("不存在的注册邮箱");
                    }
                    else {
                        self.showItems = [data.data];
                        console.log(data)
                    }
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            })
        },
        showFreeze:function (index) {
            this.index = index;
            this.freezeView = true;
        },
        freeze:function(){
            var self = this;
            var data = this.selected;
            $.ajax({
                url: self.ip+"api/user/setFrozen",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify(data),
                success: function (data) {
                    console.log(data)
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            })
        },
        freezeConfirm:function () {
            this.selected =JSON.parse(JSON.stringify(this.showItems[this.index]));
            console.log(this.selected);
            this.selected.frozen = ((parseInt(this.selected.frozen)+1)%2);
            this.freezeView = false;
            this.showItems[this.index] = this.selected;
            this.freeze();
            this.index = -1;
            this.selected = null;
        },
        freezeCancel:function () {
            this.freezeView = false;
            this.index = -1;
            this.selected = null;
        }
    }
});