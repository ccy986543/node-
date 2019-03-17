class Goods{
    constructor(options){
        this.cont = options.cont;
        this.url = options.url;
        // 1.准备读取数据
        this.load()
        // 4.使用事件委托绑定事件
        this.addEvent()
    }
    load(){
        var that = this;
        ajaxGet(this.url).then(function(res){
            // 2.解析并保存数据
            that.res = JSON.parse(res);
            // 3.准备渲染页面
            that.display()
        })
    }
    display(){
        var str = "";
        this.res.forEach(function(value){
            str += `<div class="box" index="${value.id}">
                        <img src="${value.url}">
                        <span>${value.price}</span>
                        <p>${value.name}</p>
                        <em>加入购物车</em>
                    </div>`;
        })
        this.cont.innerHTML = str;
    }
    addEvent(){
        var that = this;
        this.cont.addEventListener("click",function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "EM"){
                // 5.拿到当前点击商品的货号
                that.id = target.parentNode.getAttribute("index");
                // 6.准备存cookie
                that.setGoods()
            }
        })
    }
    setGoods(){
        // console.log(this.id);
        // 6-1.先读cookie，以确定是否是第一次存储
        this.goods = getCookie("goods")==="" ? [] : JSON.parse(getCookie("goods"));
        // 6-2.在6-1中已经做设置，如果是第一次存，goods是数组，且长度为0
        if(this.goods.length < 1){
            // 6-3.直接存，存货号和数量
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var onoff = true;
            // 6-4.不是第一次，goods有长度，先判断是否存在老的，如果存在老的，增加数量同时修改开关，结束循环
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = false;
                    break;
                }
            }
            // 6-5.反之，如果开关在循环结束后，没有被关闭，说明没有找到重复数据，直接新增
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }
        // 6-6.其实以上所有操作只是修改读取并编译之后的数组，并没有操作到cookie，最后还需要转成字符之后，设置给cookie
        setCookie("goods",JSON.stringify(this.goods));
    }
}

new Goods({
    cont:document.getElementById("cont"),
    url:"localhost:3000/api/list"
})