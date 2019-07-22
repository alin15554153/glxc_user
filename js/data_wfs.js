var Wfs = {
	url_Build_Wfs:'http://localhost:8081/geoserver/lgl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lgl%3Aglxc_builder_84&outputFormat=application%2Fjson',
	url_Block_Wfs: 'http://localhost:8081/geoserver/lgl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lgl%3Aglxc_block_84&outputFormat=application%2Fjson',
	//url_Cad_Wfs :'http://localhost:8081/geoserver/lgl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lgl%3Aglxc_cad_84&outputFormat=application%2Fjson',
	url_Cad_Wfs :'http://localhost:8081/geoserver/lgl/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=lgl%3Aglxc_cad_84&outputFormat=application%2Fjson',
	dataSource_Wfc_Build:null,
	dataSource_Wfc_Block:null,
	entities_Block:[],
}

//加载全部Buildwfs
Wfs.showBuild = function(){
	var data_wfs= [];
	$.ajax({
		url:this.url_Build_Wfs,
		cache: false,
		async: true,
		success: function(data) {
			var promise = Cesium.GeoJsonDataSource.load(data);
			promise.then(
				function(dataSource) {
					this.dataSource_Wfc_Build = dataSource;
					CesiumIndex.viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					
					for (var i = 0; i < entities.length; i++) {
						var entity = entities[i];
						//entity.polyline=null;
						entity.polygon.material = Cesium.Color.BURLYWOOD;
						//viewer.entities.add(entity);
						var k= {};
						//k.pos = entity.position;
						k.id = entity._properties.id._value;
						k.eId = entity.id;
						k.pId = entity._properties.pid._value;
						k.blockname = entity._properties.blockname._value;
						k.ramark = entity._properties.ramark._value;
						k.tpye = entity._properties.tpye._value;
						k.buildernum = entity._properties.buildernum._value;
						data_wfs.push(k);
					}
					Wfs.showTable_Build(data_wfs);
					//this.showTree_Build(data_wfs);
				}
			)
		},
		error: function(data) {
			 console.log("error");
		}
	});

}
//根据地块属性表打开对应的Build
Wfs.showBuildByBlockName = function (name){
	var data_wfs= [];
	$.ajax({
		url:this.url_Build_Wfs,
		cache: false,
		async: true,
		success: function(data) {
			var promise = Cesium.GeoJsonDataSource.load(data);
			promise.then(
				function(dataSource) {
					this.dataSource_Wfc_Build = dataSource;
					//viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					for (var i = 0; i < entities.length; i++) {
						var entity = entities[i];
						if(entity._properties.pname._value == name){
							entity.polygon.material = Cesium.Color.BURLYWOOD;
							CesiumIndex.viewer.entities.add(entity);
							var k= {};
							k.id = entity._properties.id._value;
							k.eId = entity.id;
							k.pId = entity._properties.pid._value;
							k.blockname = entity._properties.blockname._value;
							k.ramark = entity._properties.ramark._value;
							k.tpye = entity._properties.tpye._value;
							k.buildernum = entity._properties.buildernum._value;
							data_wfs.push(k);
						}
					}
					Wfs.showTable_Build(data_wfs);
					//this.showTree_Build(data_wfs);
				}
			)
		},
		error: function(data) {
			 console.log("error");
		}
	});
}
//显示buidl的表格
Wfs.showTable_Build = function(data){
	$('#builderWFSTabledivid').show();;//隐藏
	$('#builderWFSIdTable').bootstrapTable({
		//url: '/Interface/GetData',         //请求后台的URL（*）
		data:data,
		toolbar: '#toolbar',                //工具按钮用哪个容器
		striped: true,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: false,                     //是否启用排序
		sortOrder: "asc",                   //排序方式
		sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1,                       //初始化加载第一页，默认第一页
		pageSize: 10,                       //每页的记录行数（*）
		pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
		search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		contentType: "application/x-www-form-urlencoded",
		strictSearch: true,
		showColumns: true,                  //是否显示所有的列
		showRefresh: true,                  //是否显示刷新按钮
		minimumCountColumns: 2,             //最少允许的列数
		clickToSelect: true,                //是否启用点击选中行
		//height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "no",                     //每一行的唯一标识，一般为主键列
		//showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
		cardView: false,                    //是否显示详细视图
		detailView: false,                   //是否显示父子表
		columns: [
		{
			field: 'id',
			title: 'ID'
		},  {
			field: 'eId',
			title: 'eId',
			visible: false

		},  {
			field: 'pId',
			title: 'pId'
		},{
			field: 'blockname',
			title: '名字'
		}, {
			field: 'ramark',
			title: '备注'
		},
		{
			field: 'tpye',
			title: '类型',
			//formatter: operateFormatter //自定义方法，添加操作按钮
		},
		],
		
		rowStyle: function (row, index) {
			var classesArr = ['success', 'info'];
			var strclass = "";
			if (index % 2 === 0) {//偶数行
				strclass = classesArr[0];
			} else {//奇数行
				strclass = classesArr[1];
			}
			return { classes: strclass };
		},//隔行变色
		onClickRow:function(row){
			//alert(row.id);
			Wfs.findById(row.eId);
		},
		queryParams :function (params) {
			var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit,   //页面大小
				offset:params.offset
			};
			return temp;
		}
	});
}
//显示buidl的Tree
Wfs.showTree_Build = function (data){
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
				onClick : zTreeOnClick_class,
			    onCheck : zTreeOnCheck_class
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
		var treeListArray = [];
		var pIds = [0];
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < pIds.length; j++) {
				if(!pIds.includes(data[i].pId)){
					pIds.push(data[i].pId);
				}
			}
		}
		for (var m = 1; m < pIds.length; m++){
	
			var blockname;
			var  children = [];
			for (var n = 0; n < data.length; n++){
				var  cc = {};
				if(data[n].pId==pIds[m]){
					cc.name = data[n].buildernum;
					children.push(cc);
					blockname = data[n].blockname;
				}
			}
			var cccc= {};
			cccc.name = blockname;
			cccc.children = children;
			treeListArray.push(cccc);
		}
		treeObjList = $.fn.zTree.init($("#buiTree"), setting, treeListArray);
        $('#builderWFSTree').css('display','block');
		$("#builderWFSTree").style.visibility="visible";
	}
	function zTreeOnClick_class(event, treeId, treeNode) {

	}
	function zTreeOnCheck_class(event, treeId, treeNode) {
		
	}

}

