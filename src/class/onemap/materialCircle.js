export default class materialCircle {

  constructor () {
    // 初始化圆材质
    this.InitCircleMaterial()
  }

  // 初始化圆材质
  InitCircleMaterial(){
    // 初始化扫描圆材质
    this.handleInitScanCircleMaterial()
    // 初始化波纹圆材质
    this.handleInitRippleCircleMaterial()
    // 初始化扩散圆材质
    this.handleInitDiffuseCircleMaterial()
    // 初始化雷达扫描圆材质
    this.handleInitRadarScanCircleMaterial()
    // 初始化雷达线材质
    this.handleInitRadarLineCircleMaterial()
    // 初始化波纹雷达材质
    this.handleInitRadarWaveCircleMaterial()
    //初始化消影圆材质
    this.handleInitFadeCircleMaterial()
    // 初始化脉冲圆材质
    this.handleInitPulseCircleMaterial()
    // 初始化模糊圆材质
    this.handleInitBlurCircleMaterial()
    // 初始化螺旋圆材质
    this.handleInitSpiralCircleMaterial()
    
    
    
  }

  // 初始化扫描园材质
  handleInitScanCircleMaterial(){
    function CircleScanMaterialProperty (options) {  
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CircleScanMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleScanMaterialType;
    };
    CircleScanMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CircleScanMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleScanMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CircleScanMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CircleScanMaterialProperty = CircleScanMaterialProperty;
    OneMap.Material.CircleScanMaterialProperty = 'CircleScanMaterialProperty';
    OneMap.Material.CircleScanMaterialType = 'CircleScanMaterialType';
    OneMap.Material.CircleScanMaterialSource =`
      uniform vec4 color;
      uniform float speed;
      float circle(vec2 uv, float r, float blur) {
        float d = length(uv) * 2.0;
        float c = smoothstep(r+blur, r, d);
        return c;
      }
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st - .5;
        material.diffuse = color.rgb;
        material.emission = vec3(0);
        float t =fract(czm_frameNumber * speed / 1000.0);
        float s = 0.3;
        float radius1 = smoothstep(.0, s, t) * 0.5;
        float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);
        float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);
        float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;
        float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);
        material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);
        material.alpha *= color.a;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleScanMaterialType, {
      fabric: {
        type: OneMap.Material.CircleScanMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CircleScanMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化波纹圆材质
  handleInitRippleCircleMaterial(){
    function CircleRippleMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
      this.count = options.count;
      this.gradient = options.gradient;
    }
    CircleRippleMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleRippleMaterialType;
    };
    CircleRippleMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      result.count = this.count;
      result.gradient = this.gradient;
      return result
    };
    CircleRippleMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleRippleMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed) &&
          OneMap.Property.equals(this.count, other.count) &&
          OneMap.Property.equals(this.gradient, other.gradient)
        )
      )
    };
    Object.defineProperties(CircleRippleMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed'),
      count: OneMap.createPropertyDescriptor('count'),
      gradient: OneMap.createPropertyDescriptor('gradient')
    });
    
    OneMap.CircleRippleMaterialProperty = CircleRippleMaterialProperty;
    OneMap.Material.CircleRippleMaterialProperty = 'CircleRippleMaterialProperty';
    OneMap.Material.CircleRippleMaterialType = 'CircleRippleMaterialType';
    OneMap.Material.CircleRippleMaterialSource = `
      uniform vec4 color;
      uniform float speed;
      uniform float count;
      uniform float gradient;
      czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        material.diffuse = 1.5 * color.rgb;
        vec2 st = materialInput.st;
        float dis = distance(st, vec2(0.5, 0.5));
        float per = fract(czm_frameNumber * speed / 1000.0);
        if(count == 1.0){
          if(dis > per * 0.5){ 
            discard;
          } 
          else { 
            material.alpha = color.a  * dis / per / 2.0; 
          }
        } else {
          vec3 str = materialInput.str;
          if(abs(str.z)  > 0.001) { 
            discard; 
          }
          if(dis > 0.5){ 
            discard; 
          } else {
            float perDis = 0.5 / count;
            float disNum;
            float bl = 0.0;
            for(int i = 0; i <= 999; i++){
              if(float(i) <= count){
                disNum = perDis * float(i) - dis + per / count;
                if(disNum > 0.0){
                  if(disNum < perDis){
                    bl = 1.0 - disNum / perDis;
                  }
                  else if(disNum - perDis < perDis){
                    bl = 1.0 - abs(1.0 - disNum / perDis);
                  }
                  material.alpha = pow(bl,(1.0 + 10.0 * (1.0 - gradient)));
                }
              }
            }
          }
        }
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleRippleMaterialType, {
      fabric: {
        type: OneMap.Material.CircleRippleMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 3.0,
          count: 4,
          gradient: 0.2
        },
        source: OneMap.Material.CircleRippleMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化扩散圆材质
  handleInitDiffuseCircleMaterial(){
    function CircleDiffuseMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CircleDiffuseMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleDiffuseMaterialType;
    };
    CircleDiffuseMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CircleDiffuseMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleDiffuseMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CircleDiffuseMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CircleDiffuseMaterialProperty = CircleDiffuseMaterialProperty;
    OneMap.Material.CircleDiffuseMaterialProperty = 'CircleDiffuseMaterialProperty';
    OneMap.Material.CircleDiffuseMaterialType = 'CircleDiffuseMaterialType';
    OneMap.Material.CircleDiffuseMaterialSource = `
      uniform vec4 color;
      uniform float speed;
      vec3 circlePing(float r, float innerTail,  float frontierBorder, float timeResetSeconds,  float radarPingSpeed,  float fadeDistance){
        float t = fract(czm_frameNumber * speed / 1000.0);
        float time = mod(t, timeResetSeconds) * radarPingSpeed;
        float circle;
        circle += smoothstep(time - innerTail, time, r) * smoothstep(time + frontierBorder,time, r);
        circle *= smoothstep(fadeDistance, 0.0, r);
        return vec3(circle);
      }
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st * 2.0  - 1.0 ;
        vec2 center = vec2(0.);
        float time = fract(czm_frameNumber * speed / 1000.0);
        vec3 flagColor;
        float r = length(st - center) / 4.;
        flagColor += circlePing(r, 0.25, 0.025, 4.0, 0.3, 1.0) * color.rgb;
        material.alpha = length(flagColor);
        material.diffuse = flagColor.rgb;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleDiffuseMaterialType, {
      fabric: {
        type: OneMap.Material.CircleDiffuseMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CircleDiffuseMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化消影圆材质
  handleInitFadeCircleMaterial(){
    function CircleFadeMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CircleFadeMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleFadeMaterialType;
    };
    CircleFadeMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CircleFadeMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleFadeMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CircleFadeMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CircleFadeMaterialProperty = CircleFadeMaterialProperty;
    OneMap.Material.CircleFadeMaterialProperty = 'CircleFadeMaterialProperty';
    OneMap.Material.CircleFadeMaterialType = 'CircleFadeMaterialType';
    OneMap.Material.CircleFadeMaterialSource = 
    `
      uniform vec4 color;
      uniform float speed;
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        material.diffuse = 1.5 * color.rgb;
        vec2 st = materialInput.st;
        float dis = distance(st, vec2(0.5, 0.5));
        float per = fract(czm_frameNumber * speed / 1000.0);
        if(dis > per * 0.5){
          material.alpha = color.a;
        }else {
          discard;
        }
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleFadeMaterialType, {
      fabric: {
        type: OneMap.Material.CircleFadeMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CircleFadeMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化脉冲圆材质
  handleInitPulseCircleMaterial(){
    function CirclePulseMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CirclePulseMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CirclePulseMaterialType;
    };
    CirclePulseMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CirclePulseMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CirclePulseMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CirclePulseMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CirclePulseMaterialProperty = CirclePulseMaterialProperty;
    OneMap.Material.CirclePulseMaterialProperty = 'CirclePulseMaterialProperty';
    OneMap.Material.CirclePulseMaterialType = 'CirclePulseMaterialType';
    OneMap.Material.CirclePulseMaterialSource  = 
    `
      uniform vec4 color;
      uniform float speed;
      czm_material czm_getMaterial(czm_materialInput materialInput) {
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st * 2.0 - 1.0;
        float time = fract(czm_frameNumber * speed / 1000.0);
        float r = length(st) * 1.2;
        float a = pow(r, 2.0);
        float b = sin(r * 0.8 - 1.6);
        float c = sin(r - 0.010);
        float s = sin(a - time * 2.0 + b) * c;
        float d = abs(1.0 / (s * 10.8)) - 0.01;
        material.alpha = pow(d, 10.0);
        material.diffuse = color.rgb * d;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CirclePulseMaterialType, {
      fabric: {
        type: OneMap.Material.CirclePulseMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CirclePulseMaterialSource 
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  //  初始化模糊圆材质
  handleInitBlurCircleMaterial(){
    function CircleBlurMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CircleBlurMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleBlurMaterialType;
    };
    CircleBlurMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CircleBlurMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleBlurMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CircleBlurMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CircleBlurMaterialProperty = CircleBlurMaterialProperty;
    OneMap.Material.CircleBlurMaterialProperty = 'CircleBlurMaterialProperty';
    OneMap.Material.CircleBlurMaterialType = 'CircleBlurMaterialType';
    OneMap.Material.CircleBlurMaterialSource = 
    `
      uniform vec4 color;
      uniform float speed;
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st ;
        vec2 center = vec2(0.5);
        float time = fract(czm_frameNumber * speed / 1000.0);
        float r = 0.5 + sin(time) / 3.0;
        float dis = distance(st, center);
        float a = 0.0;
        if(dis < r) {
          a = 1.0 - smoothstep(0.0, r, dis);
        }
        material.alpha = pow(a,10.0) ;
        material.diffuse = color.rgb * a * 3.0;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleBlurMaterialType, {
      fabric: {
        type: OneMap.Material.CircleBlurMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CircleBlurMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化螺旋圆材质
  handleInitSpiralCircleMaterial(){
    function CircleSpiralMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    CircleSpiralMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.CircleSpiralMaterialType;
    };
    CircleSpiralMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    CircleSpiralMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof CircleSpiralMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(CircleSpiralMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.CircleSpiralMaterialProperty = CircleSpiralMaterialProperty;
    OneMap.Material.CircleSpiralMaterialProperty = 'CircleSpiralMaterialProperty';
    OneMap.Material.CircleSpiralMaterialType = 'CircleSpiralMaterialType';
    OneMap.Material.CircleSpiralMaterialSource = 
    `
      uniform vec4 color;
      uniform float speed;
      #define PI 3.14159265359
      vec2 rotate2D (vec2 _st, float _angle) {
        _st =  mat2(cos(_angle),-sin(_angle),  sin(_angle),cos(_angle)) * _st;
        return _st;
      }
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st * 2.0 - 1.0;
        st *= 1.6;
        float time = czm_frameNumber * speed / 1000.0;
        float r = length(st);
        float w = .3;
        st = rotate2D(st,(r*PI*6.-time*2.));
        float a = smoothstep(-w,.2,st.x) * smoothstep(w,.2,st.x);
        float b = abs(1./(sin(pow(r,2.)*2.-time*1.3)*6.))*.4;
        material.alpha = a * b ;
        material.diffuse = color.rgb * a * b  * 3.0;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.CircleSpiralMaterialType, {
      fabric: {
        type: OneMap.Material.CircleSpiralMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.CircleSpiralMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化雷达扫描材质
  handleInitRadarScanCircleMaterial(){
    function RadarScanMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    RadarScanMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.RadarScanMaterialType;
    };
    RadarScanMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    RadarScanMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof RadarScanMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(RadarScanMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.RadarScanMaterialProperty = RadarScanMaterialProperty;
    OneMap.Material.RadarScanMaterialProperty = 'RadarScanMaterialProperty';
    OneMap.Material.RadarScanMaterialType = 'RadarScanMaterialType';
    OneMap.Material.RadarScanMaterialSource =
    `
      uniform vec4 color;
      uniform float speed;
      #define PI 3.14159265359
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec2 scrPt = st * 2.0 - 1.0;
        float time = czm_frameNumber * speed / 1000.0 ;
        vec3 col = vec3(0.0);
        mat2 rot;
        float theta = -time * 1.0 * PI - 2.2;
        float cosTheta, sinTheta;
        cosTheta = cos(theta);
        sinTheta = sin(theta);
        rot[0][0] = cosTheta;
        rot[0][1] = -sinTheta;
        rot[1][0] = sinTheta;
        rot[1][1] = cosTheta;
        vec2 scrPtRot = rot * scrPt;
        float angle = 1.0 - (atan(scrPtRot.y, scrPtRot.x) / 6.2831 + 0.5);
        float falloff = length(scrPtRot);
        material.alpha = pow(length(col + vec3(.5)),5.0);
        material.diffuse =  (0.5 +  pow(angle, 2.0) * falloff ) *   color.rgb    ;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.RadarScanMaterialType, {
      fabric: {
        type: OneMap.Material.RadarScanMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.RadarScanMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化雷达线材质
  handleInitRadarLineCircleMaterial () {
    function RadarLineMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    RadarLineMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.RadarLineMaterialType;
    };
    RadarLineMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    RadarLineMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof RadarLineMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(RadarLineMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.RadarLineMaterialProperty = RadarLineMaterialProperty;
    OneMap.Material.RadarLineMaterialProperty = 'RadarLineMaterialProperty';
    OneMap.Material.RadarLineMaterialType = 'RadarLineMaterialType';
    OneMap.Material.RadarLineMaterialSource =
    `
      uniform vec4 color;
      uniform float speed;
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st * 2.0 - 1.0;
        float t = czm_frameNumber * speed / 1000.0 ;
        vec3 col = vec3(0.0);
        vec2 p = vec2(sin(t), cos(t));
        float d = length(st - dot(p, st) * p);
        if (dot(st, p) < 0.) {
          d = length(st);
        }
        col = .006 / d * color.rgb;
        if(distance(st,vec2(0)) >  0.99 ){
          col =color.rgb;
        }
        material.alpha  = pow(length(col),2.0);
        material.diffuse = col * 3.0 ;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.RadarLineMaterialType, {
      fabric: {
        type: OneMap.Material.RadarLineMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.RadarLineMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

  // 初始化波纹雷达材质
  handleInitRadarWaveCircleMaterial(){
    function RadarWaveMaterialProperty (options){
      this._definitionChanged = new OneMap.Event();
      this._color = undefined;
      this._speed = undefined;
      this.color = options.color;
      this.speed = options.speed;
    }
    RadarWaveMaterialProperty.prototype.getType = function(time) {
      return OneMap.Material.RadarWaveMaterialType;
    };
    RadarWaveMaterialProperty.prototype.getValue = function(time, result) {
      if (!OneMap.defined(result)) { result = {}; }
      result.color = OneMap.Property.getValueOrDefault(this._color, time, OneMap.Color.RED, result.color);
      result.speed = OneMap.Property.getValueOrDefault(this._speed, time, 10, result.speed);
      return result
    };
    RadarWaveMaterialProperty.prototype.equals = function(other) {
      return (
        this === other ||
        (
          other instanceof RadarWaveMaterialProperty &&
          OneMap.Property.equals(this._color, other._color) &&
          OneMap.Property.equals(this._speed, other._speed)
        )
      )
    };
    Object.defineProperties(RadarWaveMaterialProperty.prototype, {
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
      color: OneMap.createPropertyDescriptor('color'),
      speed: OneMap.createPropertyDescriptor('speed')
    });
    
    OneMap.RadarWaveMaterialProperty = RadarWaveMaterialProperty;
    OneMap.Material.RadarWaveMaterialProperty = 'RadarWaveMaterialProperty';
    OneMap.Material.RadarWaveMaterialType = 'RadarWaveMaterialType';
    OneMap.Material.RadarWaveMaterialSource =
    `
      uniform vec4 color;
      uniform float speed;
      #define PI 3.14159265359
      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
      czm_material czm_getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec2 pos = st - vec2(0.5);
        float time = czm_frameNumber * speed / 1000.0 ;
        float r = length(pos);
        float t = atan(pos.y, pos.x) - time * 2.5;
        float a = (atan(sin(t), cos(t)) + PI)/(2.0*PI);
        float ta = 0.5;
        float v = smoothstep(ta-0.05,ta+0.05,a) * smoothstep(ta+0.05,ta-0.05,a);
        vec3 flagColor = color.rgb * v;
        float blink = pow(sin(time*1.5)*0.5+0.5, 0.8);
        flagColor = color.rgb *  pow(a, 8.0*(.2+blink))*(sin(r*500.0)*.5+.5) ;
        flagColor = flagColor * pow(r, 0.4);
        material.alpha = length(flagColor) * 1.3;
        material.diffuse = flagColor * 3.0;
        return material;
      }
    `
    
    OneMap.Material._materialCache.addMaterial(OneMap.Material.RadarWaveMaterialType, {
      fabric: {
        type: OneMap.Material.RadarWaveMaterialType,
        uniforms: {
          color: new OneMap.Color(1.0, 0.0, 0.0, 1.0),
          speed: 10.0
        },
        source: OneMap.Material.RadarWaveMaterialSource
      },
      translucent: function(material) {
        return true;
      }
    })
  }

}