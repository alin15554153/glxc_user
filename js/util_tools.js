//随机生成十六进制颜色
function randomHexColor() { 
	 var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
	 while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
		 hex = '0' + hex;
	 }
	 return '#' + hex; //返回‘#'开头16进制颜色
}
Array.prototype.getRandomItem = function() {
	return this[Math.floor(Math.random() * this.length)];
};

//字符串数据转数字字符串
function stringToNumber(stringInput) {
	var stringArray = stringInput.split(",");
	var numberArrayOutput = new Array();
	for (i = 0; i < stringArray.length; i++) {
		numberArrayOutput.push(Number(stringArray[i]));
	}
	return numberArrayOutput;
}

//截取字符串，返回经度数值，cj添加
function substringLon(str){
	var lon1 = str.toString().substring(0,3);
	var lon2 = str.toString().substring(3);
	var lon = Number(lon1+"."+lon2);
	return lon;
}

//截取字符串，返回纬度数值，cj添加
function substringLat(str){
	var lat1 = str.toString().substring(0,2);
	var lat2 = str.toString().substring(2);
	var lat = Number(lat1+"."+lat2);
	return lat;
}

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

//将WGS84坐标系，转换成百度坐标体系
function wgs84tobd09(lon,lat){
	var gcj02poi1 = wgs84togcj02(lon, lat);
	var baidupoi1 = gcj02tobd09(gcj02poi1[0], gcj02poi1[1]);
	return baidupoi1;
}

//WGS84转GCj02
function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat];
    }
    else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * PI;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return [mglng, mglat];
    }
}
/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}

/**
* 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
* 即谷歌、高德 转 百度
* @param lng
* @param lat
* @returns {*[]}
*/
function gcj02tobd09(lng, lat) {
   var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
   var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
   var bd_lng = z * Math.cos(theta) + 0.0065;
   var bd_lat = z * Math.sin(theta) + 0.006;
   return [bd_lng, bd_lat]
}

function transformlat(lng, lat) {
   var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
   ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
   ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
   ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
   return ret
}

function transformlng(lng, lat) {
   var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
   ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
   ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
   ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
   return ret
}

/**
* approx distance between two points on earth ellipsoid
* @param {Object} lat1
* @param {Object} lng1
* @param {Object} lat2
* @param {Object} lng2
*/
var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;
function getRad(d){
    return d*PI/180.0;
}
function getFlatternDistance(lng1,lat1,lng2,lat2){
   var f = getRad((lat1 + lat2)/2);
   var g = getRad((lat1 - lat2)/2);
   var l = getRad((lng1 - lng2)/2);
   
   var sg = Math.sin(g);
   var sl = Math.sin(l);
   var sf = Math.sin(f);
   
   var s,c,w,r,d,h1,h2;
   var a = EARTH_RADIUS;
   var fl = 1/298.257;
   
   sg = sg*sg;
   sl = sl*sl;
   sf = sf*sf;
   
   s = sg*(1-sl) + (1-sf)*sl;
   c = (1-sg)*(1-sl) + sf*sl;
   
   w = Math.atan(Math.sqrt(s/c));
   r = Math.sqrt(s*c)/w;
   d = 2*w*a;
   h1 = (3*r -1)/2/c;
   h2 = (3*r +1)/2/s;
   
   return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}