//显示block的WFS
Wfs.showBlock =function (){
	$('#blockcolor_di').show();
	entities_Block = []
	var data_wfs_block= [];
	$.ajax({
		url:this.url_Cad_Wfs,
		cache: false,
		async: true,
		success: function(data) {
			var promise = Cesium.GeoJsonDataSource.load(data);
			promise.then(
				function(dataSource) {



					Wfs.dataSource_Wfc_Block = dataSource;
					CesiumIndex.viewer.dataSources.add(dataSource);
					var entities = dataSource.entities.values;
					entities_Block = dataSource.entities.values;
					for (var i = 0; i < entities.length; i++) {
						var entity = entities[i];
						
						var m= {};
						//k.pos = entity.position;
						if(entity._properties._RefName2._value!=""){
							m.eId = entity.id;
							m.refname2 = entity._properties._RefName2._value;
							m.naturecode = entity._properties._NatureCode._value;
							m.landarea = entity._properties._LandArea._value;
							m.landnature = entity._properties._LandNature._value;
							m.buildingde = entity._properties._BuildingDe._value;
							m.plotratio = entity._properties._PlotRatio._value;
							m.greenspace = entity._properties._GreenSpace._value;
							m.supporting = entity._properties._Supporting._value;
							data_wfs_block.push(m);
						}
					}
					Wfs.showBlockByColor();
					Wfs.showText_Block();
					Wfs.addLibel();
				}
			)
		},
		error: function(data) {
			 console.log("error");
		}
	});
}


