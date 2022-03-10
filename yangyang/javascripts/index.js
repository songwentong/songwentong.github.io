
window.addEventListener('DOMContentLoaded', function () {
        
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone =/(iPhone\sOS)\s([\d_]+)/g.test(ua),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;

        var cWidth = document.documentElement.clientWidth || document.body.clientWidth;

    // ios 下载地址
    var iosReleaseDownloadUrl = "https://itunes.apple.com/cn/app/圈村/id1290217588?l=zh&ls=1&mt=8",
        // android 下载地址
        androidReleaseDownloadUrl = "http://qc.lianxi.com",
        //下载按钮列表,通过data-app的值区分android还是ios
        downloadList = document.querySelectorAll('.app-download'),
        // 横屏切换按钮列表，通过data-index区分当前点击的
        tabList = document.querySelectorAll('.header-li'),
        // 横屏容器
        wrapper = document.querySelector('.wrapper'),
        // 需要懒加载的图片列表
        imgList = document.querySelectorAll('.lazy'),
        // 上次点击的index
        lastIndex = 1;

        
        var lazyLoad = (currentImg, src) => {
            // 图片地址不合规范
            if(!/^\S+\.(?:(jpg)|(png)|(gif))$/ig.test(src)){
                return;
            }
        
            var className = currentImg.className;
            className = className.replace(/^(?:\s*)lazy|\s+lazy\s+|\s+lazy\s*$/g, "").replace(/^ +| +$/g, "");
            
            var img = new Image();
            img.src = src;
            img.onload = () => {
                
                currentImg.src = img.src;
                //将已加载标识设为true
                currentImg.loaded = true;
                //重置样式，去掉lazy标识
                currentImg.className = className + " show";
                
                img = null;
            }
            img.onerror = () => {
                img = null;
                return;
            }
        };
        var offset = (ele) => {
            let resultLeft = ele.offsetLeft,
                resultTop = ele.offsetTop,
                parent = ele.offsetParent;
        
            while (parent) {
                resultLeft += parent.offsetLeft;
                resultTop += parent.offsetTop;
                parent = parent.offsetParent;
            }
            return {
                left: resultLeft,
                top: resultTop
            }
        };
        var imgLazyLoadByScroll = function (imgList) {

            if (!imgList) {
                return;
            }
            for (let i = 0, len = imgList.length; i < len; i++) {
                var currentImg = imgList[i],
                iUrl; //最终图片地址
                //如果图片已经处理过则不处理
                if (currentImg.loaded) {
                    continue;
                }
                let dataSrc = currentImg.getAttribute('data-src');
                if (dataSrc === undefined || dataSrc === null) {
                    continue;
                }
                //判断当前图片中间偏移body的位置是否小于滚动距离，如果小于则加载图片
                //由于图片开始隐藏，所以获取不到其高度，所以获取其父元素的高度
                var top = currentImg.parentNode.offsetHeight / 2 + offset(currentImg.parentNode).top,
                    cHeight = document.documentElement.clientHeight || document.body.clientHeight,
                    sTop = document.documentElement.scrollTop || document.body.scrollTop;
                var stp = cHeight + sTop;
                // 兼容本地机测试情况
                
                if (stp > top) {
                    lazyLoad(currentImg, dataSrc);
                }
            }
        };
        
    // 图片懒加载
    imgLazyLoadByScroll(imgList);

    //下载处理函数
    function downloadHandler(e) {
        var target = e.target,
            targetType = target.getAttribute('data-app');

        switch (targetType) {
            case "iphone":
                window.location.href = iosReleaseDownloadUrl;
                break;
            case "adroid":
                window.location.href = androidReleaseDownloadUrl;
                break;
        }
    }

    var isClick = (startX, startY, endX, endY, startTime, endTime) => {
        var d = Math.sqrt(Math.pow(Math.abs(startX - endX), 2) + Math.pow(Math.abs(startY - endY), 2)),
            t = endTime - startTime;
    
        if (+d > 10 || +t > 300) {
            return false;
        }
        return true;
    };

    //横屏切换函数
    // 在chrome  64.0.3282.186 版本和safari 11.0.2 (13604.4.7.1.3)版本不能处理冒泡
    function swipeHandler(e) {
        
        var target = e.target,
            pNode = null;


        if (target.className.indexOf("icon") !== -1) {
            pNode = target.parentNode.parentNode;
        } else if (target.className.indexOf("text") !== -1) {
            pNode = target.parentNode;
        } else {
            pNode = target;
        }
        console.log(pNode);
        var currentIndex = pNode.getAttribute('data-index');

        if (+currentIndex == +lastIndex) {
            return;
        }
        //去除原来激活的样式
        for (var i = 0, len = tabList.length; i < len; i++) {
            tabList[i].className = "header-li";
        }
        pNode.className = "header-li active";

        // +lastIndex !== +currentIndex ? wrapper.style.left = -1440 * (+currentIndex - 1) :null;
        wrapper.className = "wrapper index" + currentIndex;
        lastIndex = +currentIndex;
    }

    
    //循环绑定事件
    if (downloadList) {
        for (var i = 0, len = downloadList.length; i < len; i++) {
            downloadList[i].onclick = downloadHandler;
        }
    }
    if (tabList) {
        if(isIphone){
            for (let i = 0, len = tabList.length; i < len; i++) {
                // tabList[i].onclick = swipeHandler;
                let cNode = tabList[i],
                tabIndex = cNode.getAttribute('data-index');

                cNode.addEventListener('touchstart', function (e) {
                    var sX = e.changedTouches[0].pageX,
                        sY = e.changedTouches[0].pageY,
                        sTime = new Date();
                    let endHandler = (e) => {
                        var eX = e.changedTouches[0].pageX,
                            eY = e.changedTouches[0].pageY,
                            eTime = new Date();
                        if (isClick(sX, sY, eX, eY, sTime, eTime)) {
                            if (+tabIndex == +lastIndex) {
                                return;
                            }
                            //去除原来激活的样式
                            for (var i = 0, len = tabList.length; i < len; i++) {
                                tabList[i].className = "header-li";
                            }
                            cNode.className = "header-li active";
                            wrapper.className = "wrapper index" + tabIndex;
                            lastIndex = +tabIndex;
                        }
                    }
                    cNode.addEventListener('touchend', endHandler, false);
        
                }, false);
            }
        } else {
            for (let i = 0, len = tabList.length; i < len; i++) {
                // tabList[i].onclick = swipeHandler;
                let cNode = tabList[i],
                tabIndex = cNode.getAttribute('data-index');
                cNode.onclick = (function (cNode,currentIndex){
                    return function (){
                        if (+currentIndex == +lastIndex) {
                            return;
                        }
                        //去除原来激活的样式
                        for (var i = 0, len = tabList.length; i < len; i++) {
                            tabList[i].className = "header-li";
                        }
                        cNode.className = "header-li active";
                        wrapper.className = "wrapper index" + currentIndex;
                        lastIndex = +currentIndex;
                    }
                })(cNode,tabIndex);
            }
        }
       
    }
     //处理滚动事件：节流器
     var throttle = {
        timeId: null,
        process: function () {
            window.clearTimeout(this.timeId);
            this.timeId = setTimeout(function () {
                imgLazyLoadByScroll(imgList);
            }, 200);
        }
    };
    window.onscroll = throttle.process;

}, false);