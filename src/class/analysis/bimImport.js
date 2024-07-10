import { Map3DURL } from "@/config/oneMapConfig";
import onemapView from "@/class/onemap/onemapView";
export default class bimImport {
  constructor() {
    this.viewer = window.$viewer;
    this.mapTilesEntity = [];
    this.onemapView = new onemapView();
  }
  // 加载倾斜摄影数据
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
      });
      this.viewer.scene.primitives.add(mapTileEntity);
      mapTileEntity.readyPromise
        .then((tileset) => {
          // 高度贴合
          let boundingSphere = tileset.boundingSphere;
          let cartographic = OneMap.Cartographic.fromCartesian(
            boundingSphere.center
          );
          let surface = OneMap.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            0.0
          );
          let offset = OneMap.Cartesian3.fromRadians(
            cartographic.longitude,
            cartographic.latitude,
            -10
          );
          let translation = OneMap.Cartesian3.subtract(
            offset,
            surface,
            new OneMap.Cartesian3()
          );
          tileset.modelMatrix = OneMap.Matrix4.fromTranslation(translation);
          this.viewer.flyTo(tileset);
          console.log("tileset", tileset);
        })
        .otherwise((error) => {
          console.log(error);
        });
      this.mapTilesEntity.push(mapTileEntity);
    }
  }
  handleAdjustView() {
    this.handleRemovTileset();
    this.onemapView.handleBaseView();
  }

  handleRemovTileset() {
    for (let i = 0; i < this.mapTilesEntity.length; i++) {
      let item = this.mapTilesEntity[i];
      this.viewer.scene.primitives.remove(item);
    }
  }
}
