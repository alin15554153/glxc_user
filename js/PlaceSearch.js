

function autoInput(t){
    var dom_search_results_div = document.getElementById("search_results_div");

    if(!t){
        return;
    }
    var keywords = t.value;
    if(t.value==""){
        dom_search_results_div.innerHTML="";
        dom_search_results_div.style.display="none";
        return;
    }
    AMap.plugin('AMap.PlaceSearch', function(){
        var autoOptions = {city: '扬州'};
        var placeSearch = new AMap.PlaceSearch(autoOptions);
        placeSearch.search(keywords, function(status, result) {
            console.log("status");
            console.log(status);
            if(status=="complete"){    // no_data
                if(result.info=="OK"){
                    if(result.poiList&&result.poiList.count>0){
                        var poiList=result.poiList.pois;
                        console.log("result.poiList.pois: ");
                        console.log(poiList);
                            let poiListCount=result.poiList.count;
                            var htmlTmp="";
                            for(var i=0;i<poiList.length;i++){     
                            // 查询出的是分页结果
                                var htmlTmp1 ="<div class='map_result_item' data-longitude="+poiList[i].location.lng+" data-latitude="+poiList[i].location.lat +" onclick='setmapToBylngAndLat(this)'>" +poiList[i].name+
                                    "<span class='map_result_item_span'> "+poiList[i].address+"</span>\n" +
                                    "</div>";
                                htmlTmp=htmlTmp+htmlTmp1;
                                // 查询结果对象存储，用于点击的3D定位

                            }
                            dom_search_results_div.innerHTML=htmlTmp;
                    }else {
                        dom_search_results_div.innerHTML="无搜索结果";
                    }
                }else {
                    dom_search_results_div.innerHTML="无搜索结果";
                }
            }else{
                dom_search_results_div.innerHTML="无搜索结果";
            }
            dom_search_results_div.style.display="block";
        })
    })
}
var loactionEntity;
//点击事件 选中一个地点，3D跳转到
function setmapToBylngAndLat(t) {
    var dom_search_results_div = document.getElementById("search_results_div");

    var longitude =t.getAttribute("data-longitude");
    var latitude =t.getAttribute("data-latitude");
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
    var pos = Cesium.Cartesian3.fromDegrees(longitude, latitude);
    if(loactionEntity){
        CesiumIndex.viewer.entities.remove(loactionEntity);    //viewer 3D cesium实体
    }
    loactionEntity = new Cesium.Entity({
        id : 'loactionEntity',
        position : pos,
        point : {
            pixelSize : 10,
            color : Cesium.Color.RED,
            outlineColor : Cesium.Color.WHITE,
            outlineWidth : 1
        }
    });
    CesiumIndex.viewer.entities.add(loactionEntity);
    CesiumIndex.viewer.flyTo(loactionEntity, {
        offset : {
            heading : Cesium.Math.toRadians(0.0),
            pitch : Cesium.Math.toRadians(-90),
            range : 10000
        }
    });
    
    dom_search_results_div.style.display="none";
}
