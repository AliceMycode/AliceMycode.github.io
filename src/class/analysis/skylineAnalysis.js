export default class skylineAnalysis {
  constructor() {
    this.viewer = window.$viewer
    this.skylineAnayStages = null
    this.edgeDetection = OneMap.PostProcessStageLibrary.createEdgeDetectionStage()
    this.postProccessStageOne()
    this.postProccesStageTwo()
    this.silhouette()
  }

  //打开天际线分析
  handleSkylineAnay() {
    if (this.skylineAnayStages) {
      this.silhouette.enabled = true;
      return;
    }
    this.skylineAnayStages = this.viewer.scene.postProcessStages;
    this.skylineAnayStages.add(this.silhouette);
  }
  silhouette() {
    this.silhouette = new OneMap.PostProcessStageComposite({
      //PostProcessStage要按顺序执行 的 s 或组合的数组。
      stages: [this.edgeDetection, this.postProccessStageOne, this.postProccesStageTwo],
      //是否执行每个后处理阶段，其中一个阶段的输入是前一个阶段的输出。否则每个包含阶段的输入是组合之前执行的阶段的输出
      inputPreviousStageTexture: false,
      //后处理阶段制服的别名
      uniforms: this.edgeDetection.uniforms
    })
  }
  postProccesStageTwo() {
    this.postProccesStageTwo = new OneMap.PostProcessStage({
      // name:obj.name+'_1',
      fragmentShader: 'uniform sampler2D colorTexture;' +
        'uniform sampler2D redTexture;' +
        'uniform sampler2D silhouetteTexture;' +
        'varying vec2 v_textureCoordinates;' +
        'void main(void)' +
        '{' +
        'vec4 redcolor=texture2D(redTexture, v_textureCoordinates);' +
        'vec4 silhouetteColor = texture2D(silhouetteTexture, v_textureCoordinates);' +
        'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
        'if(redcolor.r == 1.0){' +
        'gl_FragColor = mix(color, vec4(5.0,0.0,0.0,1.0), silhouetteColor.a);' +
        '}' +
        'else{' +
        'gl_FragColor = color;' +
        '}' +
        '}',
      //uniform着色器对象
      uniforms: {
        redTexture: this.postProccessStageOne.name,
        silhouetteTexture: this.edgeDetection.name
      }
    });
  }
  postProccessStageOne() {
    this.postProccessStageOne = new OneMap.PostProcessStage({
      //此后处理阶段的唯一名称，供组合中其他阶段参考，如果未提供名称，将自动生成GUID
      // name:name,
      //unform着色器对象 textureScale
      fragmentShader: 'uniform sampler2D colorTexture;' +
        'uniform sampler2D depthTexture;' +
        'varying vec2 v_textureCoordinates;' +
        'void main(void)' +
        '{' +
        'float depth = czm_readDepth(depthTexture, v_textureCoordinates);' +
        'vec4 color = texture2D(colorTexture, v_textureCoordinates);' +
        'if(depth<1.0 - 0.000001){' +
        'gl_FragColor = color;' +
        '}' +
        'else{' +
        'gl_FragColor = vec4(1.0,0.0,0.0,1.0);' +
        '}' +
        '}'
    });
  }
  //关闭天际线分析
  closeSkylineAnay() {
    this.silhouette.enabled = false;
  }
}














