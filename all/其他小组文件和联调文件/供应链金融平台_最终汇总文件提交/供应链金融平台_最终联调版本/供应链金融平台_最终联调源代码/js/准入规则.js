var wrapper = new Vue({
    el: '.wrapper',
    data: {
        showItems:[],
        crtPage:1,
        allItem:[],
        show:false,
        selected:{},
        index:-1,
        ip:"http://114.115.240.16/",
        token:localStorage.getItem("token"),
        role:localStorage.getItem("role"),
        todo:{},
        deleteView:false
    },
    created:function() {
        document.getElementById("bcFillInfoMask").style.visibility="visible";
    },
    mounted:function () {
        var self = this;
        $(document).ready(function() {
            $.ajax({
                url: self.ip+"api/access/getAllAccessRules",
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
    methods:{
        judgeData:function(json){
            var length = 0;
            if (json==null)
            {
                alert("输入不合法");
                return false;
            }
            for( var key in json ){
                length++;
                if (json[key]==""||json[key]==null) {
                    alert("输入不合法");
                    return false;
                }
            }
            if (length==0){
                return false;
                alert("输入不合法");
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
        hideFillInfo_add: function() {
            document.getElementById("bcFillInfoMask_add").style.visibility="hidden";
        },
        cancel:function () {
            this.index = -1;
            this.selected = null;
            this.show = false;
        },
        confirm:function () {
            if (this.judgeData(this.selected)){
                this.showItems[this.index] = this.selected;
                console.log(this.showItems);
                this.updateRule();
                this.index = -1;
                this.selected = null;
                this.show = false;
            }
        },
        updateRule:function(){
            var self = this;
            let sendData = self.showItems[self.index];
            sendData = JSON.stringify(sendData);
            $.ajax({
                url: self.ip+"api/access/updateAccessRule",
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
        },
        addRule:function(){
            var self = this;
            let sendData = self.todo;
            console.log(sendData);
            $.ajax({
                url: self.ip+"api/access/insertAccessRule",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify(sendData),
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
        add_confirm:function () {
            if (this.judgeData(this.todo)) {
                console.log(this.todo.content);
                this.showItems.push(this.todo);
                this.addRule();
                this.index = -1;
                this.todo = null;
                this.show = false;
            }
        },
        deleteItem:function (index) {
            this.index = index;
            this.deleteView = true;
        },
        deleteRule:function(id){
            var self = this;
            console.log(id);
            $.ajax({
                url: self.ip+"api/access/deleteAccessRule",
                type: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "token":self.token
                },
                data:JSON.stringify({
                    "id":id
                }),
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
        deleteConfirm:function () {
            this.selected =JSON.parse(JSON.stringify(this.showItems[this.index]));
            console.log(this.selected.id);
            this.deleteRule(this.selected.id);
            for (var i = 0; i < this.showItems.length; ++i) {
                if (this.showItems[i].id == this.selected.id) {
                    this.showItems.splice(i,1);
                    i--;
                }
            }
            this.deleteView = false;
            this.index = -1;
            this.selected = null;
        },
        deleteCancel:function () {
            this.deleteView = false;
            this.index = -1;
            this.selected = null;
        }
    }
});