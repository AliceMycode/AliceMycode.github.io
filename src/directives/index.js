import Vue from 'vue'

Vue.directive('drag',{
    inserted(el){
        let dragBox = el
        dragBox.onmousedown = e => {
            let disX = e.clientX - dragBox.offsetLeft
            let disY = e.clientY - dragBox.offsetTop
            document.onmousemove = e => {
                let left  = e.clientX - disX
                let top = e.clientY - disY
                dragBox.style.left = left + 'px'
                dragBox.style.top = top + 'px'
            }
            document.onmouseup = e => {
                document.onmousemove  = null
                document.onmouseup = null
            }
        }
        // console.log('drag',el)
    },
    bind(el,binding,vnode){

    },
    update(){

    },
    unbind(){

    },
    componentUpdated(){

    }
})
