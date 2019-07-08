var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        allItem:[],
        show:false,
        selected:{},
        ip:"http://114.115.240.16/",
        token:localStorage.getItem("token"),
        role:localStorage.getItem("role"),index:-1,
        todo:{},
        page:"evaluation",
        dataUrl:"data/评级管理.json",
        autoPassView:false
    },
    created:function() {
        document.getElementById("bcFillInfoMask").style.visibility="visible";
    },
    mounted:function () {
        var self = this;
        $(document).ready(function() {
            $.ajax({
                url: self.ip+"api/user/getAllSuppliers",
                type: 'get',
                success: function (res) {
                    var data = res.data;
                    console.log(data);
                    for(var i = 0;i< data.length;i++){
                        if (!data[i].profile.rank) {
                            data[i].profile.rank = "无";
                        }
                        if(!data[i].profile.applied ){
                            data[i].profile.applied = 0;
                        }
                        if(!data[i].profile.approved ){
                            data[i].profile.approved = 0;
                        }
                    }
                    self.showItems = data;
                },
                fail: function (res) {
                    console.log(res)
                }
            })
        });
    },
    methods:{
        judgeData:function(json){
            if(json.profile.rank==null||json.profile.rank==""){
                alert("输入不合法");
                return false;
            }
            if(isNaN(parseInt(json.profile.approved,10))){
                alert("输入不合法");
                return false;
            }
            if (json==null)
            {
                alert("输入不合法");
                return false;
            }
            return true;
        },
        showFillInfo: function(index) {
            this.index = index;
            this.selected =JSON.parse(JSON.stringify(this.showItems[index]));
            console.log(this.selected);
            this.show = true;
            console.log(this.show);
        },
        cancel:function () {
            this.index = -1;
            this.selected = null;
            this.show = false;
        },
        confirm:function () {
            console.log(this.selected);
            if (this.judgeData(this.selected)){
                this.showItems[this.index] = this.selected;
                console.log(this.showItems);
                this.updateRank();
                this.index = -1;
                this.selected = null;
                this.show = false;
            }
        },
        updateRank:function () {
            var self = this;
            var sendData = self.showItems[self.index];
            sendData.rank = sendData.profile.rank;
            sendData.money = sendData.profile.approved;
            sendData = JSON.stringify(sendData);
            $.ajax({
                url: self.ip+"api/credit/rank",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:sendData,
                success: function (data) {
                    console.log(data)
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            });
            $.ajax({
                url: self.ip+"api/credit/approve",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:sendData,
                success: function (data) {
                    console.log(data)
                },
                error:function(xhr,status,error){
                    console.log(xhr);
                    console.log(xhr.status);
                    console.log(error);
                }
            })
        }
    }
});