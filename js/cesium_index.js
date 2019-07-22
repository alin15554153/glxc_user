
Cesium.BingMapsApi.defaultKey = 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh';
Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjg2NTFkMS05ZmZjLTQ5ZTQtYTAzMi0xMzJiNGI3ZjcxMDYiLCJpZCI6ODQ3OSwic'+
'2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjAyNzU2N30.uhpR8CmXUu9YVLVaAsODpzuTsQkm8TFTo3Pwv34CHLU';


console.log(arg);
var CesiumIndex = {
	lastPickedWfs:null,
	lastPickedTile:null,
	lastPickedTileOP:null
}
//网络影像
CesiumIndex.imageryProvider = new Cesium.BingMapsImageryProvider({
	url : 'https://dev.virtualearth.net',
	key : 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh',
	mapStyle : Cesium.BingMapsStyle.AERIAL
});

//初始化三维场景
CesiumIndex.viewer = new Cesium.Viewer('cesiumContainer',{
	// selectionIndicator:false,
	// infoBox :false,
	homeButton : false,//是否显示Home按钮
	timeline : false,//是否显示时间轴
	animation : false,//是否创建动画小器件，左下角仪表 
	geocoder : false,//是否显示geocoder小器件，右上角查询按钮
	scene3DOnly:true,
    fullscreenButton : false,//是否显示全屏按钮
    sceneModePicker : false,//是否显示3D/2D选择器 
	baseLayerPicker:false,
	imageryProvider:CesiumIndex.imageryProvider ,
	navigationHelpButton : false,//是否显示右上角的帮助按钮
});
CesiumIndex.viewer._cesiumWidget._creditContainer.style.display = "none";//去除版权信息
//自定义选择框
let svg = CesiumIndex.viewer._selectionIndicator.viewModel.selectionIndicatorElement.getElementsByTagName('svg:svg')[0];
svg.innerHTML = "<g transform=\"translate(80,80)\"><path data-bind=\"attr: { transform: _transform }\" d=\"M -34 -34 L -34 -11.25 L -30 -15.25 L -30 -30 L -15.25 -30 L -11.25 -34 L -34 -34 z M 11.25 -34 L 15.25 -30 L 30 -30 L 30 -15.25 L 34 -11.25 L 34 -34 L 11.25 -34 z M -34 11.25 L -34 34 L -11.25 34 L -15.25 30 L -30 30 L -30 15.25 L -34 11.25 z M 34 11.25 L 30 15.25 L 30 30 L 15.25 30 L 11.25 34 L 34 34 L 34 11.25 z\" transform=\"scale(1)\"></path></g>"//修改选择器外观
svg.style.fill = '#BCBCBC';//还可以修改样式


CesiumIndex.viewer._cesiumWidget._creditContainer.style.display = "none";//去除版权信息
CesiumIndex.viewer.infoBox.frame.sandbox.add('allow-scripts');//infobox支持脚本
CesiumIndex.viewer.infoBox.frame.sandbox.add('allow-modals');//infobox支持脚本

$(".cesium-viewer-animationContainer").hide();
$(".cesium-viewer-timelineContainer").hide();

CesiumIndex.viewer.scene.globe.depthTestAgainstTerrain = false;

CesiumIndex.cec =  new Cesium.CompositeEntityCollection();
CesiumIndex.entity_billboards_3dtile = new Cesium.EntityCollection(CesiumIndex.cec);
CesiumIndex.addLabel = function(entity_billboards,path,x,y,z){
		var en = CesiumIndex.viewer.entities.add({
		position : Cesium.Cartesian3.fromDegrees(x, y,z),
		billboard : {
			image : path,
			sizeInMeters : true,
			horizontalOrigin : Cesium.HorizontalOrigin.LEFT, // default
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
			scale : 2,
			width : 25, // default: undefined
            height : 12 // default: undefined
		}
	})
	entity_billboards.add(en)
}
CesiumIndex.addLabels = function(){
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/01_zt.png',119.4981610,32.3914035,39);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/02_jd.png' ,119.4992328 ,32.3922905 ,72);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/03_yk.png' ,119.5002153 ,32.3922585 ,38);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/03.png'    ,119.5000959 ,32.3912112 ,36);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/04_df.png' ,119.5015910 ,32.3911621 ,36);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/05_hf.png' ,119.5007898 ,32.3917247 ,22);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/06_sh.png' ,119.4992868 ,32.3903867 ,36);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/07_zh.png' ,119.5001304 ,32.3904353 ,35);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/08.png'    ,119.5015710 ,32.3918366 ,36);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/12.png' ,119.4983252 ,32.3904518 ,36);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/15.png' ,119.4990971 ,32.3915790 ,35);
	CesiumIndex.addLabel(CesiumIndex.entity_billboards_3dtile,'img/Label/16.png' ,119.4992704 ,32.3911398 ,34);
}

CesiumIndex.removeLabels = function(labels){
	for(var i = 0; i <labels._entities._array.length; i++){
		CesiumIndex.viewer.entities.remove(labels._entities._array[i]);
	}
}


