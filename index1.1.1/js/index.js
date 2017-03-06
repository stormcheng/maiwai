$(function() {
	// 轮播设置
    var mySwiper1 = $('.swi-sli1').length <= 1 ? '' : new Swiper('.swi-con1', {
        loop: true,
        autoplay: 3000,
        preventClicks: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swi-pagi1'
    });
    // icon图标索引
    var mySwiper2 = new Swiper('.swi-con2', {
        slidesPerView:4,
		preventClicks:true
    });
    // 公告上下滚动
    var mySwiper3 = new Swiper('.swi-con3', {
   		loop:true,
   		autoplay: 3000,
		preventClicks:true,
		direction:"vertical"
    });
    //底部tab切换
    $('.foot-det:nth-child(1),.foot-det:nth-child(4)').each(function (index,el) {
        console.log(el);
       $(el).click(function () {
          $(this).addClass('active').siblings().removeClass('active');
       });
    });
    //主页底部滑动加载更多
    $('.spiritual').dropload({
        scrollArea : window,
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无数据</div>'
        },
        loadDownFn : function(me){
            $.ajax({
                type: 'POST',
                url: '/api/news/list',
                dataType: 'json',
                data:{page:page},
                success: function(data){
                    var result = '';
                    var list = data.info;
                    for(var i =0; i < list.length; i++){
                        result += '<article class="art_d"><a href="/news/newDetail?id='+list[i].news_id+'">'+
                            '<h3 class="art_t fs30">'+list[i].news_title+'</h3>'+
                            '<p class="art_w fs24">'+list[i].news_description+'</p>'+
                            '</a></article>';
                    }
                    if(list.length <= 0){
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    }
                    page++;
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('.lists').append(result);
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        threshold : 50,
    });
});
