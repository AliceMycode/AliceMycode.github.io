// import effectDragCircle from '@/class/effect/effectDragCircle'
//引入材质文件
import OneMapMaterial from '@/class/onemap/material'
//引入视角相关文件
import onemapView from '@/class/onemap/onemapView'
//引入地图边界
import viewboundaryPolygon from '@/class/base/viewboundaryPolygon'
//引入地图模型数据、引入地图配置
import { Map3DURL, oneMapConfig } from '@/config/oneMapConfig'



export default {

  data() {
    return {
      viewer: null,
      //初始化地图视角
      onemapView: new onemapView(),
      //初始化地图边界
      viewboundaryPolygon: new viewboundaryPolygon(),
      mapTilesEntity: []

    }
  },
  methods: {
    initMap() {
      this.viewer = new OneMap.Viewer('map', { ...oneMapConfig })
      
      console.log('OneMap版本',OneMap.VERSION)
      //关闭抗锯齿  
      this.viewer.scene.fxaa = false
      this.viewer.scene.postProcessStages.fxaa.enabled = false;

      //设置地球的全局材质
      // this.viewer.scene.globe.material = OneMap.Material.fromType('FanSe');

      //开启地形监测
      this.viewer.scene.globe.depthTestAgainstTerrain = false;

      //开启光照模式
      this.viewer.scene.globe.enableLighting = false;

      // 全局挂载窗口
      window.$viewer = this.viewer;
      window.$scene = this.viewer.scene;
      window.$camera = this.viewer.camera;

      //初始化视角
      this.handleInitView()
      // 初始化边界
      this.handleInitBoundary()
      // 左键点击
      // this.handleLeftClick()
      // 右键点击
      // this.handleRightClick()
      // 鼠标移动
      // this.handleMouseMove()
      //初始化材质
      this.handleInitMaterial()
      this.handleMousewheel()
      // this.loadModeData()


    },
    // 初始化材质
    handleInitMaterial() {
      const material = new OneMapMaterial()
    },
    // 初始化边界
    handleInitBoundary() {
      this.viewboundaryPolygon.handleCreateBoundarySHQ()
    },
    //滚轮事件
    handleMousewheel() {
      const wheelHandler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      wheelHandler.setInputAction((movement) => {
        if (movement > 0) {
          // zoomIn()
        } else {
          // zoomOut()
        }
      }, OneMap.ScreenSpaceEventType.WHEEL)
    },
    // 加载底图
    handleInitImageLayer() {
      this.onemapLayerClass.loadLayer()
    },
    //初始化视角
    handleInitView() {
      this.onemapView.handleBaseView()
    },
    // 左键点击
    handleLeftClick() {
      const leftHandler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      leftHandler.setInputAction((movement) => {
        const picked = this.viewer.scene.pick(movement.position)
     
        //调用获取位置信息的接口
        let ray = this.viewer.camera.getPickRay(movement.position);

        //position为点的笛卡尔坐标
        let position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
     
      

      }, OneMap.ScreenSpaceEventType.LEFT_CLICK)
    },
    // 右键点击
    handleRightClick() {
      const rightHandler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      rightHandler.setInputAction((movement) => {
        this.viewer.scene.screenSpaceCameraController.enableRotate = true
     
      }, OneMap.ScreenSpaceEventType.RIGHT_CLICK)
    },
    // 鼠标移动
    handleMouseMove() {
      const moveHandler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas)
      moveHandler.setInputAction((movement) => {
        // 获取鼠标移动的最后一个点
        const ray = this.viewer.camera.getPickRay(movement.endPosition)
        const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene)
       
      }, OneMap.ScreenSpaceEventType.MOUSE_MOVE)
    },

    loadModeData() {
      for (let i in Map3DURL) {
        let mapTileEntity = new OneMap.Cesium3DTileset({
          url: Map3DURL[i],
          //优化选择 较近的 tile 中保持较高的细节，在较远的 tile 中保持较低的细节
          dynamicScreenSpaceError: true,
          //优化参数
          dynamicScreenSpaceErrorDensity: 0.00278,
          //动态屏幕空间误差
          dynamicScreenSpaceErrorFactor: 4.0,
          // 计算密度
          dynamicScreenSpaceErrorHeightFalloff: 0.25,
          //父级细化之前加载所有子级，显著减少内存,
          skipLevelOfDetail: true,
          preferLeaves: true,
          //只加载屏幕空间
          immediatelyLoadDesiredLevelOfDetail: true,
          //屏幕空间优化选择
          foveatedTimeDelay: 0.2,
          //遍历过程中是否总是下载可见同级的 tile
          loadSiblings: false,
          cullWithChildrenBounds: true,
  
          //最大的屏幕空间误差
          // maximumScreenSpaceError: 2,
          //最大加载瓦片个数
          // maximumNumberOfLoadedTiles: 100000,
  
  
        })
        this.viewer.scene.primitives.add(mapTileEntity);
        mapTileEntity.readyPromise.then((tileset) => {
          // 高度贴合
          let boundingSphere = tileset.boundingSphere;
          let cartographic = OneMap.Cartographic.fromCartesian(boundingSphere.center);
          let surface = OneMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
          let offset = OneMap.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -10);
          let translation = OneMap.Cartesian3.subtract(offset, surface, new OneMap.Cartesian3());
          tileset.modelMatrix = OneMap.Matrix4.fromTranslation(translation);
          // this.viewer.flyTo(tileset)
        }).otherwise((error) => {
          console.log(error);
        });
        this.mapTilesEntity.push(mapTileEntity);
      }
    }






  }
}