export default class MeasureHandler {

	constructor(viewer){

		this._viewer = viewer;

		this._scene = viewer.scene;

		this._scene.globe.depthTestAgainstTerrain = true;

		this._canvas = viewer.scene.canvas;

		this._handler = new OneMap.ScreenSpaceEventHandler(this.canvas);

		//定义长度测量对象
		this._distanceMeasure = null;

		//当前长度测量对象所选中的测量点集合
		this._disPosition = [];

		//所有长度测量对象集合
		this._disCollection = [];

		//当前面积测量对象
		this._areaMeasure = null;

		//面积测量对象集合
		this._areaCollection = [];

		//当前高度测量对象
		this._heightMeasure = null;

		//高度测量对象集合
		this._heiCollection = [];

		this.mouseMovePickPosition = new OneMap.Cartesian3();

        // 初始化处理器
		this.initialiseHandlers();

	}

  // 初始化处理器
  initialiseHandlers(){

		let handler = this.handler;

		let scope = this;

    handler.setInputAction( onLeftClick, OneMap.ScreenSpaceEventType.LEFT_CLICK );

		handler.setInputAction( onMouseMove, OneMap.ScreenSpaceEventType.MOUSE_MOVE );

		handler.setInputAction( onRightClick, OneMap.ScreenSpaceEventType.RIGHT_CLICK );

		function onLeftClick(movement){

			if(!OneMap.defined(scope._distanceMeasure) && !OneMap.defined(scope._areaMeasure) && !OneMap.defined(scope._heightMeasure)){
				return;
			}

			let disPosition = new OneMap.Cartesian3();

			scope.mouseMovePickPosition.clone(disPosition);

			let distance = 0;

			let disPositionLength = scope._disPosition.length;

			if(disPositionLength > 0){
				distance = OneMap.Cartesian3.distance(scope._disPosition[disPositionLength - 1], disPosition)
			}

			if(OneMap.defined(scope._distanceMeasure)){
				if(scope._distanceMeasure.enabled){

					scope._disPosition.push(disPosition);

					if (disPositionLength > 1 && distance === 0) {
						return
					}
					scope._distanceMeasure.addPoint3D( scope.mouseMovePickPosition)
				}
			}

			if(OneMap.defined(scope._areaMeasure)){
				if(scope._areaMeasure.enabled){
					scope._areaMeasure.addPoint3D(scope.mouseMovePickPosition)
				}
			}

			if(OneMap.defined(scope._heightMeasure) && scope._heightMeasure.enabled){
				scope._heightMeasure.addPoint3D(scope.mouseMovePickPosition)
			}

		}

		function onMouseMove(movement){

			if(OneMap.defined(scope._distanceMeasure) || OneMap.defined(scope._areaMeasure) || OneMap.defined(scope._heightMeasure)){

				let pickPosition = scope._scene.pickPosition(movement.endPosition);

				if(OneMap.defined(pickPosition)){
					scope.mouseMovePickPosition = pickPosition;
				}

				if(OneMap.defined(scope._distanceMeasure)){
					if(scope._distanceMeasure.enabled){
						scope._distanceMeasure.addPointTemp(scope.mouseMovePickPosition);
					}
				}

				if(OneMap.defined(scope._areaMeasure)) {
					if(scope._areaMeasure.enabled){
						scope._areaMeasure.addPointTemp(scope.mouseMovePickPosition)
					}
				}

				if(OneMap.defined(scope._heightMeasure)) {
					if(scope._heightMeasure.enabled){
						scope._heightMeasure.addPointTemp(scope.mouseMovePickPosition)
					}
				}

			}
		}

    function onRightClick(){
			if(OneMap.defined(scope._distanceMeasure)){
				distanceMeasureFinish()
			}
			if(OneMap.defined(scope._areaMeasure)){
				areaMeasureFinish()
			}
			if(OneMap.defined(scope._heightMeasure)){
				heightMeasureFinish()
			}
		}

		function distanceMeasureFinish() {

			if(!scope._distanceMeasure.enabled){
				return;
			}

			//结束时调用
			scope._distanceMeasure.finish();
			scope._disCollection.push(scope._distanceMeasure);

			//状态重置
			scope._distanceMeasure.enabled = false;
			scope._distanceMeasure = null;
			scope.drawDistanceMeasure = false;
			//scope._disPosition = []

		}

		function areaMeasureFinish() {
			if(!scope._areaMeasure.enabled){
				return;
			}
			scope._areaMeasure.finish();

			scope._areaCollection.push(scope._areaMeasure);
			scope._areaMeasure.enabled = false;

		}

		function heightMeasureFinish() {
			if(!scope._heightMeasure.enabled){
				return;
			}
			scope._heightMeasure.finish();

			scope._heiCollection.push(scope._heightMeasure);
			scope._heightMeasure.enabled = false;
		}
    
	}

