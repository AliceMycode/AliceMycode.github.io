import { glsl } from './glsl'
/**
 * @param {OneMap.Viewer} viewer Cesium三维视窗。
 * @param {Object} options 选项。
 * @param {OneMap.Cartesian3} options.viewPosition 观测点位置。
 * @param {OneMap.Cartesian3} options.viewPositionEnd 最远观测点位置（如果设置了观测距离，这个属性可以不设置）。
 * @param {Number} options.viewDistance 观测距离（单位`米`，默认值100）。
 * @param {Number} options.viewHeading 航向角（单位`度`，默认值0）。
 * @param {Number} options.viewPitch 俯仰角（单位`度`，默认值0）。
 * @param {Number} options.horizontalViewAngle 可视域水平夹角（单位`度`，默认值90）。
 * @param {Number} options.verticalViewAngle 可视域垂直夹角（单位`度`，默认值60）。
 * @param {OneMap.Color} options.visibleAreaColor 可视区域颜色（默认值`绿色`）。
 * @param {OneMap.Color} options.invisibleAreaColor 不可视区域颜色（默认值`红色`）。
 * @param {Boolean} options.enabled 阴影贴图是否可用。
 * @param {Boolean} options.softShadows 是否启用柔和阴影。
 * @param {Boolean} options.size 每个阴影贴图的大小。.
 */
export default class viewShedStage_copy {

  constructor(options) {
    this.viewer = window.$viewer;
    this.viewPosition = { x: -2449042.326226947, y: 5350907.973081651, z: 2451570.9627716555 };
    this.viewPositionEnd = { x: -2449546.864524524, y: 5350267.556188464, z: 2452471.7946044635 };
    this.viewDistance = this.viewPositionEnd ? OneMap.Cartesian3.distance(this.viewPosition, this.viewPositionEnd) : (options.viewDistance || 100.0);
    this.viewHeading = this.viewPositionEnd ? this.getHeading(this.viewPosition, this.viewPositionEnd) : (options.viewHeading || 0.0);
    this.viewPitch = this.viewPositionEnd ? this.getPitch(this.viewPosition, this.viewPositionEnd) : (options.viewPitch || 0.0);
    this.horizontalViewAngle = options.horizontalViewAngle || 90.0;
    this.verticalViewAngle = options.verticalViewAngle || 60.0;
    this.visibleAreaColor = options.visibleAreaColor || OneMap.Color.GREEN;
    this.invisibleAreaColor = options.invisibleAreaColor || OneMap.Color.RED;
    this.enabled = (typeof options.enabled === "boolean") ? options.enabled : true;
    this.softShadows = (typeof options.softShadows === "boolean") ? options.softShadows : true;
    this.size = options.size || 2048;
    this.glsl = glsl
    this.init()
    this.update();
  }

  add() {
    this.createLightCamera();
    this.createShadowMap();
    this.createPostStage();
    this.drawFrustumOutline();
    this.drawSketch();
  }

  update() {
    this.clear();
    // this.add();
  }

