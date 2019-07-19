
Cesium.BingMapsApi.defaultKey = 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh';
Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjg2NTFkMS05ZmZjLTQ5ZTQtYTAzMi0xMzJiNGI3ZjcxMDYiLCJpZCI6ODQ3OSwic'+
'2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjAyNzU2N30.uhpR8CmXUu9YVLVaAsODpzuTsQkm8TFTo3Pwv34CHLU';

var DataTest = {
	lastPickedTileOP:null
}

//初始化三维场景
DataTest.viewer = new Cesium.Viewer('cesiumContainer',{
	homeButton : false,//是否显示Home按钮
	timeline : false,//是否显示时间轴
	animation : false,//是否创建动画小器件，左下角仪表 
	geocoder : false,//是否显示geocoder小器件，右上角查询按钮
	scene3DOnly:true,
    fullscreenButton : false,//是否显示全屏按钮
    sceneModePicker : false,//是否显示3D/2D选择器 
	baseLayerPicker:false,
	navigationHelpButton : false,//是否显示右上角的帮助按钮
	
});

DataTest.viewer._cesiumWidget._creditContainer.style.display = "none";//去除版权信息
DataTest.viewer.infoBox.frame.sandbox.add('allow-scripts');//infobox支持脚本
DataTest.viewer.infoBox.frame.sandbox.add('allow-modals');//infobox支持脚本

$(".cesium-viewer-animationContainer").hide();
$(".cesium-viewer-timelineContainer").hide();


//目录
DataTest.data = [
    {id:1,pId:0,name:'viewer',open:true,checked:true},
        {id:21,pId:1,name:'DS_Gltf',open:true,checked:true},
            {id:21001,pId:21,name:'一层',checked:true,path:"gltf/B01.gltf"},
            {id:21002,pId:21,name:'二层',checked:true,path:"gltf/B02.gltf"},
            {id:21003,pId:21,name:'三层',checked:true,path:"gltf/B03.gltf"},
            {id:21004,pId:21,name:'四层',checked:true,path:"gltf/B04.gltf"},
            {id:21005,pId:21,name:'五层',checked:true,path:"gltf/B05.gltf"},
            {id:21006,pId:21,name:'楼顶',checked:true,path:"gltf/B06.gltf"},
        {id:22,pId:1,name:'3DTile',open:true,checked:true},
            {id:22001,pId:22,name:'倾斜',checked:true,path:"gltf/B06.gltf"},
        {id:23,pId:1,name:'3DTileStyle',open:true,checked:true},
            {id:23001,pId:23,name:'倾斜样式',checked:true,path:"gltf/B06.gltf"},
        {id:24,pId:1,name:'Billboard',open:true,checked:true},
            {id:24001,pId:24,name:'img/Label/01_zt.png',checked:true,path:"img/Label/01_zt.png"},
        {id:25,pId:1,name:'Label',open:true,checked:true},
            {id:25001,pId:25,name:'3楼A:未租赁',checked:true,path:"3楼A:未租赁"},
            {id:25002,pId:25,name:'3楼B:江苏智途',checked:true,path:"3楼B:江苏智途科技股份有限"},
            {id:25003,pId:25,name:'3楼C:江苏智途',checked:true,path:"3楼C:江苏智途科技股份有限"},
            {id:25004,pId:25,name:'3楼D:京东金科',checked:true,path:"3楼D:江苏京东金科信息科技有限公司"},
            {id:25005,pId:25,name:'3楼E:宏创电子商务',checked:true,path:"3楼E:扬州宏创电子商务有限公司"},            
        {id:26,pId:1,name:'GeoJson',open:true,checked:true},
            {id:26001,pId:26,name:'Cad2',checked:true,path:"Cad2"}, 
        {id:27,pId:1,name:'KML',open:true,checked:true},

];
//显示buidl的Tree
DataTest.showTree_Build = function (data){
	//构建目录树
	setTree_class();
	function setTree_class() {
		var setting = {
			check : {
				enable : true
			},
			data : {
				simpleData : {
					enable : true,
				}
			},
			callback : {
				onCheck : zTreeOnClick_class,
			},
			view : {
				showIcon : true
			}
		};
		setting.check.chkboxType = { "Y" : "s", "N" : "s" };
		//Y 属性定义 checkbox 被勾选后的情况； 
		//N 属性定义 checkbox 取消勾选后的情况； 
		//"p" 表示操作会影响父级节点； 
		//"s" 表示操作会影响子级节点。
		treeObjList = $.fn.zTree.init($("#buiTree"), setting, data);
        $('#builderWFSTree').css('display','block');
	}
	function zTreeOnClick_class(event, treeId, treeNode) {
        var entity = DataTest.viewer.entities.getById(treeNode.path)
        if(treeNode.checked){
            entity.show = true;
        }else{
            entity.show = false;
            
        }
        console.log(treeNode);
	}
}
DataTest.showTree_Build(DataTest.data);






