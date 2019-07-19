var Wms = {
    url_Wms:'http://localhost:8081/geoserver/lgl/wms',
    provider:null,

}
//加载wfs
Wms.showWms = function(){
    provider = new Cesium.WebMapServiceImageryProvider({ 
        url: 'http://localhost:8081/geoserver/lgl/wms', 
        layers: 'lgl:lgl_ybh', 
        
        parameters: { 
        service : 'WMS', 
            format: 'image/png', 
            srs: 'EPSG:4326',
            transparent: true, 
        } 
    }); 
    CesiumIndex.viewer.imageryLayers.addImageryProvider(provider); 
    flyto3DMark(119.087,32.331);
}
Wms.hideWms = function(){
    CesiumIndex.viewer.imageryLayers.remove(provider,true);
}