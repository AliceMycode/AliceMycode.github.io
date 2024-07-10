/*
  地图资源
*/
export const Map3DURL = [
  // http://172.16.28.51:8889/gangqu/quyu1/tileset.json
  "/gangqu/quyu1/tileset.json",
  "/gangqu/quyu2/tileset.json",
  "/gangqu/quyu3/tileset.json",
];

/*
  地图视角
*/
export const ONEMAP_VIEW = {
  // 大亚湾视角
  DYW: {
    destination: {
      x: -2461743.4512023944,
      y: 5393522.702405108,
      z: 2429721.328364386,
    },
    direction: {
      x: 0.34852282447537797,
      y: -0.8355753817253724,
      z: 0.42467119312970014,
    },
    up: {
      x: -0.20097163769064186,
      y: 0.37592327104881074,
      z: 0.904594989554941,
    },
  },
  // 石化区视角
  SHQ: {
    destination: {
      x: -2452953.6436319584,
      y: 5359960.688445699,
      z: 2447937.0794797796,
    },
    direction: {
      x: 0.36786807954823214,
      y: -0.8785609811636148,
      z: 0.3046369616877146,
    },
    up: {
      x: -0.1605065983796809,
      y: 0.2626986379685326,
      z: 0.9514342108028604,
    },
  },
};

/*
  地图地图
*/
export const oneMapImage = {
  YX_DD: new OneMap.CesiumTerrainProvider({
    url: "https://tiles.geovis.online/base/v1/terrain?token=087ba6d2de8677b3367aeed1a7a83bbb",
    requestWaterMask: true,
    requestVertexNormals: true,
  }),
  YX_SS: new OneMap.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
  }),
  //影像图
  YX_DT: new OneMap.ArcGisMapServerImageryProvider({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
    maximumLevel: 18,
  }),
  // 影像图
  TDT_YX: new OneMap.WebMapTileServiceImageryProvider({
    url: "http://t1.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=087ba6d2de8677b3367aeed1a7a83bbb",
    layer: "tdtBasicLayer",
    style: "default",
    format: "tiles",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true,
    maximumLevel: 18,
  }),
  //蓝色地图
  SL_LSDT: new OneMap.ArcGisMapServerImageryProvider({
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
    maximumLevel: 18,
  }),
  //高德在线影像标记地图
  YX_ZJGD: new OneMap.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    maximumLevel: 18,
  }),
};

/*
  地图配置
*/
export const oneMapConfig = {
  //加载底图
  imageryProvider: oneMapImage.TDT_YX,
  //加载地形
  // terrainProvider: oneMapImage.YX_DD,
  //场景模式
  // sceneMode: OneMap.SceneMode.SCENE3D,
  vrButton: false,
  animation: false,
  baseLayerPicker: false,
  geocoder: false,
  //是否显示时间轴
  timeline: false,
  fullscreenButton: false,
  //是否显示主页按钮
  homeButton: false,
  creditContainer: document.createElement("div"),
  infoBox: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  //去掉选中的绿色方框
  selectionIndicator: false,
  scene3DOnly: true,
  //设置天空盒
  skyBox: new OneMap.SkyBox({
    sources: {
      positiveX: require("@/assets/images/tycho2t3_80_px.jpg"),
      negativeX: require("@/assets/images/tycho2t3_80_mx.jpg"),
      positiveY: require("@/assets/images/tycho2t3_80_py.jpg"),
      negativeY: require("@/assets/images/tycho2t3_80_my.jpg"),
      positiveZ: require("@/assets/images/tycho2t3_80_pz.jpg"),
      negativeZ: require("@/assets/images/tycho2t3_80_mz.jpg"),
    },
  }),
};