Wfs.showBlockByColor = function(){
	for (var i = 0; i < entities_Block.length; i++) {
		var entity = entities_Block[i];
		switch(entity._properties._Color._value){
			case 131:
			entity.polygon.material = new Cesium.Color.fromBytes(128,255,252,255)
			break;
			case 80:
			entity.polygon.material = new Cesium.Color.fromBytes(57,255,0,255)
			break;
			case 104:
			entity.polygon.material = new Cesium.Color.fromBytes(2,129,27,255)
			break;
			case 50://R2
			entity.polygon.material = new Cesium.Color.fromBytes(255,255,124,255)
			break;
			case 11:
			entity.polygon.material = new Cesium.Color.fromBytes(255,130,122,255)
			break;
			case 31:
			entity.polygon.material =  new Cesium.Color.fromBytes(255,191,124,255)
			break;
			case 10:
			entity.polygon.material = new Cesium.Color.fromBytes(255,0,0,255)
			break;
			case 200:
			entity.polygon.material = new Cesium.Color.fromBytes(122,2,0,255)
			break;
			case 231:
			entity.polygon.material = new Cesium.Color.fromBytes(254,130,188,255)
			break;
			case 55:
			entity.polygon.material = new Cesium.Color.fromBytes(128,128,62,255)
			break;
			case 32:
			entity.polygon.material = new Cesium.Color.fromBytes(165,82,0,255)
			break;
			case 33:
			entity.polygon.material = new Cesium.Color.fromBytes(150,150,150,255)
			break;
			case 221:
			entity.polygon.material = new Cesium.Color.fromBytes(254,129,221,255)
			break;
			case 8:
			entity.polygon.material =  new Cesium.Color.fromBytes(128,128,128,255)
			break;
			case 21:
			entity.polygon.material = new Cesium.Color.fromBytes(254,163,122,255)
			break;
			case 30:
			entity.polygon.material = new Cesium.Color.fromBytes(254,130,188,255)
			break;
			case 151:
			entity.polygon.material = new Cesium.Color.fromBytes(192,192,192,255)
			break;
			case 81:
			entity.polygon.material = new Cesium.Color.fromBytes(159,255,126,255)
			break;
			case 7:
			entity.polygon.material = new Cesium.Color.fromBytes(57,255,0,255)
			break;
			default:
			entity.polygon.material = new Cesium.Color.fromBytes(110,110,110,255)
		}
	}
}
Wfs.showBlockByBuild = function(){
	for (var i = 0; i < entities_Block.length; i++) {
		var entity = entities_Block[i];
		switch(entity._properties._BuildState._value){
			case '待建':
				entity.polygon.material = new Cesium.Color.fromBytes(255,0,0,255)
			break;
			case '在建':
				entity.polygon.material = new Cesium.Color.fromBytes(255,255,0,255)
				break;
			case '建成':
				entity.polygon.material = new Cesium.Color.fromBytes(0, 150, 50,255)
				break;
			default:
				entity.polygon.material = new Cesium.Color.fromBytes(110,110,110,255)
		}
	}
}
Wfs.showBlockBySale = function(){
	for (var i = 0; i < entities_Block.length; i++) {
		var entity = entities_Block[i];
		switch(entity._properties._SaleState._value){
			case '待售':
				entity.polygon.material = new Cesium.Color.fromBytes(255,0,0,255)
			break;
			case '在售':
				entity.polygon.material = new Cesium.Color.fromBytes(255,255,0,255)
				break;
			case '售完':
				entity.polygon.material = new Cesium.Color.fromBytes(0, 150, 50,255)
				break;
			default:
				entity.polygon.material = new Cesium.Color.fromBytes(110,110,110,255)
		}
	}
}

Wfs.showBlockByGrey = function(){
	for (var i = 0; i < entities_Block.length; i++) {
		var entity = entities_Block[i];

		entity.polygon.material = new Cesium.Color.fromBytes(110,110,110,255)
	}
}

Wfs.drawCanvas = function (img,text,fontsize){
    var canvas = document.createElement('canvas');      //创建canvas标签
    var ctx = canvas.getContext('2d');
 
    ctx.fillStyle = '#99f';
    ctx.font = fontsize + "px Arial";
 
    canvas.width = ctx.measureText(text).width + fontsize * 2;      //根据文字内容获取宽度
	canvas.height = fontsize * 2; // fontsize * 1.5
	
	if(img!=''){

		var bgImg = new Image();
		bgImg.src = img;
		bgImg.onload = function(){
			ctx.drawImage(bgImg,0,0,64,64);
		}
		// setTimeout(function(){
		// 	ctx.drawImage(bgImg,0,0,64,64);
		// },10)
	}

    ctx.fillStyle = '#000';
    ctx.font = fontsize + "px Calibri,sans-serif";
    ctx.shadowOffsetX = 1;    //阴影往左边偏，横向位移量
    ctx.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
    ctx.shadowColor = "#fff"; //阴影颜色
    ctx.shadowBlur = 1; //阴影的模糊范围
    ctx.fillText(text, fontsize, fontsize);
    return canvas;
}