DataTest.ds_Czml = new Cesium.CzmlDataSource('ds_Czml');
DataTest.ds_Kml = new Cesium.KmlDataSource({
    camera : DataTest.viewer.scene.camera,
    canvas : DataTest.viewer.scene.canvas
})

//添加Gltf
DataTest.ds_Gltf = new Cesium.CustomDataSource('ds_Gltf');
DataTest.entities_gltf = new Cesium.EntityCollection(DataTest.ds_Gltf);

DataTest.add_gltf = function(url, height) {
    var position = Cesium.Cartesian3.fromDegrees(119.4996955, 32.392185, height);
    var heading = Cesium.Math.toRadians(90);    var pitch = 0;    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        var entity = new Cesium.Entity({
        name : url,
        id:url,
        position : position,
        orientation : orientation,
        model : {   
            uri : url,
            minimumPixelSize : 128,
            maximumScale : 1
        }
    });
    DataTest.entities_gltf.add(entity);
}
DataTest.add_gltf('gltf/B01.gltf', 0);
DataTest.add_gltf('gltf/B02.gltf', 0);
DataTest.add_gltf('gltf/B03.gltf', 0);
// DataTest.add_gltf('gltf/B04.gltf', 0);
// DataTest.add_gltf('gltf/B05.gltf', 0);
// DataTest.add_gltf('gltf/B06.gltf', 0);
//1.直接加entytiy
//DataTest.viewer.entities.add(DataTest.entitiy_gltf)
//2.先把entitiy加到ds 再在ds 
// DataTest.ds_Gltf.entities.add(DataTest.entitiy_gltf);
// DataTest.viewer.dataSources.add(DataTest.ds_Gltf);
//3.先把entitiy加到EntityCollection 再把EntityCollection指定给ds
DataTest.ds_Gltf._entityCollection = DataTest.entities_gltf;
DataTest.viewer.dataSources.add(DataTest.ds_Gltf);
DataTest.entities_gltf.values[2].model.color = new Cesium.Color.fromBytes(255,0,0,200)


//添加Label
DataTest.ds_Lable = new Cesium.CustomDataSource('ds_Lable');
DataTest.entities_Lable = new Cesium.EntityCollection(DataTest.ds_Lable);

DataTest.add_Label = function(text,x,y,z){
    var entity = new Cesium.Entity({
		position : Cesium.Cartesian3.fromDegrees(x, y,z),
        label : {
            text : text,
            scale:3,
            showBackground :true,
            backgroundColor :  new Cesium.Color(0.165, 0.165, 0.165, 1),
            font : '20px sans-serif',
            scaleByDistance : new Cesium.NearFarScalar(0,1, 500, 0.1),
            disableDepthTestDistance :11
        }
	})
	DataTest.entities_Lable.add(entity)
}

DataTest.add_Label('3楼A:未租赁',119.4985,32.39175,22);
DataTest.add_Label('3楼B:江苏智途科技股份有限',119.4980,32.39175,22);
DataTest.add_Label('3楼C:江苏智途科技股份有限',119.4980,32.3914,22);
DataTest.add_Label('3楼D:江苏京东金科信息科技有限公司',119.4980,32.39108,22);
DataTest.add_Label('3楼E:扬州宏创电子商务有限公司',119.4985,32.39108,22);

DataTest.ds_Lable._entityCollection = DataTest.entities_Lable;
DataTest.viewer.dataSources.add(DataTest.ds_Lable);

DataTest.entities_Lable.values[2].label.fillColor = new Cesium.Color.fromBytes(255,0,0,255)
DataTest.entities_Lable.values[2].label.backgroundColor = new Cesium.Color.fromBytes(0,0,255,100)

