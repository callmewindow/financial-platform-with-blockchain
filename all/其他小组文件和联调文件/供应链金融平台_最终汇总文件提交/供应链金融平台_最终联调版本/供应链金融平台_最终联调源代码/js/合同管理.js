var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        ip:"http://114.115.240.16/",
        token:localStorage.getItem("token"),
        role:localStorage.getItem("role")
    },
    mounted:function () {
        console.log("creating");
        var self = this;
        $(document).ready(function() {
            $.ajax({
                url: self.ip+"api/financing/getFinancingByUserAndStatus",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify({
                    "status":3
                }),
                success: function (data) {
                    console.log(data.data);
                    self.showItems = data.data;
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            });
            $.ajax({
                url: self.ip+"api/financing/getFinancingByUserAndStatus",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify({
                    "status":4
                }),
                success: function (data) {
                    console.log(data.data);
                    self.showItems.push(data.data);
                    console.log(self.showItems)
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            })
        });
    },
    methods:{
        search:function () {

        }
    }
});