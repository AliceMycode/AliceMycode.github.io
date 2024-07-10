
export default class effectDragCircleWall {

    constructor () {
      this.ellipseId = 'DragCircleWall_1'
      this.ellipsePointId = 'DragCircleWallPoint_1'
      this.center = { x: 114.58540831783083, y: 22.7453738564298 }
      this.radius = 500
      this.CustomDataSource = new OneMap.CustomDataSource('effectDragCircleWall');
    }
  
    // 添加
    handleCreateDragCircleWall(){
      const ellipse = new OneMap.EllipseOutlineGeometry({
        center : OneMap.Cartesian3.fromDegrees(this.center.x, this.center.y),
        semiMajorAxis : this.radius,
        semiMinorAxis : this.radius,
      });
  
      const geometry = OneMap.EllipseOutlineGeometry.createGeometry(ellipse);
      const geometryValues = geometry.attributes.position.values; 
  
      var ellipsePosition =[];
      for (var i = 0; i < geometryValues.length / 3; i++) {
        ellipsePosition.push(new OneMap.Cartesian3(geometryValues[i * 3], geometryValues[i * 3 + 1], geometryValues[i * 3 + 2]));
      }
      ellipsePosition.push(ellipsePosition[0], ellipsePosition[1])
  
      const entitieEllipse = {
        id: this.ellipseId,
        wall: {
          positions: ellipsePosition,
          maximumHeights: new Array(ellipsePosition.length).fill(5),
          minimumHeights: new Array(ellipsePosition.length).fill(0),
          material: OneMap.Color.fromCssColorString('#407eff')
        },
      }
  
      const entitiePoint = {
        id: this.ellipsePointId,
        position: ellipsePosition[0],
        ellipsoid: {
          radii: new OneMap.Cartesian3(15, 15, 15),
          heightReference: OneMap.HeightReference.CLAMP_TO_GROUND,
          material: OneMap.Color.BLUE,
        },
      }
  
      this.CustomDataSource.entities.add(entitieEllipse)
      this.CustomDataSource.entities.add(entitiePoint)
  
      window.$viewer.dataSources.add(this.CustomDataSource);
    }
  
    // 删除
    handleDeleteDragCircleWall(){
      this.CustomDataSource.entities.removeById(this.ellipseId)
      this.CustomDataSource.entities.removeById(this.ellipsePointId)
    }
  }