  clear() {
    if (this.sketch) {
      this.viewer.entities.removeById(this.sketch.id);
      this.sketch = null;
    }
    if (this.frustumOutline) {
      this.frustumOutline.destroy();
      this.frustumOutline = null;
    }
    if (this.postStage) {
      this.viewer.scene.postProcessStages.remove(this.postStage);
      this.postStage = null;
    }
  }
  //创建相机
  createLightCamera() {
    this.lightCamera = new OneMap.Camera(this.viewer.scene);
    this.lightCamera.position = this.viewPosition;
    // if (this.viewPositionEnd) {
    //     let direction = OneMap.Cartesian3.normalize(OneMap.Cartesian3.subtract(this.viewPositionEnd, this.viewPosition, new OneMap.Cartesian3()), new OneMap.Cartesian3());
    //     this.lightCamera.direction = direction; // direction是相机面向的方向
    // }
    this.lightCamera.frustum.near = this.viewDistance * 0.001;
    this.lightCamera.frustum.far = this.viewDistance;
    const hr = OneMap.Math.toRadians(this.horizontalViewAngle);
    const vr = OneMap.Math.toRadians(this.verticalViewAngle);
    const aspectRatio =
      (this.viewDistance * Math.tan(hr / 2) * 2) /
      (this.viewDistance * Math.tan(vr / 2) * 2);
    this.lightCamera.frustum.aspectRatio = aspectRatio;
    if (hr > vr) {
      this.lightCamera.frustum.fov = hr;
    } else {
      this.lightCamera.frustum.fov = vr;
    }
    this.lightCamera.setView({
      destination: this.viewPosition,
      orientation: {
        heading: OneMap.Math.toRadians(this.viewHeading || 0),
        pitch: OneMap.Math.toRadians(this.viewPitch || 0),
        roll: 0
      }
    });
  }
  //创建阴影贴图
  createShadowMap() {
    this.shadowMap = new OneMap.ShadowMap({
      context: (this.viewer.scene).context,
      lightCamera: this.lightCamera,
      enabled: this.enabled,
      isPointLight: true,
      pointLightRadius: this.viewDistance,
      cascadesEnabled: false,
      size: this.size,
      softShadows: this.softShadows,
      normalOffset: false,
      fromLightSource: false
    });
    this.viewer.scene.shadowMap = this.shadowMap;
  }
  //创建PostStage
  createPostStage() {
    const fs = this.glsl
    const postStage = new OneMap.PostProcessStage({
      fragmentShader: fs,
      uniforms: {
        shadowMap_textureCube: () => {
          this.shadowMap.update(Reflect.get(this.viewer.scene, "_frameState"));
          return Reflect.get(this.shadowMap, "_shadowMapTexture");
        },
        shadowMap_matrix: () => {
          this.shadowMap.update(Reflect.get(this.viewer.scene, "_frameState"));
          return Reflect.get(this.shadowMap, "_shadowMapMatrix");
        },
        shadowMap_lightPositionEC: () => {
          this.shadowMap.update(Reflect.get(this.viewer.scene, "_frameState"));
          return Reflect.get(this.shadowMap, "_lightPositionEC");
        },
        shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: () => {
          this.shadowMap.update(Reflect.get(this.viewer.scene, "_frameState"));
          const bias = this.shadowMap._pointBias;
          return OneMap.Cartesian4.fromElements(
            bias.normalOffsetScale,
            this.shadowMap._distance,
            this.shadowMap.maximumDistance,
            0.0,
            new OneMap.Cartesian4()
          );
        },
        shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: () => {
          this.shadowMap.update(Reflect.get(this.viewer.scene, "_frameState"));
          const bias = this.shadowMap._pointBias;
          const scratchTexelStepSize = new OneMap.Cartesian2();
          const texelStepSize = scratchTexelStepSize;
          texelStepSize.x = 1.0 / this.shadowMap._textureSize.x;
          texelStepSize.y = 1.0 / this.shadowMap._textureSize.y;

          return OneMap.Cartesian4.fromElements(
            texelStepSize.x,
            texelStepSize.y,
            bias.depthBias,
            bias.normalShadingSmooth,
            new OneMap.Cartesian4()
          );
        },
        camera_projection_matrix: this.lightCamera.frustum.projectionMatrix,
        camera_view_matrix: this.lightCamera.viewMatrix,
        helsing_viewDistance: () => {
          return this.viewDistance;
        },
        helsing_visibleAreaColor: this.visibleAreaColor,
        helsing_invisibleAreaColor: this.invisibleAreaColor,
      }
    });
    this.postStage = this.viewer.scene.postProcessStages.add(postStage);
  }
  // 创建视锥线
  drawFrustumOutline() {
    const scratchRight = new OneMap.Cartesian3();
    const scratchRotation = new OneMap.Matrix3();
    const scratchOrientation = new OneMap.Quaternion();
    const position = this.lightCamera.positionWC;
    const direction = this.lightCamera.directionWC;
    const up = this.lightCamera.upWC;
    let right = this.lightCamera.rightWC;
    right = OneMap.Cartesian3.negate(right, scratchRight);
    let rotation = scratchRotation;
    OneMap.Matrix3.setColumn(rotation, 0, right, rotation);
    OneMap.Matrix3.setColumn(rotation, 1, up, rotation);
    OneMap.Matrix3.setColumn(rotation, 2, direction, rotation);
    let orientation = OneMap.Quaternion.fromRotationMatrix(rotation, scratchOrientation);

    let instance = new OneMap.GeometryInstance({
      geometry: new OneMap.FrustumOutlineGeometry({
        frustum: this.lightCamera.frustum,
        origin: this.viewPosition,
        orientation: orientation
      }),
      id: Math.random().toString(36).substr(2),
      attributes: {
        color: OneMap.ColorGeometryInstanceAttribute.fromColor(
          OneMap.Color.AQUA//new OneMap.Color(0.0, 1.0, 0.0, 1.0)
        ),
        show: new OneMap.ShowGeometryInstanceAttribute(true)
      }
    });

    this.frustumOutline = this.viewer.scene.primitives.add(
      new OneMap.Primitive({
        geometryInstances: [instance],
        appearance: new OneMap.PerInstanceColorAppearance({
          flat: true,
          translucent: false
        })
      })
    );
  }
  //创建视网
  drawSketch() {
    this.sketch = this.viewer.entities.add({
      name: 'sketch',
      position: this.viewPosition,
      orientation: OneMap.Transforms.headingPitchRollQuaternion(
        this.viewPosition,
        OneMap.HeadingPitchRoll.fromDegrees(this.viewHeading - this.horizontalViewAngle, this.viewPitch, 0.0)
      ),
      ellipsoid: {
        radii: new OneMap.Cartesian3(
          this.viewDistance,
          this.viewDistance,
          this.viewDistance
        ),
        // innerRadii: new OneMap.Cartesian3(2.0, 2.0, 2.0),
        minimumClock: OneMap.Math.toRadians(-this.horizontalViewAngle / 2),
        maximumClock: OneMap.Math.toRadians(this.horizontalViewAngle / 2),
        minimumCone: OneMap.Math.toRadians(this.verticalViewAngle + 7.75),
        maximumCone: OneMap.Math.toRadians(180 - this.verticalViewAngle - 7.75),
        fill: false,
        outline: true,
        subdivisions: 256,
        stackPartitions: 64,
        slicePartitions: 64,
        outlineColor: OneMap.Color.AQUA
      }
    });
  }
  init() {
    //初始化事件句柄
    this.handler = new OneMap.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    //设置鼠标样式
    this.viewer._element.style.cursor = 'crosshair'
    // this.handleToolTip()
    this.handleLeftClick()
    this.handleRightClick()
    this.handleMouseMove()
  }
  handleLeftClick() {
    this.handler.setInputAction((event) => {

      let position = this.viewer.scene.pickPosition(event.position);
      //解决需要两次左键点击地图才能选点的问题
      if (!position) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        position = this.viewer.scene.camera.pickEllipsoid(event.position, ellipsoid);
      }
      if (!position) return;
      this.viewPosition = position

    }, OneMap.ScreenSpaceEventType.LEFT_CLICK);
  }
  handleRightClick() {
    this.handler.setInputAction((movement) => {
      let clickPosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(movement.position), this.viewer.scene);
      this.viewPositionEnd = clickPosition

      this.add()
      //关闭事件句柄
      this.handler.destroy();
      this.handler = null;
      //设置鼠标默认样式
      this.viewer._element.style.cursor = 'default';

    }, OneMap.ScreenSpaceEventType.RIGHT_CLICK);
  }
  handleMouseMove() {
    this.handler.setInputAction((movement) => {
      const newPosition = this.viewer.scene.pickPosition(movement.endPosition);
      if (OneMap.defined(newPosition)) {
      }
    }, OneMap.ScreenSpaceEventType.MOUSE_MOVE);
  }
  //获取偏航角和俯仰角
  getHeading(fromPosition, toPosition) {
    let finalPosition = new OneMap.Cartesian3();
    let matrix4 = OneMap.Transforms.eastNorthUpToFixedFrame(fromPosition);
    OneMap.Matrix4.inverse(matrix4, matrix4);
    OneMap.Matrix4.multiplyByPoint(matrix4, toPosition, finalPosition);
    OneMap.Cartesian3.normalize(finalPosition, finalPosition);
    return OneMap.Math.toDegrees(Math.atan2(finalPosition.x, finalPosition.y));
  }

  getPitch(fromPosition, toPosition) {
    let finalPosition = new OneMap.Cartesian3();
    let matrix4 = OneMap.Transforms.eastNorthUpToFixedFrame(fromPosition);
    OneMap.Matrix4.inverse(matrix4, matrix4);
    OneMap.Matrix4.multiplyByPoint(matrix4, toPosition, finalPosition);
    OneMap.Cartesian3.normalize(finalPosition, finalPosition);
    return OneMap.Math.toDegrees(Math.asin(finalPosition.z));
  }


}
