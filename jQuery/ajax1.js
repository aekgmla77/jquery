$(function () {
    // ajax 호출
    $.ajax({
        url: '../data/MOCK_DATA.json',
        dataType: 'json',
        success: showContent,
        error: function (result) {
            console.log('에러' + result.statusText);
        }
    });
    //버튼 이벤트
    $('#btn').click(addRow);
    // find 이벤트
    $('#findBtn').on('click', findRow);
});

function findRow() {
    let findId = $('#find_id').val();
    let findRow = $('#' + findId + '').css('background', 'gray');
    // 신규 row 생성.
    findRow.after(makeNewTr());
}

function makeNewTr() {
    let inputs = $('.input_val');
    let tr = $('<tr />');
    $(tr).click(trToInputFunc);
    $(tr).hover(function () {
        $(this).css('background', 'lightgreen');
    }, function () {
        $(this).css('background', '');
    });
    for (let i = 0; i < inputs.length; i++) {
        let td = $('<td />').html(inputs[i].value);
        tr.append(td);
    }
    let btn = $('<button />').html('Del');
    let td = $('<td />');
    $(btn).click(tdToFunc);
    $(td).append(btn);
    $(tr).append(td);
    return tr;
}
function addRow() {
    $('#tbl').append(makeNewTr());
}
function btnFunc() {
    console.log($(this));
    let tr = $('<tr />');
    let tdId = $('<td />').html($('#id').val());
    let tdFirst = $('<td />').html($('#first_name').val());
    let tdLast = $('<td />').html($('#last_name').val());
    let tdEmail = $('<td />').html($('#email').val());
    $('#tbl').append($(tr).append(tdId, tdFirst, tdLast, tdEmail));
}
function showContent(result) {
    let headers = ['id', 'first_name', 'last_name', 'email', 'Del'];
    console.log(result);
    let data = result;
    let table = $('<table />').attr('border', '1').attr('id', 'tbl');
    let titles = $('<tr />')
    for (fiel of headers) {
        let th = $('<th />').html(fiel.replace('_', ' ').toUpperCase());
        titles.append(th);
    }
    table.append(titles);
    $.each(data, function (idx, obj) {
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            let btn = $('<button />').html('Del');
            $(btn).click(tdToFunc);
            // tr 이벤트
            // $(tr).click(trToInputFunc);
            // $(tr).mouseover(function () {
            //     $(this).css('background', 'lightgreen');
            // })
            // $(tr).mouseout(function () {
            //     $(this).css('background', '');
            // })
            $(tr).on({
               'click': trToInputFunc,
               'mouseover': function(){
                $(this).css('background', 'lightgreen');
            }, 'mouseout': function(){
                $(this).css('background', '');
            }
        });
            // --> end
            for (field of headers) {
                let td = $('<td />').html(obj[field]);
                td.append(btn);
                tr.append(td);
            }
            table.append(tr);
        }
    })
    $('#show').append(table);
}

function trToInputFunc() {
    console.log($(this).children().eq(0).html());
    $('#id').val($(this).children().eq(0).html());
    $('#first_name').val($(this).children().eq(1).html());
    $('#last_name').val($(this).children().eq(2).html());
    $('#email').val($(this).children().eq(3).html());
}

function tdToFunc() {
    $(this).parent().parent().remove();
}