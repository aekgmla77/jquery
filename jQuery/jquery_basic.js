console.log('first');
$(document).ready(function () {
    console.log('second');
    console.log(document.getElementById('food_1').childNodes[1].childNodes[0].nodeValue);
    console.log($('#food_1').children().eq(0).html());
    $('#food_1 > ul > li').eq(0).css('background', 'lightgreen');
    $('#food_1 > ul > li').eq(1).html('비빔밥');
});
//실행 순서는 ready 밖의 위 > 밖의 아래 > ready function 안 
console.log('third');