var Tile_3D = {

	url_Build_Arr : ['http://localhost:8096/glxc_builder_tile/tileset.json'],
    url_Block_Arr : ['http://localhost:8096/glxc_block_tile/tileset.json'],
	tile3ds_Build : [],
    tile3ds_Block : [],
    tile3ds : [],
	lastPickedFeature : null
}




//加载建筑3dtiles数据
Tile_3D.showTile3D_Build = function (){
	//加载3dtiles数据
	for ( var i = 0; i < Tile_3D.url_Build_Arr.length; i++) {
		//配置市区三维数据
		var tilesetOption = {
			url: Tile_3D.url_Build_Arr[i],
			skipLevelOfDetail : true,
			baseScreenSpaceError : 1024,
			maximumScreenSpaceError: 8,
			skipLevels:1,
			maximumNumberOfLoadedTiles: 1000,
			maximumMemoryUsage:2048,
		};
		// var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(119.499698, 32.392185, 45.6421522), 1609.270221);	
		// var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
		// var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
		// var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, tilesetOption.heightOffset);
		// var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
		// tilesetOption.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
		var tile_3d = new Cesium.Cesium3DTileset(tilesetOption);
		Tile_3D.tile3ds_Build.push(tile_3d);
		CesiumIndex.viewer.scene.primitives.add(tile_3d);
	}
}
//加载地块3dtiles数据
Tile_3D.showTile3D_Block = function (){
	//加载3dtiles数据
	for ( var i = 0; i < Tile_3D.url_Block_Arr.length; i++) {
		//配置市区三维数据
		var tilesetOption = {
			url: Tile_3D.url_Block_Arr[i],
			skipLevelOfDetail : true,
			baseScreenSpaceError : 1024,
			maximumScreenSpaceError: 8,
			skipLevels:1,
			maximumNumberOfLoadedTiles: 1000,
			maximumMemoryUsage:2048,
		};
		var tile_3d = new Cesium.Cesium3DTileset(tilesetOption);
		Tile_3D.tile3ds_Block.push(tile_3d);
		CesiumIndex.viewer.scene.primitives.add(tile_3d);
	}
}
Tile_3D.data_11 = null;
Tile_3D.showLeaseDiv = function ()
{
	$.ajax({
		url:'http://localhost:8096/glxc_admin/api/assert/garden/enterprise/findByBuildingMark',
		type: 'POST',
		dataType: "json",
		data: { buildingMark:"11号楼"},
		success: function(data, msg) {
            console.log(data);
            Tile_3D.data_11 = data;
			Tile_3D.showTable_Lease(data);
			if (data.status == 1) {

			}
			else {
				//alert(data.msg);
			}
		},
		error: function(data) {
			 console.log("error");
		}
	});
    //Tile_3D.showTable_Lease("11号楼");
}
Tile_3D.showTable_Lease = function(data){
	$('#lease_Tabledivid').show();
    var oTable = new TableLeaseInit(data);
    oTable.Init(data);
 }
 var TableLeaseInit = function (data) {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function (data) {
        $('#lease_Ti').bootstrapTable({
            // url : 'http://192.168.18.111:8080/api/assert/garden/enterprise/findByBuildingMark',
            // method:'post',
            // contentType:'application/json',
            data:data.datas,
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            //Post请求加上如下配置
            //contentType:"application/x-www-form-urlencoded; charset=UTF-8",
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
                field: 'buildingMark',
                title: '楼号'
            },  {
                field: 'ridgepoleMark',
                title: '栋号'

            },  {
                field: 'tierMark',
                title: '层数'
            },{
                field: 'roomNo',
                title: '室'
            }, {
                field: 'enterpriseName',
                title: '企业名称'
            },
            {
                field: 'contractArea',
                title: '租赁面积',

                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'leaseStartTime',
                title: '租赁开始日期',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'leaseEndTime',
                title: '租赁结束日期',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'legalPerson',
                title: '法人',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'leaseEndTime',
                title: '法人电话',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'frontMan',
                title: '负责人',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'frontManContactWay',
                title: '负责人电话',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'industryClassify',
                title: '行业分类',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'businessScope',
                title: '经营范围',
                //formatter: operateFormatter //自定义方法，添加操作按钮
            },
            {
                field: 'numberOfPeople',
                title: '人数',
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
                //findWFSById(row.eId);
            },
            queryParams:function (params) {
                var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    limit: params.limit,   //页面大小
                    offset:params.offset,
                    buildingMark:'11号楼'
                };
                return temp;
            }
        });

    };
    //得到查询的参数
    // oTableInit.queryParams = function (params) {
    //     var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    //         limit: params.limit,   //页面大小
    //         offset:params.offset,
    //         buildingMark:'11号楼'
    //     };
    //     return temp;
    // };
    return oTableInit;
};
Tile_3D.showInfo =function(){
    
}
Tile_3D.hideTile3D_Build = function(){
	for ( var i = 0; i < Tile_3D.tile3ds_Build.length; i++) {
		CesiumIndex.viewer.scene.primitives.remove(Tile_3D.tile3ds_Build[i]);
	}
}
Tile_3D.hideTile3D_Block = function(){
	for ( var i = 0; i < Tile_3D.tile3ds_Block.length; i++) {
		CesiumIndex.viewer.scene.primitives.remove(Tile_3D.tile3ds_Block[i]);
	}
}

Tile_3D.showOneBuild = function(){
    window.open("oneBuild.html");
}

//高亮
Tile_3D.heightTile3D = function(pickedFeature){
	
	pickedFeature.color = new Cesium.Color(1, 0, 0, pickedFeature.color.alpha);
	CesiumIndex.lastPickedFeature = pickedFeature;
}
Tile_3D.unHeithTile3D =  function (){
    if(CesiumIndex.lastPickedFeature!=null && CesiumIndex.lastPickedFeatureOP == null){
        CesiumIndex.lastPickedFeature.color =  new Cesium.Color(1, 1, 1, CesiumIndex.lastPickedFeature.color.alpha);
        CesiumIndex.lastPickedFeature =null;
    }
}