DataTest.ds_Billboard = new Cesium.CustomDataSource('ds_Billboard');
DataTest.entities_Billboard = new Cesium.EntityCollection(DataTest.ds_Billboard);
DataTest.add_Billboard = function(path,x,y,z){
    var entity = new Cesium.Entity({
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
    DataTest.entities_Billboard.add(entity)
}
DataTest.add_Billboard('img/Label/01_zt.png',119.4981610,32.3914035,39);

DataTest.ds_Billboard._entityCollection = DataTest.entities_Billboard;
DataTest.viewer.dataSources.add(DataTest.ds_Billboard);
DataTest.entities_Billboard.values[0].billboard.color = new Cesium.Color.fromBytes(0,0,255,255)

DataTest.ds_GeoJson = new Cesium.GeoJsonDataSource('ds_GeoJson')
var promise = DataTest.ds_GeoJson.load('http://localhost:8081/geoserver/lgl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lgl%3Aglxc_block_84&maxFeatures=50&outputFormat=application%2Fjson',{
    stroke: Cesium.Color.HOTPINK,
    fill: new Cesium.Color.fromBytes(111,111,111,255),
    strokeWidth: 3,
    markerSymbol: '?'
})
promise.then(
    function(dataSource){
        DataTest.ds_GeoJson = dataSource;
        DataTest.viewer.dataSources.add(DataTest.ds_GeoJson);
    }
)



DataTest.C3DTileset =new Cesium.Cesium3DTileset({
    url: '3dtile/tile_glxc/Tile_P12.json',
    maximumScreenSpaceError: 2,
    maximumNumberOfLoadedTiles: 100
})
// DataTest.viewer.scene.primitives.add(DataTest.C3DTileset);

DataTest.classificationTileset = new Cesium.Cesium3DTileset({
    url:'3dtile/op_out/tileset.json',
    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
});
DataTest.classificationTileset.style = new Cesium.Cesium3DTileStyle({
    color: 'rgba(255, 0, 0, 1)'
});
DataTest.viewer.scene.primitives.add(DataTest.classificationTileset);


DataTest.wholeView = function(){
	DataTest.viewer.camera.setView({
        destination :  Cesium.Cartesian3.fromDegrees(119.4981610,32.3894035, 200), // 设置位置
        orientation: {
            heading : Cesium.Math.toRadians(0.0), // 方向
            pitch : Cesium.Math.toRadians(-45.0),// 倾斜角度
            roll : 0
        }
    });
};

DataTest.wholeView();


DataTest.showInfo = function(entity){
    var text  = entity.primitive._text
    var index = null;
    switch(text) {
        case '3楼B:江苏智途科技股份有限':
            index = 0;
           break;
        case '3楼C:江苏智途科技股份有限':
            index = 0;
           break;
        case '3楼D:江苏京东金科信息科技有限公司':
            index = 4;
            break;
        case '3楼E:扬州宏创电子商务有限公司':
            index = 2;
            break;
            
        default:
           
   } 
    var content='<table class="cesium-infoBox-defaultTable"><tbody>'
    + '<tr><th>企业名称</th><td>'
    + "aaaa"
    + '</td></tr>'
    + '<tr><th>合同面积（平米）</th><td >'
    + "aaaa"
    + '</td></tr>'
    + '<tr><th>租赁期限起</th><td >'
    + "aaaa"
    + '</td></tr>'
    + '<tr><th>租赁期限止</th><td >'
    + "aaaa"
    + '</td></tr>'


    + '</tbody></table>';
    var selectedEntity = new Cesium.Entity();
    selectedEntity.name = "11号楼";
    selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
    DataTest.viewer.selectedEntity = selectedEntity;
    selectedEntity.description = content;
}


//鼠标点击事件  左键
DataTest.viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
	//选择了一个新的元素
    var pickedFeature = DataTest.viewer.scene.pick(movement.position);
    console.log(DataTest);
	console.log(pickedFeature);
	//什么都没有点中
	if(pickedFeature == undefined){
		console.log("没有点中模型");
        DataTest.viewer.selectedEntity =  null;
	}
    //Lable
    if(pickedFeature && pickedFeature.primitive instanceof Cesium.Label ){
        console.log("点中LAB");
        DataTest.showInfo(pickedFeature);
    }

    //Wfs
    if(pickedFeature && pickedFeature.id instanceof Cesium.Entity ){
        if(pickedFeature.id.polygon  instanceof Cesium.PolygonGraphics){
            console.log("点中WFS");
            DataTest.showInfo(pickedFeature);
        }
    }

    //Billboard
    if(pickedFeature && pickedFeature.primitive instanceof Cesium.Billboard){
        console.log("点中Billboard");
        DataTest.showInfo(pickedFeature);
    }
    //Gltf
    if(pickedFeature && pickedFeature.primitive.gltf instanceof Object ){
        console.log("点中Gltf");
        DataTest.showInfo(pickedFeature);
    }

    //Gltf
    if(pickedFeature && pickedFeature.primitive instanceof Cesium.Cesium3DTileset){
        if( pickedFeature.content instanceof Cesium.Batched3DModel3DTileContent){
            console.log("点中倾斜");
            DataTest.showInfo(pickedFeature);
        }
    }
    //Style
    if(pickedFeature && pickedFeature instanceof Cesium.Cesium3DTileFeature){
        console.log("点中Style");
        DataTest.showInfo(pickedFeature); 
    }
}, 
Cesium.ScreenSpaceEventType.LEFT_CLICK
); 

setTimeout(function(){
    DataTest.ds_GeoJson.entities.values[1].polygon.height = 3;
    DataTest.ds_GeoJson.entities.values[1].polygon.material = new Cesium.Color.fromBytes(128,255,252,125);
    DataTest.ds_GeoJson.entities.values[1].polygon.outline = true;
    
    DataTest.ds_GeoJson.entities.values[1].polygon.outlineColor = new Cesium.Color.fromBytes(0,0,255,255);
    
    DataTest.ds_GeoJson.entities.values[1].polygon.extrudedHeight = 10;
    // DataTest.ds_GeoJson.entities.values[1].polygon.fill = new Cesium.Color.fromBytes(225,0,255,255);
    DataTest.ds_GeoJson.entities.values[1].polygon.outlineWidth = 10;
},5000)