Wfs.addText = function(entity_texts,path,x,y){
	var en = CesiumIndex.viewer.entities.add({
		position : Cesium.Cartesian3.fromDegrees(x, y,25),
		billboard : {
			image : path,
			sizeInMeters : true,
			horizontalOrigin : Cesium.HorizontalOrigin.CENTER, // default
			verticalOrigin : Cesium.VerticalOrigin.CENTER, // default: CENTER
			scale : 1,
			// width : path.width , // default: undefined
			// height : canvas.height // default: undefined
		}
	})
	entity_texts.add(en)
}


Wfs.removeText = function(texts){
	if(texts!=null){
		for(var i = 0; i <texts._entities._array.length; i++){
			CesiumIndex.viewer.entities.remove(texts._entities._array[i]);
		}
	}

}


Wfs.entity_libel = new Cesium.EntityCollection();
Wfs.isShowLibel = 0
Wfs.showLibel= function(){
	if(Wfs.isShowLibel == 0){
		// Wfs.showBlockByGrey();
		Wfs.removeText(Wfs.entity_libel)
		// Wfs.removeText(Wfs.entity_texts_blockname)
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/农贸.png',119.4855,32.4174);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','华星农贸市场',36),119.4855,32.4179);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/小学.png',119.4841,32.3995);
		Wfs.addText(Wfs.entity_libel,'img/Legend/初中.png',119.4859,32.3995);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','新东方学校',36),119.485,32.3999);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/幼儿园.png',119.484,32.398);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','满天星幼儿园',36),119.484,32.3985);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/医院.png',119.481,32.41);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','妇幼保健院(在建)',36),119.481,32.4105);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/商办.png',119.481,32.398);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','环球金融城',36),119.481,32.3985);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/商办.png',119.4863,32.398);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','交通银行',36),119.4863,32.3985);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/政务中心.png',119.49,32.396);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','市民广场',36),119.49,32.3965);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/商办.png',119.499,32.399);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','泰达Y_MSD',36),119.499,32.3995);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/工业园.png',119.5,32.3901);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','信息产业基地',36),119.5,32.3907);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/公园.png',119.505,32.395);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','李宁体育公园',36),119.505,32.3955);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/小学.png',119.501,32.409);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','育才小学东校区',36),119.501,32.4095);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/小学.png',119.4975,32.4135);
		Wfs.addText(Wfs.entity_libel,'img/Legend/初中.png',119.4985,32.4135);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','华师大附中',36),119.498,32.4141);
	
		Wfs.addText(Wfs.entity_libel,'img/Legend/医院.png',119.488,32.414);
		Wfs.addText(Wfs.entity_libel,Wfs.drawCanvas('','天顺花园社区卫生服务站',36),119.488,32.4145);
		Wfs.isShowLibel = 1;
	}else{
		Wfs.isShowLibel = 0;
		Wfs.removeText(Wfs.entity_libel);
		// Wfs.showBlockByColor();
	}
}
Wfs.entity_texts_blockname = new Cesium.EntityCollection();
Wfs.showText_Block= function(){
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','867地块',36),119.483,32.414);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','中央学府',36),119.485,32.411);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','翡翠公园',36),119.493,32.406);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','广陵铭著',36),119.494,32.404);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','运河尚郡',36),119.485,32.3934);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','运河东郡',36),119.485,32.391);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','运和蓝湾',36),119.49,32.392);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','京杭融园',36),119.493,32.391);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','佳源华府',36),119.496,32.391);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','877地块',36),119.503,32.401);
	Wfs.addText(Wfs.entity_texts_blockname,Wfs.drawCanvas('','朗润园',36),119.498,32.409);
}



