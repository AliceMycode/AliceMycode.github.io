

export default class skyViewableAnalysis {
  constructor() {
    this.viewer = window.$viewer
  }
  init() {
    // 添加天空盒
    var skyBoxUrl = OneMap.buildModuleUrl('Assets/Textures/SkyBox/tycho2t3_80');
    viewer.scene.skyBox = new OneMap.SkyBox({
      sources: {
        positiveX: skyBoxUrl + '/tycho2t3_80_px.jpg',
        negativeX: skyBoxUrl + '/tycho2t3_80_nx.jpg',
        positiveY: skyBoxUrl + '/tycho2t3_80_py.jpg',
        negativeY: skyBoxUrl + '/tycho2t3_80_ny.jpg',
        positiveZ: skyBoxUrl + '/tycho2t3_80_pz.jpg',
        negativeZ: skyBoxUrl + '/tycho2t3_80_nz.jpg'
      }
    });

    // 获取相机位置和方向
    var cameraPosition = viewer.camera.position;
    var cameraDirection = viewer.camera.direction;

    // 创建射线
    var ray = new OneMap.Ray(cameraPosition, cameraDirection);

    // 检测射线与天空盒之间的交点
    var skyBoxIntersect = OneMap.IntersectBox(viewer.scene.skyBox.boundingSphere, ray);
    if (skyBoxIntersect < 0) {
      console.log('观察点在天空盒内部，天空不可见！');
    } else {
      console.log('观察点在天空盒外部，天空可见！');
    }

  }
}






