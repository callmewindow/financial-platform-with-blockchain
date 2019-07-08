var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:{},
        autoPassView:false,
        ip:"http://114.115.240.16/",
        token:localStorage.getItem("token"),
        role:localStorage.getItem("role")
    },
    mounted:function () {
        console.log("creating");
        var self = this;
        $(document).ready(function() {
            $.ajax({
                url: self.ip+"api/user/getUserInfo",
                type: 'get',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
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
    methods:{
        changeAutoPass:function () {
            this.autoPassView= true;
        },
        autoPassConfirm:function () {
            this.showItems.autoPass = (this.showItems.autoPass + 1)%2;
            console.log(this.showItems);
            var self = this;
            $.ajax({
                url: self.ip+"api/user/setAutoPass",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify({
                    "autoPass":self.showItems.autoPass
                }),
                success: function (data) {
                    console.log(data);
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            });
            this.autoPassView = false;
        },
        autoPassCancel:function () {
            this.autoPassView = false;
        }
    }
});