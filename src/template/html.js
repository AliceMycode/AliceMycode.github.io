
// 车辆HTML
export function templateHtmlCar(className, index, label, funcOne, funcTwo) {
  return $(`
      <div class="${className}">
        <div class="html_box">
          <div class="html_title">${label}</div>
          <div class="html_btnbox">
            <div class="html_btn" onclick="(${funcOne})('${index}')">车辆详情</div>
            <div class="html_btn" onclick="(${funcTwo})('${index}')">车辆轨迹</div>
          </div>  
        </div>
        <div class="html_icon"></div>
      </div> 
    `)
}

// 自定义HTML模板
export function templateHtmlCustom(className, name, img) {
  return $(`
      <div class="${className}">
        <div class="html_box"> ${name} </div>
        <div class="html_img"> <img src="${img}" /> </div>
      </div> 
    `)
}



