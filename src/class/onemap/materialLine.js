export default class materialLine {

  constructor(){
    this.initMaterialLine()
  }

  // 初始化线型材质
  initMaterialLine(){
    // 初始化道路穿梭线材质
    this.handleInitLineShuttle()
    // 初始化道路闪光线材质
    this.handleInitLineFlash()
    // 初始化竖直飞升线材质
    this.handleInitLineVerticalFly()
  }

  // 道路穿梭线材质
  handleInitLineShuttle (){
    function Spriteline1MaterialProperty(duration, image) {
      this._definitionChanged = new OneMap.Event()
      this.duration = duration
      this.image = image
      this._time = performance.now()
    }

    Object.defineProperties(Spriteline1MaterialProperty.prototype, {
      isConstant: {
        get: function() {
          return false
        },
      },
      definitionChanged: {
        get: function() {
          return this._definitionChanged
        },
      },
      color: OneMap.createPropertyDescriptor('color'),
      duration: OneMap.createPropertyDescriptor('duration')
    })

    Spriteline1MaterialProperty.prototype.getType = function(time) {
      return 'Spriteline1'
    }
    Spriteline1MaterialProperty.prototype.getValue = function( time, result ) {
      if (!OneMap.defined(result)) { result = {} }
      result.image = this.image
      result.time = ((performance.now() - this._time) % this.duration) / this.duration
      return result
    }
    Spriteline1MaterialProperty.prototype.equals = function(e) {
      return (
        this === e ||
        (
          e instanceof Spriteline1MaterialProperty 
          && this.duration === e.duration
        )
      )
    }
    OneMap.Spriteline1MaterialProperty = Spriteline1MaterialProperty
    OneMap.Material.Spriteline1Type = 'Spriteline1'
    OneMap.Material.Spriteline1Source = `
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
        material.alpha = colorImage.a;
        material.diffuse = colorImage.rgb * 1.5 ;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.Spriteline1Type, {
      fabric: {
        type: OneMap.Material.Spriteline1Type,
        uniforms: {
          color: new OneMap.Color(1, 0, 0, 0.5),
          image: '',
          transparent: true,
          time: 20,
        },
        source: OneMap.Material.Spriteline1Source,
      },
      translucent: function(material) {
        return true
      },
    })
  }

  // 道路闪光线材质
  handleInitLineFlash(){
    function LineFlickerMaterialProperty(options) {
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }

    Object.defineProperties(LineFlickerMaterialProperty.prototype, {
      isConstant: {
        get: function() {
          return false
        },
      },
      definitionChanged: {
        get: function() {
          return this._definitionChanged
        },
      },
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed'),
    })

    LineFlickerMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.LineFlickerMaterialType;
    }
    LineFlickerMaterialProperty.prototype.getValue = function( time, result ) {
      if (!OneMap.defined(result)) { result = {} }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 5.0, result.speed);
      return result
    }
    LineFlickerMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof LineFlickerMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    }

    OneMap.LineFlickerMaterialProperty = LineFlickerMaterialProperty;
    OneMap.Material.LineFlickerMaterialProperty = 'LineFlickerMaterialProperty';
    OneMap.Material.LineFlickerMaterialType = 'LineFlickerMaterialType';
    OneMap.Material.LineFlickerMaterialSource = `
      uniform vec4 color;
      uniform float speed;
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        float time = fract( czm_frameNumber  *  speed / 1000.0);
        vec2 st = materialInput.st;
        float scalar = smoothstep(0.0,1.0,time);
        material.diffuse = color.rgb * scalar;
        material.alpha = color.a * scalar ;
        return material;
      }
    `

    OneMap.Material._materialCache.addMaterial(OneMap.Material.LineFlickerMaterialType, {
      fabric: {
        type: OneMap.Material.LineFlickerMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 5.0,
        },
        source: OneMap.Material.LineFlickerMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 竖直飞升线材质
  handleInitLineVerticalFly(){
    function LineFlowMaterialProperty(options) {
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this._percent = undefined;
      this._gradient = undefined;
      this.color = options.color;
      this.speed = options.speed;
      this.percent = options.percent;
      this.gradient = options.gradient;
    }

    Object.defineProperties(LineFlowMaterialProperty.prototype, {
      isConstant: {
        get: function() {
          return false
        },
      },
      definitionChanged: {
        get: function() {
          return this._definitionChanged
        },
      },
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed'),
      percent: OneMap.createPropertyDescriptor('percent'),
      gradient: OneMap.createPropertyDescriptor('gradient'),
    })
    LineFlowMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.LineFlowMaterialType;
    }
    LineFlowMaterialProperty.prototype.getValue = function( time, result ) {
      if (!OneMap.defined(result)) { result = {} }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 5.0, result.speed);
      result.percent = OneMap.Property.getValueOrDefault(this._percent, time, 0.1, result.percent);
      result.gradient = OneMap.Property.getValueOrDefault(this._gradient, time, 0.01, result.gradient);
      return result
    }
    LineFlowMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof LineFlowMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed) &&
          OneMap.Property.equals(this._percent, other._percent) &&
          OneMap.Property.equals(this._gradient, other._gradient)
        )
      )
    }
    
    OneMap.LineFlowMaterialProperty = LineFlowMaterialProperty;
    OneMap.Material.LineFlowMaterialProperty = 'LineFlowMaterialProperty';
    OneMap.Material.LineFlowMaterialType = 'LineFlowMaterialType';
    OneMap.Material.LineFlowMaterialSource = `
      uniform vec4 color;
      uniform float speed;
      uniform float percent;
      uniform float gradient;
      
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        float t =fract(czm_frameNumber * speed / 1000.0);
        t *= (1.0 + percent);
        float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);
        alpha += gradient;
        material.diffuse = color.rgb;
        material.alpha = alpha;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.LineFlowMaterialType, {
      fabric: {
        type: OneMap.Material.LineFlowMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0,
          percent: 0.1,
          gradient: 0.01
        },
        source: OneMap.Material.LineFlowMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }
}