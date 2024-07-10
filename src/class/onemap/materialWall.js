
export default class materialWall{

  constructor(){
    this.initMaterialWall()
  }

  // 初始化墙体材质
  initMaterialWall(){
    // 初始化动态墙材质
    this.handleInitDynamicWallMaterial()
    // 初始化流体墙材质
    this.handleInitFluidicWallMaterial()
    // 初始化泛光墙材质
    this.handleInitFloodlightWallMaterial()
  }

  // 动态墙材质
  handleInitDynamicWallMaterial(){
    function PolylineTrailLinkMaterialProperty(options) {
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color;
      this.duration = options.duration;
      this.trailImage = options.trailImage;
      this._time = (new Date()).getTime();
    }
    Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
      isConstant: {
        get: function () {
          return false;
        }
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged;
        }
      },
      color: OneMap.createPropertyDescriptor('color')
    });
    PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
      return 'PolylineTrailLink';
    };
    PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
      if (!OneMap.defined(result)) { result = {};  }
      result.color = OneMap.Property.getValueOrClonedDefault(this._color, time, OneMap.Color.WHITE, result.color);
      if(this.trailImage){
        result.image = this.trailImage ;
      }else {
        result.image=OneMap.Material.PolylineTrailLinkImage
      }

      if(this.duration){
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
      }
      window.$viewer.scene.requestRender();
      return result;
    };
    PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
      return this === other || (other instanceof PolylineTrailLinkMaterialProperty && OneMap.Property.equals(this._color, other._color))
    };
    OneMap.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;

    OneMap.Material.PolylineTrailLinkType = 'PolylineTrailLink';
    OneMap.Material.PolylineTrailLinkImage = require('@/assets/material/walldynamic.png');
    OneMap.Material.PolylineTrailLinkSource =
      `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));
        vec4 fragColor;
        fragColor.rgb = color.rgb / 1.0;
        fragColor = czm_gammaCorrect(fragColor);
        material.alpha = colorImage.a * color.a;
        material.diffuse = color.rgb;
        material.emission = fragColor.rgb;
        return material;
      }
    `;

    OneMap.Material._materialCache.addMaterial(OneMap.Material.PolylineTrailLinkType, {
      fabric: {
        type: OneMap.Material.PolylineTrailLinkType,
        uniforms: {
          color: new OneMap.Color(1.0, 1.0, 1.0, 1),
          image: OneMap.Material.PolylineTrailLinkImage,
          time: 0
        },
        source: OneMap.Material.PolylineTrailLinkSource
      },
      translucent: function (material) {
        return true;
      }
    });
  }

  // 流体墙材质
  handleInitFluidicWallMaterial(){
    function TrailLineMaterialProperty(options) {
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._colorSubscription = undefined;
      this.color = options.color;
      this.duration = options.duration;
      this._time = (new Date()).getTime();
    }

    Object.defineProperties(TrailLineMaterialProperty.prototype, {
      isConstant: {
        get: function() {
          return false;
        }
      },
      definitionChanged: {
        get: function() {
          return this._definitionChanged;
        }
      },
      color: OneMap.createPropertyDescriptor('color')
    });
    TrailLineMaterialProperty.prototype.getType = function(time) {
      return 'TrailLine';
    };
    TrailLineMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrClonedDefault(this._color, time, OneMap.Color.WHITE, result.color);
      if (this.duration) {
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
      }
      window.$viewer.scene.requestRender();
      return result;
    };
    TrailLineMaterialProperty.prototype.equals = function(other) {
      return this === other || (other instanceof TrailLineMaterialProperty && OneMap.Property.equals(this._color, other._color))
    };
    OneMap.TrailLineMaterialProperty = TrailLineMaterialProperty;

    OneMap.Material.TrailLineType = 'TrailLine';
    OneMap.Material.TrailLineImage = require('@/assets/material/walldynamic.png');
    OneMap.Material.TrailLineSource =
      `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
        material.alpha = colorImage.a * color.a;
        material.diffuse = (colorImage.rgb+color.rgb)/2.0;
        return material;
      }
    `;
    OneMap.Material._materialCache.addMaterial(OneMap.Material.TrailLineType, {
      fabric: {
        type: OneMap.Material.TrailLineType,
        uniforms: {
          color: new OneMap.Color(1.0, 1.0, 1.0, 1),
          image: OneMap.Material.TrailLineImage,
          time: 0
        },
        source: OneMap.Material.TrailLineSource
      },
      translucent: function(material) {
        return true;
      }
    });
  }

  // 泛光墙材质
  handleInitFloodlightWallMaterial(){
    function WallDiffuseMaterialProperty(options) {
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this.color = options.color;
    }

    Object.defineProperties(WallDiffuseMaterialProperty.prototype, {
      isConstant: {
        get: function() {
          return false;
        }
      },
      definitionChanged: {
        get: function() {
          return this._definitionChanged;
        }
      },
      color: OneMap.createPropertyDescriptor('color')
    });
    WallDiffuseMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.WallDiffuseMaterialType;
    };
    WallDiffuseMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      return result
    };
    WallDiffuseMaterialProperty.prototype.equals = function(other) {
      return (this === other || (other instanceof WallDiffuseMaterialProperty && OneMap.Property.equals(this._color, other._color)) )
    };

    OneMap.WallDiffuseMaterialProperty = WallDiffuseMaterialProperty;

    OneMap.Material.WallDiffuseMaterialProperty = 'WallDiffuseMaterialProperty';
    OneMap.Material.WallDiffuseMaterialType = 'WallDiffuseMaterialType';
    OneMap.Material.WallDiffuseMaterialSource =
      `
      uniform vec4 color;
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        material.diffuse = color.rgb * 2.0;
        material.alpha = color.a * (1.0 - fract(st.t)) * 0.8;
        return material;
      }                                           
    `

    OneMap.Material._materialCache.addMaterial(OneMap.Material.WallDiffuseMaterialType, {
      fabric: {
        type: OneMap.Material.WallDiffuseMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
        },
        source: OneMap.Material.WallDiffuseMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }
}