//显示block的表格
Wfs.showTable_Block = function(data){
	$('#blockWFSTabledivid').show();
	$('#blockWFSIdTable').bootstrapTable({
		//url: '/Interface/GetData',         //请求后台的URL（*）
		showHeader: true,
		showFullscreen: true,
		data:data,
		toolbar: '#toolbar',                //工具按钮用哪个容器
		striped: true,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: true,                     //是否启用排序
		sortOrder: "asc",                   //排序方式
		sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber: 1,                       //初始化加载第一页，默认第一页
		pageSize: 5,                       //每页的记录行数（*）
		pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
		search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		contentType: "application/x-www-form-urlencoded",
		strictSearch: true,
		showColumns: true,                  //是否显示所有的列
		showRefresh: true,                  //是否显示刷新按钮
		minimumCountColumns: 2,             //最少允许的列数
		clickToSelect: true,                //是否启用点击选中行
		//height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "no",                     //每一行的唯一标识，一般为主键列
		//showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
		cardView: false,                    //是否显示详细视图
		detailView: false,                   //是否显示父子表
		columns: [
		{
			field: 'eId',
			title: 'eId',
			visible: false,

		},{
			field: 'refname2',
			title: '用地编号',
			sortable: true,
			order: 'asc',
		},  {
			field: 'landarea',
			title: '用地面积',

		}, 
		{
			field: 'landnature',
			title: '用地性质',

		}, {
			field: 'naturecode',
			title: '性质编号',

		},  {
			field: 'buildinghe',
			title: '建筑密度',
		},{
			field: 'plotratio',
			title: '容积率',
		}, {
			field: 'greenspace',
			title: '绿地率',
		}, {
			field: 'buiderldhe',
			title: '建筑限高',
		},
		{
			field: 'supporting',
			title: '配套设施',
		},
		{
			field: 'remarks',
			title: '备注',
		},
		],
		rowStyle: function (row, index) {
			var classesArr = ['success', 'info'];
			var strclass = "";
			if (index % 2 === 0) {//偶数行
				strclass = classesArr[0];
			} else {//奇数行
				strclass = classesArr[1];
			}
			return { classes: strclass };
		},//隔行变色
		onClickRow:function(row){
			//alert(row.id);
			Wfs.findById(row.eId);
		},
		queryParams :function (params) {
			var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit,   //页面大小
				offset:params.offset,
				sort: params.sort,      //排序列名  
				sortOrder: params.order //排位命令（desc，asc） 
			};
			return temp;
		}
	});
}
//显示block的属性表
Wfs.showInfo_Block = function(entity){
	var data= {};
	if(entity._properties._RefName2._value!=null){
		//m.eId = entity.id;
		data.refname2 = entity._properties._RefName2._value;
		data.naturecode = entity._properties._NatureCode._value;
		data.landarea = entity._properties._LandArea._value;
		data.landnature = entity._properties._LandNature._value;
		data.buildingde = entity._properties._BuildingDe._value;
		data.plotratio = entity._properties._PlotRatio._value;
		data.greenspace = entity._properties._GreenSpace._value;
		data.supporting = entity._properties._Supporting._value;
		data.name_all = entity._properties.Name_all._value;
		//data_wfs_block.push(data);
		data.buildstate = entity._properties.BuildState._value;
		data.salestate = entity._properties.SaleState._value;
		data.blockname = entity._properties.BlockName._value;
		data.selltime = entity._properties.SellTime._value;
		data.sellprice = entity._properties.SellPrice._value;
		data.arearatio = entity._properties.AreaRatio._value;
		data.dev = entity._properties.Dev._value;
		data.comtime = entity._properties.ComTime._value;
		data.saleprice = entity._properties.SalePrice._value;
		data.floorprice = entity._properties.FloorPrice._value;
	}

	var content='<table class="cesium-infoBox-defaultTable"><tbody>'
		+ '<tr><th>用地性质</th><td >'
		+ data.landnature
		+ '</td></tr>'

		+ '<tr><th>出让时间</th><td >'
		+ (data.selltime!=null ? data.selltime : '-')
		+ '</td></tr>'

		+ '<tr><th>出让价格</th><td >'
		+ (data.sellprice!=null ? data.sellprice : '-')
		+ '</td></tr>'

		+ '<tr><th>容积率</th><td >'
		+ (data.arearatio!=undefined ? data.arearatio : data.plotratio)
		+ '</td></tr>'

		+ '<tr><th>楼面价</th><td >'
		+ (data.floorprice!=null ? data.floorprice : '-')
		+ '</td></tr>'

		+ '<tr><th>开发商</th><td >'
		+ (data.dev!=null ? data.dev : '-')
		+ '</td></tr>'

		+ '<tr><th>建成时间</th><td >'
		+ (data.comtime!=null ? data.comtime : '-')
		+ '</td></tr>'

		+ '<tr><th>销售价格</th><td >'
		+ (data.saleprice!=null ? data.saleprice : '-')
		+ '</td></tr>'


		+ '<tr><th>用地编号</th><td>'
    	+ data.refname2
		+ '</td></tr>'
		
    	+ '<tr><th>面积</th><td >'
		+ data.landarea
		+ '</td></tr>'

		+ '<tr><th>用地编号</th><td >'
		+ data.naturecode
		+ '</td></tr>'

		+ '<tr><th>建筑密度</th><td >'
		+ data.buildingde
		+ '</td></tr>'


		+ '<tr><th>绿地率</th><td >'
		+ data.greenspace
		+ '</td></tr>'

		+ '<tr><th>显示建筑</th><td >'
		+ '<a href="javascript:void(0);" id="'+data.name_all+'" name="' 
		+ data.name_all
		+ '" onclick="parent.Wfs.showBuildByBlockName(name)">加载建筑WFS</a>'
		+ '</td></tr>'
		+ '</tbody></table>';

		var selectedEntity
		if(data.blockname!=null){
			selectedEntity = new Cesium.Entity({
				id:data.dev+ '-'+data.blockname+'('+ data.buildstate +data.salestate + ')'
			})
		}
		if(data.blockname==null){
			selectedEntity = new Cesium.Entity()
		}

	selectedEntity.description = content;
	// CesiumIndex.viewer.infoBox.viewModel.titleText = data.dev;
	CesiumIndex.viewer.selectedEntity = selectedEntity;
}

