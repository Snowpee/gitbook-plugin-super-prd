require(["gitbook","jQuery"],function(gitbook,$){
  function betterTOC(){
    //replace all % in heading id
		$(".book .book-body :header").each(function(){
			$(this)[0].id = $(this)[0].id.replace(/-%/g,'%'); //check and replace the dash
			$(this)[0].id = $(this)[0].id.replace(/%/g,'-');
		});
		//替换目录链接的百分号
		$(".atoc a").each(function(){
			if (navigator.userAgent.indexOf('Firefox') >= 0){
				$(this)[0].href = $(this)[0].href.replace(/%/g, '-');
			} else {
				$(this)[0].href = encodeURI($(this)[0].href); //对 url 进行 encode 转换，如果是 firefox 就不要执行这一行
		  		$(this)[0].href = $(this)[0].href.replace(/%/g, '-');
			}
		})
  }

  gitbook.events.bind("page.change", betterTOC);
});
