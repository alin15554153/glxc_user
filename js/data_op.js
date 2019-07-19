

var Tile_OP = {
	url_op_tile:'http://localhost:8096/tile_glxc/Tile_P12.json',
	C3DTileset_op:null,
	box:null
}

Tile_OP.showMap_OP= function (){
	Tile_OP.C3DTileset_op_yz =new Cesium.Cesium3DTileset({
		url: Tile_OP.url_op_tile,
		maximumScreenSpaceError: 2,
		maximumNumberOfLoadedTiles: 100
	})
	CesiumIndex.viewer.scene.primitives.add(Tile_OP.C3DTileset_op_yz);
	Tile_OP.showOpStyle ();
}
Tile_OP.hideMap_OP= function (){
	CesiumIndex.viewer.scene.primitives.remove(Tile_OP.C3DTileset_op_yz);
	Tile_OP.hideOpStyle ();
}

Tile_OP.showOpStyle = function(){
	Tile_OP.classificationTileset = new Cesium.Cesium3DTileset({
		url:'3dtile/op_out/tileset.json',
		classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
	});
	Tile_OP.classificationTileset.style = new Cesium.Cesium3DTileStyle({
		color: 'rgba(255, 0, 0, 0.005)'
	});
	CesiumIndex.viewer.scene.primitives.add(Tile_OP.classificationTileset);
}
Tile_OP.hideOpStyle = function(){
	CesiumIndex.viewer.scene.primitives.remove(Tile_OP.classificationTileset);
}
Tile_OP.heightStyle = function(){
	Tile_OP.classificationTileset.style = new Cesium.Cesium3DTileStyle({
		color: 'rgba(255, 0, 0, 0.5)'
	});
}

Tile_OP.unheightStyle = function(){
	Tile_OP.classificationTileset.style = new Cesium.Cesium3DTileStyle({
		color: 'rgba(255, 0, 0, 0.005)'
	});
}
Tile_OP.showInfo =function(){
	var content='<table class="cesium-infoBox-defaultTable"><tbody>'
    + '<tr><th>地块</th><td>'
    + "基地二期"
    + '</td></tr>'
    + '<tr><th>楼宇编号</th><td >'
    + '11号楼'
    + '</td></tr>'
    + '<tr><th>备注（房产证幢号）</th><td >'
    + '7'
    + '</td></tr>'
    + '<tr><th>业态</th><td >'
    + '办公'
    + '</td></tr>'
    + '<tr><th>负责人</th><td >'
    + "李某某"
    + '</td></tr>'
    + '<tr><th>联系方式</th><td >'
    + '15811300000'
    + '</td></tr>'
    + '<tr><th>出租率</th><td >'
    + '85%'
    + '</td></tr>'
    + '</tbody></table>';
    var selectedEntity = new Cesium.Entity();
    selectedEntity.name = "11号楼";
    selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
    CesiumIndex.viewer.selectedEntity = selectedEntity;
    selectedEntity.description = content;
}
Tile_OP.showGltf = function(url, height) {
    var position = Cesium.Cartesian3.fromDegrees(119.4996555, 32.392155, height);
    var heading = Cesium.Math.toRadians(90);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    Tile_OP.box = CesiumIndex.viewer.entities.add({
        name : url,
        id:url,
        position : position,
        orientation : orientation,
        model : {
            uri : url,
            minimumPixelSize : 128,
			maximumScale : 1,
			color:new Cesium.Color.fromBytes(255,255,252,100)
        }
    });
}
Tile_OP.hideGltf = function() {
	CesiumIndex.viewer.entities.remove(Tile_OP.box);
}
Tile_OP.heightGltf = function(pickedFeature) {
	pickedFeature.primitive.color = new Cesium.Color(1, 0, 0, 1);
	pickedFeature.id.color = new Cesium.Color(1, 0, 0, 1);
	CesiumIndex.lastPickedFeature = pickedFeature;
}

