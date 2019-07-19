
// Cesium.BingMapsApi.defaultKey = 'AvzM4FgDkpuZwkwP9DPDUwq15NUTJxHNyyUHGSXiA9JwAtAinnlPS31PvwB3hcWh';
// Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjg2NTFkMS05ZmZjLTQ5ZTQtYTAzMi0xMzJiNGI3ZjcxMDYiLCJpZCI6ODQ3OSwic'+
// '2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MjAyNzU2N30.uhpR8CmXUu9YVLVaAsODpzuTsQkm8TFTo3Pwv34CHLU';

var OneBuild = {
	lastPickedTileOP:null
}

//初始化三维场景
OneBuild.viewer = new Cesium.Viewer('cesiumContainer',{
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

OneBuild.viewer._cesiumWidget._creditContainer.style.display = "none";//去除版权信息
OneBuild.viewer.infoBox.frame.sandbox.add('allow-scripts');//infobox支持脚本
OneBuild.viewer.infoBox.frame.sandbox.add('allow-modals');//infobox支持脚本

$(".cesium-viewer-animationContainer").hide();
$(".cesium-viewer-timelineContainer").hide();

OneBuild.viewer.scene.globe.depthTestAgainstTerrain = false;

OneBuild.entity_gltf = new Cesium.EntityCollection();

OneBuild.createModel = function(url, height) {
    var position = Cesium.Cartesian3.fromDegrees(119.4996955, 32.392185, height);
    var heading = Cesium.Math.toRadians(90);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = OneBuild.viewer.entities.add({
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
    OneBuild.entity_gltf.add(entity);
}

OneBuild.createModel('gltf/B01.gltf', 0);
OneBuild.createModel('gltf/B02.gltf', 0);
OneBuild.createModel('gltf/B03.gltf', 0);
OneBuild.createModel('gltf/B04.gltf', 0);
OneBuild.createModel('gltf/B05.gltf', 0);
OneBuild.createModel('gltf/B06.gltf', 0);
//恢复到全图

OneBuild.data = [
    {id:1,pId:0,name:'11号楼',open:true,checked:true},
    {id:2,pId:1,name:'一层',checked:true,path:"gltf/B01.gltf"},
    {id:3,pId:1,name:'二层',checked:true,path:"gltf/B02.gltf"},
    {id:4,pId:1,name:'三层',checked:true,path:"gltf/B03.gltf"},
    {id:5,pId:1,name:'四层',checked:true,path:"gltf/B04.gltf"},
    {id:6,pId:1,name:'五层',checked:true,path:"gltf/B05.gltf"},
    {id:7,pId:1,name:'楼顶',checked:true,path:"gltf/B06.gltf"},
];
//显示buidl的Tree
OneBuild.showTree_Build = function (data){
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
        var entity = OneBuild.viewer.entities.getById(treeNode.path)
        if(treeNode.checked){
            entity.show = true;
        }else{
            entity.show = false;
            
        }
        console.log(treeNode);
	}
}
OneBuild.showTree_Build(OneBuild.data);


OneBuild.cec =  new Cesium.CompositeEntityCollection();
OneBuild.entity_Label = new Cesium.EntityCollection(OneBuild.cec);
OneBuild.addLabel = function(text,x,y,z){
		var en = OneBuild.viewer.entities.add({
		position : Cesium.Cartesian3.fromDegrees(x, y,z),
        label : {
            text : text,
            scale:2,
            showBackground :true,
            backgroundColor :  new Cesium.Color(0.165, 0.165, 0.165, 1),
            font : '20px sans-serif',
            scaleByDistance : new Cesium.NearFarScalar(0,1, 500, 0.1),
            disableDepthTestDistance :11
        }
	})
	OneBuild.entity_Label.add(en)
}
OneBuild.addLabels = function(){
    // OneBuild.addLabel('5A:中科芯源（扬州）光电科技有限公司',119.4985,32.39175,32);
    // OneBuild.addLabel('5B:江苏智途科技股份有限',119.4980,32.3917,32);
    // OneBuild.addLabel('5C:江苏云擎信息科技有限公司',119.4980,32.3914,32);
    // OneBuild.addLabel('5D:江苏京东金科信息科技有限公司',119.4980,32.3911,32);
    // OneBuild.addLabel('5E:中国人寿保险股份有限公司扬州分公司',119.4985,32.3911,32);
    setTimeout(function(){
        OneBuild.addLabel('3楼A:未租赁',119.4985,32.39175,22);
        OneBuild.addLabel('3楼B:江苏智途科技股份有限',119.4980,32.39175,22);
        OneBuild.addLabel('3楼C:江苏智途科技股份有限',119.4980,32.3914,22);
        OneBuild.addLabel('3楼D:江苏京东金科信息科技有限公司',119.4980,32.39108,22);
        OneBuild.addLabel('3楼E:扬州宏创电子商务有限公司',119.4985,32.39108,22);
    },5000)

}
OneBuild.addLabels()


OneBuild.wholeView = function(){
	OneBuild.viewer.camera.setView({
        destination :  Cesium.Cartesian3.fromDegrees(119.4981610,32.3894035, 200), // 设置位置
        orientation: {
            heading : Cesium.Math.toRadians(0.0), // 方向
            pitch : Cesium.Math.toRadians(-45.0),// 倾斜角度
            roll : 0
        }
    });
};

OneBuild.wholeView();
Tile_3D.showLeaseDiv();


OneBuild.showInfo_room = function(entity){
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
    console.log(Tile_3D.data_11)
    var content='<table class="cesium-infoBox-defaultTable"><tbody>'
    + '<tr><th>企业名称</th><td>'
    + Tile_3D.data_11.datas[index].enterpriseName
    + '</td></tr>'
    + '<tr><th>合同面积（平米）</th><td >'
    + Tile_3D.data_11.datas[index].contractArea
    + '</td></tr>'
    + '<tr><th>租赁期限起</th><td >'
    + Tile_3D.data_11.datas[index].leaseStartTime
    + '</td></tr>'
    + '<tr><th>租赁期限止</th><td >'
    + Tile_3D.data_11.datas[index].leaseEndTime
    + '</td></tr>'
    + '<tr><th>法人</th><td >'
    + Tile_3D.data_11.datas[index].legalPerson
    + '</td></tr>'
    + '<tr><th>法人联系方式</th><td >'
    + Tile_3D.data_11.datas[index].legalContactWay
    + '</td></tr>'
    + '<tr><th>注册资本（万元）</th><td >'
    + Tile_3D.data_11.datas[index].registerCapital
    + '</td></tr>'
    + '<tr><th>负责人 </th><td >'
    + Tile_3D.data_11.datas[index].frontMan
    + '</td></tr>'
    + '<tr><th>负责人联系方式</th><td >'
    + Tile_3D.data_11.datas[index].frontManContactWay
    + '</td></tr>'
    + '<tr><th>行业分类</th><td >'
    + Tile_3D.data_11.datas[index].industryClassify
    + '</td></tr>'
    + '<tr><th>经营范围</th><td >'
    + Tile_3D.data_11.datas[index].businessScope
    + '</td></tr>'
    + '<tr><th>人数</th><td >'
    + Tile_3D.data_11.datas[index].numberOfPeople
    + '</td></tr>'

    + '</tbody></table>';
    var selectedEntity = new Cesium.Entity();
    selectedEntity.name = "11号楼";
    selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
    OneBuild.viewer.selectedEntity = selectedEntity;
    selectedEntity.description = content;
}


//鼠标点击事件  左键
OneBuild.viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
	//选择了一个新的元素
	var pickedFeature = OneBuild.viewer.scene.pick(movement.position);
	console.log(pickedFeature);
	//什么都没有点中
	if(pickedFeature == undefined){
		console.log("没有点中模型");
        OneBuild.lastPickedTileOP = null;
        OneBuild.viewer.selectedEntity =  null;
	}

    if(pickedFeature && pickedFeature.primitive instanceof Cesium.Label ){
        console.log("点中LAB");
        OneBuild.showInfo_room(pickedFeature);
		OneBuild.lastPickedTileOP = pickedFeature;
		
	}
	//3dtile

}, 
Cesium.ScreenSpaceEventType.LEFT_CLICK
); 