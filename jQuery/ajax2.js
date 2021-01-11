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
    //button 클릭 이벤트.
    $('#btn').on('click', function () {
        $('input:checked').parent().parent().remove();
    });
    //all_check 클릭 이벤트(라이브 이벤트 방식)
    $('body').on('click', '#all_check', function () {
        console.log('checked');
        // $('td > input').prop('checked', $('#all_check').is(":checked"))
        if ($('#all_check').is(":checked"))
            $('td > input').prop('checked', true);
        else
            $('td > input').prop('checked', false);
    })
    $('body').on('click', 'td > input', function () {
        console.log('checked');
        if ($(':checkbox').is(":checked"))
            $('#all_check').prop('checked', true);
        else
            $('#all_check').prop('checked', false);
    })
});

function showContent(result) {
    let headers = ['chkbox', 'id', 'first_name', 'last_name', 'email', 'Del'];
    console.log(result);
    let data = result;
    let table = $('<table />').attr('border', '1').attr('id', 'tbl');
    let titles = $('<tr />')
    for (fiel of headers) {
        let th;
        if (fiel == 'chkbox') {
            let checkbox = $('<input />').attr('type', 'checkbox').attr('id', 'all_check');
            th = $('<th />').append(checkbox);
            th.attr('width', '50px');
        } else {
            th = $('<th />').html(fiel.replace('_', ' ').toUpperCase());
        }
        titles.append(th);
    }
    table.append(titles);
    $.each(data, function (idx, obj) {
        if (idx < 5) {
            let tr = $('<tr />');
            $(tr).attr('id', obj.id);
            let btn = $('<button />').html('Del');
            $(btn).click(tdToFunc);
            $(tr).on({
                'mouseover': function () {
                    $(this).css('background', 'lightgreen');
                }, 'mouseout': function () {
                    $(this).css('background', '');
                }
            });
            // --> end
            for (field of headers) {
                let td = $('<td />');
                if (field == 'chkbox') {
                    let checkbox = $('<input />')
                        .attr('type', 'checkbox')
                    td.attr('align', 'center');
                    td.append(checkbox);
                } else {
                    td.html(obj[field]);
                }
                td.append(btn);
                tr.append(td);
            }
            table.append(tr);
        }
    })
    $('#show').append(table);
}

function tdToFunc() {
    $(this).parent().parent().remove();

}