	Distance(){
		this._distanceMeasure = new OneMap.DistanceMeasure(this._viewer);
		this._distanceMeasure.enabled = true;
		this._distanceMeasure.deleteBillboard.addLeftClickListener(function(object){
			this._scene.primitives.remove(object.ownerMeasure);
			removeObjectFromArr(this._disCollection, object.ownerMeasure);
			this._distanceMeasure = null;
		}.bind(this))
	}

	DistanceClear(){

		for (let i = 0; i < this._disCollection.length; i++) {
			this._scene.primitives.remove(this._disCollection[i]);
			this._disCollection[i] = null;
		}

		this._disCollection = [];
		this.drawDistanceMeasure = false;
		this.drawPolygonMeasure = false;
		this.drawHeightMeasure = false;

	}

	AreaMeasure(){
		this._areaMeasure = new OneMap.AreaMeasure(this._viewer);
		this._areaMeasure.polylineMaterial  = OneMap.Color.RED.withAlpha(0.5)
		this._areaMeasure.polylineWidth  = 5
		this._areaMeasure.enabled = true;
		this._areaMeasure.deleteBillboard.addLeftClickListener(function(object){
			this._scene.primitives.remove(object.ownerMeasure);
			removeObjectFromArr(this._areaCollection, object.ownerMeasure);
			this._areaMeasure = null;
		}.bind(this))
	}

	AreaMeasureClear(){

		for (let i = 0; i < this._areaCollection.length; i++) {
			this._scene.primitives.remove(this._areaCollection[i]);
			this._areaCollection[i] = null;
		}

		this._areaCollection = [];
		this.drawDistanceMeasure = false;
		this.drawPolygonMeasure = false;
		this.drawHeightMeasure = false
	}

	HeightMeasure(){
		this._heightMeasure = new OneMap.HeightMeasure(this._viewer);
		this._heightMeasure.enabled = true;
		this._heightMeasure._deleteBillboard.addLeftClickListener(function(object){
			this._scene.primitives.remove(object.ownerMeasure);
			removeObjectFromArr(this._heiCollection, object.ownerMeasure);
			this._heightMeasure = null;
		}.bind(this))
	}

	HeightMeasureClear(){

		for (let i = 0; i < this._heiCollection.length; i++) {
			this._scene.primitives.remove(this._heiCollection[i]);
			this._heiCollection[i] = null;
		}

		this._heiCollection = [];

		this.drawDistanceMeasure = false;
		this.drawPolygonMeasure = false;
		this.drawHeightMeasure = false
	}

	get canvas(){
		return this._canvas;
	}

	get handler(){
		return this._handler
	}

	get scene(){
		return this._scene;
	}

	get heiCollection(){
		return this._heiCollection;
	}

	get areaCollection(){
		return this._areaCollection
	}

	get disCollection(){
		return this._disCollection
	}
}

function removeObjectFromArr(array, object) {
	array.filter(function(e, index){
		if(e === object){
      array.splice(index, 1);
    }
  });
}