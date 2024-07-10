
// import { modelDataOne } from '@/api'
// import { Map3DURL } from '@/config/oneMapConfig'
import axios from 'axios'
import FileSaver from 'file-saver'
export default class modelDataExtraction {
  constructor() {
    this.getModelData()
  }
  getModelData() {
    axios.get('/data/tileset.json').then(res => {
      this.downloadFile(res.data)
    })
  }
  //直接导出本地tileset.json文件
  downloadFile(tile) {
    const data = JSON.stringify(tile, null, 4)
    const blob = new Blob([data], { type: 'application/json' })
    FileSaver.saveAs(blob, 'tileset.json')
  }

}
