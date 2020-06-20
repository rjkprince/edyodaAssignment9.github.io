$(function () {
  var url =
    'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

  /////////making the function for structure of table

  function createTableEntry(data) {
    //     <tr class="data-row">
    //     <td class="column1">28</td>
    //     <td class="column2">Larisa</td>
    //     <td class="column3">Llaneza</td>
    //     <td class="column4">SCallison@non.org</td>
    //     <td class="column5">(763)248-9034</td>
    //   </tr>

    let tableTr = $('<tr>').addClass('data-row');
    let tableTd1 = $('<td>').addClass('column1').text(data.id);
    let tableTd2 = $('<td>').addClass('column2').text(data.firstName);
    let tableTd3 = $('<td>').addClass('column3').text(data.lastName);
    let tableTd4 = $('<td>').addClass('column4').text(data.email);
    let tableTd5 = $('<td>').addClass('column5').text(data.phone);
    tableTr.append(tableTd1, tableTd2, tableTd3, tableTd4, tableTd5);
    tableTr.attr('id', data.id);
    tableTr.click(function () {
      let id = data.id;
      $('#userSelected').text(data.firstName + ' ' + data.lastName);
      $('#description').text(data.description);
      $('#address').text(data.address.streetAddress);
      for (let i = 1; i < $('tr').length; i++) {
        if ($('tr').eq(i)[0].id == data.id) {
          $('tr').eq(i).addClass('active');
        } else $('tr').eq(i).removeClass('active');
      }
      $('#city').text(data.address.city);
      $('#state').text(data.address.state);
      $('#zip').text(data.address.zip);
      $('#info-content').css({ display: 'block' });
    });

    return tableTr;
  }

  $.get(url, function (responseArr) {
    for (let i = 0; i < responseArr.length; i++) {
      let myTableTr = createTableEntry(responseArr[i]);

      $('tbody').append(myTableTr);
    }
  });
  ////////////enabling search box
  $('#search-box').on({
    input: function () {
      let myInput = $('#search-box')[0].value;
      myInput = myInput.toLowerCase();
      if (myInput != null && myInput != '' && myInput != undefined) {
        let col1 = $('.column1');
        let col2 = $('.column2');
        let col3 = $('.column3');
        let col4 = $('.column4');
        let col5 = $('.column5');
        for (let i = 1; i < col1.length; i++) {
          if (
            checkFn(
              col1.eq(i).text().toLowerCase(),
              col2.eq(i).text().toLowerCase(),
              col3.eq(i).text().toLowerCase(),
              col4.eq(i).text().toLowerCase(),
              col5.eq(i).text().toLowerCase(),
              myInput
            )
          ) {
            $('tr').eq(i).css({ display: 'block' });
          } else $('tr').eq(i).css({ display: 'none' });
        }
      } else {
        $('tr').css({ display: 'block' });
      }
    },
  });
  function checkFn(colm1, colm2, colm3, colm4, colm5, inp) {
    let r1 = colm1.indexOf(inp) == -1 ? false : true;

    let r2 = colm2.indexOf(inp) == -1 ? false : true;
    let r3 = colm3.indexOf(inp) == -1 ? false : true;
    let r4 = colm4.indexOf(inp) == -1 ? false : true;
    let r5 = colm5.indexOf(inp) == -1 ? false : true;

    return r1 || r2 || r3 || r4 || r5;
  }
});
