window.onload = function () {
//    1.获取需要的标签
    var slider = $("slider");
    var slider_main = $("slider_main");
    var slider_main_img = slider_main.children;
    var slider_ctl = slider.children

    var iNOW = 0;
//    2.动态创建指示器
    for(var i=0; i<slider_main_img.length;i++){
        var span = document.createElement("span");
        span.className = "slider-ctl-icon";
        span.innerText = slider_main_img.length - i - 1;
        slider_ctl.insertBefore(span,slider_ctl.children[1]);
    }

//  3.让第一个选中
    slider_ctl.children[1].className = "slider-ctl-icon current";

//    4.让滚动的内容归位
    var scroll_w = slider.offsetWidth;
    for(var j=1; j<slider_main_img.length;j++){
        slider_main_img[j].style.left = scroll_w + "px";
    }
//    5.遍历监听操作
    var slider_ctl_child = slider_ctl.children;
    for (var i=0; i<slider_ctl_child.length;i++) {
    //    5.1监听点击
        sldier_ctl_child[i]onmousedown = function () {
        //    5.2判断
            if(this.className === "slider-ctl-prev"){//    左边
                buffer(slider_main_img[iNOW],{"left": scroll_w});
                iNOW--;
                //判断
                if(iNOW < 0){
                    iNOW = slider_main_img.length - 1;
                }
                slider_main_img[iNOW].style.left = -scroll_w + 'px';
                buffer(slider_main_img[iNOW],{"left":0});
            }else if(this.className === "slider-ctl-next"){//右边
                autoplay();
            }else{//    下边
                /*
                1.用当前点击的索引和选中的索引对比
                2.点击的>选中的，相当于点击了右边的按钮
                3.点击的<选中的，相当于点击了左边的按钮
                */

            //获取索引
                var index = parseInt(this.innerText);
            //    对比
                if(index >iNOW){
                    buffer(slider_main_img[iNOW],{"left":-scroll_w});
                    slider_main_img[index].style.left = scroll_w + 'px';
                }else if(index<iNOW){
                    buffer(slider_main_img[iNOW],{"left": scroll_w});
                    slider_main_img[index].style.left = -scroll_w + 'px';
                }
                iNOW = index;
                buffer(slider_main_img[iNOW].{"left":0});
            }
            changeIndex();
        }


    }
    
//    6.切换索引
    function changeIndex() {
        for(var i=1; i<slider_ctl_child.length-1;i++){
            slider_ctl_child[i].className= "slider-ctl-icon";
        }
        slider_ctl_child[iNOW+1].className = "slider-ctl-icon current";
    }

//    7.自动播放
    var timer = setInterval(autoplay,1000);
    function autoplay() {
        buffer(slider_main_img[iNOW],{"left": -scroll_w});
        iNOW++;
        if(iNOW >= slider_main_img.length){
            iNOW = 0;
        }
        slider_main_img[iNOW].style.left = scroll_w + 'px';
        buffer(slider_main_img[iNOW],{"left":0});

        changeIndex()
    }
//    8.设置和清除定时器
    slider.onmouseover = function () {
        clearInterval(timer);
    };
    slider.onmouseout = function () {
        timer = setInterval(autoplay,1000);
    }
};
