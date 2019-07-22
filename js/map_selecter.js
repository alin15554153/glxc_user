var url = decodeURI(window.location.href)
var argsIndex = url .split("?page=");
var arg = argsIndex[1];
(function ($) {
    function init() {
        var toolbar = '<ul id="selecterToolbar" class="map-type-toolbar translucence">' +
            '<li class="map-type-btn map-2D"><input type="checkbox" class="map-3D-chechbox" /><span>地图</span></li>' +
            // checked="true"
            '<li class="map-type-btn map-WFS"><input type="checkbox"  id = "id-map-WFS-chechbox"class="map-3D-chechbox" /><span>WFS</span></li>' +
            '<li class="map-type-btn map-3D"><input type="checkbox" id = "id-map-3D-chechbox" class="map-3D-chechbox" /><span>三维</span></li>' +
            '<li class="map-type-btn map-OP"><input type="checkbox" id = "id-map-OP-chechbox" class="map-3D-chechbox" /><span>倾斜</span></li>' +
            '</ul>';
        $(toolbar).appendTo("body");
    }
    
    $(function () {
        init();
        if(arg == 5){
            Wfs.showBlock();
            CesiumIndex.wholeView(119.499698, 32.366185,3600);
            $('#echarts').css({height:'300px'});
            $('.arrow')	.find('i').removeClass('arrow_fold').addClass('arrow_fold');
            $('#id-map-WFS-chechbox').attr("checked", true);
            
        }
        if(arg == 1){
            Tile_OP.showMap_OP();
            CesiumIndex.addLabels();
            //op
            CesiumIndex.wholeView(119.499698, 32.382185,1200);
            $('#id-map-OP-chechbox').attr("checked", true);
        }

        //二维
        $(".map-2D").bind("click", function (e) {
            
            if( $("#id-map-WMS-chechbox").prop('checked')){
               $("#id-map-WMS-chechbox").prop("checked", false);
               Wms.hideWms();
           }else{
               $("#id-map-WMS-chechbox").prop("checked", true);  
             
              
               //Wms.showWms();
           }
       });
       
        //影像
        $(".map-WFS").bind("click", function (e) {
            if( $("#id-map-WFS-chechbox").prop('checked')){
                $("#id-map-WFS-chechbox").prop("checked", false);
                Wfs.hideBlockByDS();
            }else{
                $("#id-map-WFS-chechbox").prop("checked", true);  
                //wfs
                CesiumIndex.wholeView(119.499698, 32.366185,3600);
                Wfs.showBlock();

            }
        });

        //三维
        $(".map-3D").bind("click", function (e) {
            if( $("#id-map-3D-chechbox").prop('checked')){

                $("#id-map-3D-chechbox").prop("checked", false);
                Tile_3D.hideTile3D_Build();
                Tile_3D.hideTile3D_Block();
                CesiumIndex.removeLabels(CesiumIndex.entity_billboards_3dtile);
                $('#lease_Tabledivid').hide();
            }else{

                $("#id-map-3D-chechbox").prop("checked", true);  
                Tile_3D.showTile3D_Build();
                Tile_3D.showTile3D_Block();
                CesiumIndex.addLabels();
            }
        });
        //倾斜
        $(".map-OP").bind("click", function (e) {
            if( $("#id-map-OP-chechbox").prop('checked')){

                $("#id-map-OP-chechbox").prop("checked", false);
                Tile_OP.hideMap_OP();
                CesiumIndex.removeLabels(CesiumIndex.entity_billboards_3dtile);
            }else{

                $("#id-map-OP-chechbox").prop("checked", true);  
                Tile_OP.showMap_OP();
                CesiumIndex.addLabels();
                //op
                CesiumIndex.wholeView(119.499698, 32.382185,1200);
            }
        });
    })

})(jQuery);