//隐藏Buildwfs根据数据源
Wfs.hideBuildByDS = function(){
	CesiumIndex.viewer.dataSources.remove(Wfs.dataSource_Wfc_Build);
	$('#builderWFSTabledivid').hide();;//隐藏	
	$("#builderWFSTree").hide();
	
}
//隐藏Buildwfs根据实体
Wfs.hideBuildByES = function(){
	CesiumIndex.viewer.entities.removeAll();
	$('#builderWFSTabledivid').hide();//隐藏	
	$("#builderWFSTree").hide();
	
}
//隐藏Blockwfs根据数据源
Wfs.hideBlockByDS = function(){
	CesiumIndex.viewer.dataSources.remove(Wfs.dataSource_Wfc_Block);
	$('#blockWFSTabledivid').hide();;//隐藏	
	$('#blockcolor_di').hide();
	Wfs.removeText(Wfs.entity_texts_blockname);
}
//定位wfs
Wfs.findById = function (id){
	var ds  =  CesiumIndex.viewer.dataSources;
	var  entity =  ds._dataSources[0]._entityCollection.getById(id);
	if(entity ==null){
		entity = CesiumIndex.viewer.entities.getById(id);
	}
	Wfs.flyToEntity(entity);//定位
	Wfs.heightEntity(entity);//高亮
}
//高亮
Wfs.heightEntity = function (entity){
	if(CesiumIndex.lastPickedWfs){
		CesiumIndex.lastPickedWfs.polygon.outlineColor = Cesium.Color.CORNFLOWERBLUE;
	}
	entity.polygon.outlineColor = Cesium.Color.RED;
	CesiumIndex.lastPickedWfs = entity;
}
//取消高亮
Wfs.unHeithWfs = function(){
	if(CesiumIndex.lastPickedWfs){
		CesiumIndex.lastPickedWfs.polygon.outlineColor = Cesium.Color.CORNFLOWERBLUE;
	}
}
//定位
Wfs.flyToEntity = function(entity){
	CesiumIndex.viewer.flyTo(entity, {
		offset : {
			heading : Cesium.Math.toRadians(0.0),
			pitch : Cesium.Math.toRadians(-45),
			range : 500
		}
	});
}

