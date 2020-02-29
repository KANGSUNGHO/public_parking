function update_gangnam_parking_info(parkingType, listId) {
    
    let key = 'apikey'
    
    $('#'+listId).html('');
    $.ajax({
      type: "GET",
      url: "http://openapi.seoul.go.kr:8088/" + key + "/json/gangnamParingInfo/1/60",
      data: {},
      success: function(response){
//          let staticMapContainers = [];
          let staticMaps = [];
          let staticMapsMaker =[];

          let rows = response['gangnamParingInfo']['row'];
          for (let i = 0; i < rows.length; i++) {
            let parking_name = rows[i]['NM'];
            let parking_type = rows[i]['KIND']
            let open_date = rows[i]['OPEN_DATE']
            let money_info = rows[i]['MONEY_INFO']
            let basic_money = rows[i]['BASIC_MONEY']
            let add_money = rows[i]['ADD_MONEY']
            let add_time = rows[i]['ADD_TIME']
            let addr = rows[i]['ADDR']
    //                console.log(parking_type)
            let btn_color = ['primary','success','danger','warning','info']
            if(parking_type == parkingType){
    //                    console.log(addr)
                let temp_html = '<button type="button" class="btn btn-' + randomItem(btn_color) + '" data-toggle="modal" data-target="#' + rows[i]['ID'] + '">' + parking_name + '</button><hr><div class="modal fade" id="' + rows[i]['ID'] + '" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true"><div  class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="staticBackdropLabel">' + parking_name + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div id="map_'+rows[i]['ID']+'" class="kakao_static_map" style="width:350px;height:250px;margin:auto;"></div><hr><B>운영시간 : </B>' + open_date + '<br><B>유/무료 : </B>' + money_info + '<br><B>기본 요금 : </B>' + basic_money + '<br><B>추가 시간 : </B>' + add_time + '분 마다 ' + add_money +'원<br><B>도로명 주소 : </B>' + addr + '</div><div class="modal-footer"><button type="button" class="btn  btn-success" data-dismiss="modal">닫기</button></div></div></div></div>'
               /* let temp_html = '<li>'+ parking_name + ' : '+ parking_type + '</li>'
                $('#parking_list1').append(temp_html);*/
                $('#'+listId).append(temp_html);
                
                staticMaps[i] = new naver.maps.Map('map_'+rows[i]['ID'], {
                    center: new naver.maps.LatLng(rows[i]['YCODE'], rows[i]['XCODE']),
                    zoom: 15
                });
                staticMapsMaker[i] = new naver.maps.Marker({
                    position: new naver.maps.LatLng(rows[i]['YCODE'], rows[i]['XCODE']),
                    map: staticMaps[i]
                });
            }
         }
      }
    })
     // 다만들고 나면 노상이랑 노외 출력하는거 지우기
}
    // 랜덤함수
    function randomItem(a){
       return a[Math.floor(Math.random() * a.length)];
    }


function favorite_parking(){
        let url = $("#post_url").val()
        let comment = $("#post_comment").val()

        $.ajax({
            type: "POST",
            url: "/post",
            data: {
                url_give : url,
                comment_give: comment
            },
            success: function(response){
                if(response['result'] == 'success'){
                    alert("포스팅 성공")
                    window.location.reload()
                } else{
                    alert("서버오류")
               }
            }
        })
}