//恢复到全图
CesiumIndex.wholeView = function(x,y,z){
	CesiumIndex.viewer.camera.setView({
        destination :  Cesium.Cartesian3.fromDegrees(x, y, z), // 设置位置
        orientation: {
            heading : Cesium.Math.toRadians(0.0), // 方向
            pitch : Cesium.Math.toRadians(-45.0),// 倾斜角度
            roll : 0
        }
    });
};
//wfs
CesiumIndex.wholeView(119.499698, 32.366185,3600);
//CesiumIndex.wholeView(119.499698, 32.385185,600);

//单击行场景跳转至相应区域
function flyToLocation(position) {
	CesiumIndex.viewer.camera.flyTo({
		destination : Cesium.Cartesian3.fromDegrees(position[0], position[1], position[2])
	});
};
//点击左下方某车辆或者人员目录树定位
CesiumIndex.flyto3DMark= function (lon,lat){
	var boundingSphere = new Cesium.BoundingSphere(
			Cesium.Cartesian3.fromDegrees(lon, lat, 5.6421522), 609.270221);
			CesiumIndex.viewer.camera.flyToBoundingSphere(boundingSphere);
};


//鼠标点击事件  左键
CesiumIndex.viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
	//选择了一个新的元素
	var pickedFeature = CesiumIndex.viewer.scene.pick(movement.position);
	console.log(pickedFeature);
	//什么都没有点中
	if(pickedFeature == undefined){
		console.log("没有点中模型");
		Tile_3D.unHeithTile3D();
		$('#lease_Tabledivid').hide();

		Wfs.unHeithWfs();
		Wfs.hideBuildByES ();
		Tile_OP.unheightStyle();
		CesiumIndex.lastPickedTile = null;
		CesiumIndex.lastPickedTileOP = null;
		CesiumIndex.viewer.selectedEntity =  null;
	}
	//wfs
	if(pickedFeature && pickedFeature.id instanceof  Cesium.Entity && pickedFeature.id.entityCollection.owner instanceof  Cesium.GeoJsonDataSource){
		console.log("点中wfs");
		Wfs.heightEntity(pickedFeature.id);
		Wfs.showInfo_Block(pickedFeature.id);
		CesiumIndex.lastPickedTileOP = null;
		CesiumIndex.lastPickedTile = null;
	}
	//gltf
	if(pickedFeature && pickedFeature.id instanceof  Cesium.Entity && pickedFeature.id.entityCollection.owner instanceof  Cesium.CustomDataSource){
		console.log("点中gltf");
	}
	//倾斜
	if(pickedFeature && pickedFeature.primitive._url == "http://localhost:8096/tile_glxc/Tile_P12.json"){
		console.log("点中倾斜");
		Wfs.unHeithWfs();
		CesiumIndex.lastPickedTileOP = pickedFeature;
		CesiumIndex.lastPickedTile = null;
		CesiumIndex.viewer.selectedEntity =  null;
		Tile_OP.unheightStyle();
	}
	//倾斜样式
	if(pickedFeature && pickedFeature instanceof Cesium.Cesium3DTileFeature && pickedFeature._content._tileset._url == "3dtile/op_out/tileset.json"){
		console.log("点中倾斜样式");
		Tile_OP.heightStyle();
		Tile_OP.showInfo();
		CesiumIndex.lastPickedTileOP = pickedFeature;
		CesiumIndex.lastPickedTile = null;
	}
	//3dtile
	if(pickedFeature && pickedFeature instanceof Cesium.Cesium3DTileFeature && pickedFeature._content._tileset._url == "http://localhost:8096/glxc_builder_tile/tileset.json")
	{
		console.log("点中3dtile");
		Tile_3D.unHeithTile3D();
		Tile_3D.showLeaseDiv('11号楼');
		Tile_3D.heightTile3D(pickedFeature);
		//Tile_3D.showOneBuild();
		CesiumIndex.viewer.selectedEntity = pickedFeature;
		//CesiumIndex.showInfo(pickedFeature.getProperty("name"));
		CesiumIndex.lastPickedTileOP = null;
		CesiumIndex.lastPickedTile = pickedFeature;
	}
}, 
Cesium.ScreenSpaceEventType.LEFT_CLICK
); 


//鼠标点击事件  左键
CesiumIndex.viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
	//选择了一个新的元素
	var pickedFeature = CesiumIndex.viewer.scene.pick(movement.position);
		//倾斜样式
		if(pickedFeature && pickedFeature instanceof Cesium.Cesium3DTileFeature && pickedFeature._content._tileset._url == "3dtile/op_out/tileset.json"){
			console.log("双击倾斜样式");
			window.open("oneBuild.html");
		}
			//3dtile
	if(pickedFeature && pickedFeature instanceof Cesium.Cesium3DTileFeature && pickedFeature._content._tileset._url == "http://localhost:8096/glxc_builder_tile/tileset.json")
	{
		console.log("点中3dtile");
		window.open("oneBuild.html");
	}
}, 
Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
); 



