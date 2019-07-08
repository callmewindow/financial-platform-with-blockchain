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
        page:"product",
        dataUrl:"data/产品管理.json",
        deleteView:false
    },
    created:function() {
        document.getElementById("bcFillInfoMask").style.visibility="visible";
    },
    mounted:function () {
        var self = this;
        $(document).ready(function() {
            $.ajax({
                url: self.ip+"api/product/getAllProducts",
                type: 'get',
                success: function (res) {
                    var data = res.data;
                    console.log(data);
                    for (var i = 0;i < data.length;i++){
                        data[i].additional = JSON.parse(data[i].additional);
                        Object.assign(data[i],data[i].additional);
                        console.log(data[i].additional.type)
                    }
                    console.log(data);
                    self.showItems = data;
                },
                fail: function (res) {
                    console.log(res)
                }
            })
        });
        console.log("creating");

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
        addPro:function(){
            var self = this;
            let sendData = self.todo;
            sendData.additional = JSON.stringify({
                "type":sendData.type,
                "return":sendData.return,
                "money":sendData.money
            });
            $.ajax({
                url: self.ip+"api/product/insertProduct",
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
        updatePro:function(){
            var self = this;
            let sendData = self.showItems[self.index];
            sendData.additional = JSON.stringify({
                "type":sendData.type,
                "return":sendData.return,
                "money":sendData.money
            });
            sendData = JSON.stringify(sendData);
            $.ajax({
                url: self.ip+"api/product/updateProduct",
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
        confirm:function () {
            if (this.judgeData(this.selected)){
                this.showItems[this.index] = this.selected;
                console.log(this.showItems);
                this.updatePro();
                this.index = -1;
                this.selected = null;
                this.show = false;
            }
        },
        add_confirm:function () {
            if (this.judgeData(this.todo)) {
                this.showItems.push(this.todo);
                this.addPro();
                this.index = -1;
                this.todo = null;
                this.show = false;
            }
        },
        deleteItem:function (index) {
            this.index = index;
            this.deleteView = true;
        },
        deletePro:function(id){
            var self = this;
            console.log(id);
            $.ajax({
                url: self.ip+"api/product/deleteProduct",
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
            this.deletePro(this.selected.id);
            for (var i = 0; i < this.showItems.length; ++i) {
                if (this.showItems[i].id == this.selected.id) {
                    this.showItems.splice(i,1);
                    i--;
                }
            }
            this.deleteView = false;
            storeJson(this.showItems,this.page);
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