<template>
  <div style="height: 100%">
    <a-layout class="container">
      <a-layout-sider width="44" theme="light" class="select-area">
        <a-row>
          <div class="tab">基础</div>
          <node-list
            :node-list="field.commonNodes"
            type="commonNodes"
            @setDragInfo="setDragInfo"
          />
        </a-row>
        <a-row>
          <div class="tab">高级</div>
          <node-list
            :node-list="field.highNodes"
            type="highNodes"
            @setDragInfo="setDragInfo"
          />
        </a-row>
        <a-row>
          <div class="tab">泳道</div>
          <node-list
            :node-list="field.laneNodes"
            type="laneNodes"
            @setDragInfo="setDragInfo"
          />
        </a-row>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header-option">
          <div class="header-option__tools">
            <span v-for="tool in field.tools" :key="tool.type">
              <a-tooltip :title="tool.name" placement="right">
                <a-button
                  :icon="tool.icon"
                  size="small"
                  :type="currentTool.type === tool.type ? 'primary' : 'default'"
                  @click="selectTool(tool.type)"
                />
              </a-tooltip>
            </span>
          </div>
          <div class="header-option__buttons">
            <a-tooltip title="生成流程图片" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                icon="picture"
                @click="exportFlowPicture"
              />
            </a-tooltip>
            <a-popconfirm
              title="确认要重新绘制吗？"
              placement="bottom"
              ok-text="确认"
              cancel-text="取消"
              @confirm="clear"
            >
              <a-tooltip title="重新绘制" placement="bottom">
                <a-button
                  class="header-option-button"
                  size="small"
                  icon="delete"
                />
              </a-tooltip>
            </a-popconfirm>
            <a-tooltip :title="flowData.config.showGridText" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                :icon="flowData.config.showGridIcon"
                @click="toggleShowGrid"
              />
            </a-tooltip>
            <a-tooltip title="设置" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                icon="setting"
                @click="setting"
              />
            </a-tooltip>
            <a-tooltip title="测试" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                icon="tool"
                @click="openTest"
              />
            </a-tooltip>

            <a-tooltip title="快捷键大全" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                icon="book"
                @click="shortcutHelper"
              />
            </a-tooltip>

            <a-tooltip title="保存流程" placement="bottom">
              <a-button
                class="header-option-button"
                size="small"
                icon="save"
                @click="saveFlow"
              />
            </a-tooltip>
          </div>
        </a-layout-header>
        <a-layout-content class="content">
          <flow-area
            ref="flowArea"
            :drag-info="dragInfo"
            :browser-type="browserType"
            :flow-data="flowData"
            :flow-config="flowConfig"
            :select.sync="currentSelect"
            :select-group.sync="currentSelectGroup"
            :plumb="plumb"
            :current-tool="currentTool"
            @findNodeConfig="findNodeConfig"
            @selectTool="selectTool"
            @getShortcut="getShortcut"
            @saveFlow="saveFlow"
          />
          <vue-context-menu
            :context-menu-data="linkContextMenuData"
            @deleteLink="deleteLink"
          />
        </a-layout-content>
        <a-layout-footer class="foot">
          <span>VFDP {{ info.version }}, Powered by {{ info.author }}</span>
          <span style="margin-left: 10px">
            <a-badge dot>
              <a-icon type="notification" />
            </a-badge>
            <a
              href="https://gitee.com/zhangyeping/vue3-flow-design"
              target="_blank"
            >Vue3版本开源，尝鲜体验</a>
          </span>
        </a-layout-footer>
      </a-layout>
      <a-layout-sider
        width="250"
        theme="light"
        class="attr-area"
        @mousedown.stop="loseShortcut"
      >
        <flow-attr
          :plumb="plumb"
          :flow-data="flowData"
          :select.sync="currentSelect"
        />
      </a-layout-sider>
    </a-layout>
    <!-- 生成流程图片 -->
    <a-modal
      :title="'流程设计图_' + flowData.attr.id + '.png'"
      centered
      width="90%"
      :closable="flowPicture.closable"
      :mask-closable="flowPicture.maskClosable"
      :visible="flowPicture.modalVisible"
      ok-text="下载到本地"
      cancel-text="取消"
      @ok="downLoadFlowPicture"
      @cancel="cancelDownLoadFlowPicture"
    >
      <img :src="flowPicture.url" style="width: 100%">
    </a-modal>
    <!-- 设置 -->
    <setting-modal ref="settingModal" :flow-config="flowConfig" />
    <!-- 快捷键大全 -->
    <shortcut-modal ref="shortcutModal" />
    <!-- 测试 -->
    <test-modal
      ref="testModal"
      :flow-config="flowConfig"
      @loadFlow="loadFlow"
    />
  </div>
</template>

<script>
import { jsPlumb } from 'jsplumb'
import cloneDeep from 'lodash/cloneDeep'
import { tools } from './config/tools.js'
import { commonNodes, highNodes, laneNodes } from './config/nodes.js'
import {
  flowConfig as defaultFlowConfig,
  settingConfig,
  flowStatus
} from './config/flow.js'
import { shortcutKeys } from './config/shortcutKeys.js'
import { linkMenu } from './config/contextMenu.js'
import html2canvas from 'html2canvas'
import canvg from 'canvg'
import { utils, setFlowConfig, getBrowserType } from './utils/common.js'
import FlowArea from './modules/FlowArea'
import FlowAttr from './modules/FlowAttr'
import SettingModal from './modules/SettingModal'
import ShortcutModal from './modules/ShortcutModal'
import TestModal from './modules/TestModal'
import NodeList from './modules/NodeList'

export default {
  name: 'Vfdp',
  components: {
    html2canvas,
    canvg,
    FlowArea,
    FlowAttr,
    SettingModal,
    ShortcutModal,
    TestModal,
    NodeList
  },
  data() {
    return {
      flowConfig: cloneDeep(defaultFlowConfig),
      info: {
        version: '1.1.0',
        author: '前端爱码士',
        gitee: 'https://gitee.com/zhangyeping/vue-flow-design-plus'
      },
      browserType: 3,
      plumb: {},
      field: {
        tools: tools,
        commonNodes: commonNodes,
        highNodes: highNodes,
        laneNodes: laneNodes
      },
      flowData: {
        nodeList: [],
        linkList: [],
        attr: {
          id: ''
        },
        config: {
          showGrid: true,
          showGridText: '隐藏网格',
          showGridIcon: 'eye'
        },
        status: flowStatus.CREATE,
        remarks: []
      },
      currentTool: {
        type: 'drag',
        icon: 'drag',
        name: '拖拽'
      },
      currentSelect: {},
      currentSelectGroup: [],
      activeShortcut: true, // 画布聚焦开启快捷键
      linkContextMenuData: linkMenu,
      flowPicture: {
        url: '',
        modalVisible: false,
        closable: false,
        maskClosable: false
      },
      dragInfo: {
        type: '',
        belongTo: ''
      }
    }
  },
  mounted() {
    // 浏览器兼容性
    this.dealCompatibility()
    // 实例化JsPlumb
    this.initJsPlumb()
    // 初始化快捷键
    this.listenShortcut()
    // 初始画布设置
    this.initSettingConfig()
    // 初始化流程图
    this.initFlow()
  },
  methods: {
    // 初始画布设置
    initSettingConfig() {
      if (!this.$ls.get('settingConfig')) {
        this.$ls.set('settingConfig', settingConfig)
      } else {
        this.flowConfig = setFlowConfig(
          this.flowConfig,
          this.$ls.get('settingConfig')
        )
      }
    },
    // 设置dragInfo
    setDragInfo(info) {
      this.dragInfo = info
    },
    // 浏览器兼容性
    dealCompatibility() {
      this.browserType = getBrowserType()
      if (this.browserType === 2) {
        shortcutKeys.scaleContainer = {
          code: 16,
          codeName: 'SHIFT(chrome下为ALT)',
          shortcutName: '画布缩放'
        }
      }
    },
    // 实例化JsPlumb
    initJsPlumb() {
      this.plumb = jsPlumb.getInstance(this.flowConfig.jsPlumbInsConfig)

      this.plumb.bind('beforeDrop', (info) => {
        const sourceId = info.sourceId
        const targetId = info.targetId

        if (sourceId === targetId) return false
        const hasMultipleLine = this.flowData.linkList.find(
          (link) => link.sourceId === sourceId && link.targetId === targetId
        )
        if (hasMultipleLine) {
          this.$message.error('同方向的两节点连线只能有一条！')
          return false
        }
        return true
      })

      this.plumb.bind('connection', (conn) => {
        const connObj = conn.connection.canvas
        const o = {}
        let id
        let label
        if (
          this.flowData.status === flowStatus.CREATE ||
          this.flowData.status === flowStatus.MODIFY
        ) {
          id = 'link-' + utils.getId()
          label = ''
        } else if (this.flowData.status === flowStatus.LOADING) {
          const l = this.flowData.linkList[this.flowData.linkList.length - 1]
          id = l.id
          label = l.label
        }
        connObj.id = id
        o.type = 'link'
        o.id = id
        o.sourceId = conn.sourceId
        o.targetId = conn.targetId
        o.label = label
        o.cls = {
          linkType: this.flowConfig.jsPlumbInsConfig.Connector[0],
          linkColor: this.flowConfig.jsPlumbInsConfig.PaintStyle.stroke,
          linkThickness:
            this.flowConfig.jsPlumbInsConfig.PaintStyle.strokeWidth
        }
        document
          .querySelector('#' + id)
          .addEventListener('contextmenu', (e) => {
            this.showLinkContextMenu(e)
            this.currentSelect = this.flowData.linkList.find(
              (l) => l.id === id
            )
          })

        document.querySelector('#' + id).addEventListener('click', (e) => {
          const event = window.event || e
          event.stopPropagation()
          this.currentSelect = this.flowData.linkList.find((l) => l.id === id)
        })

        if (this.flowData.status !== flowStatus.LOADING) {
          this.flowData.linkList.push(o)
        }
      })

      this.plumb.importDefaults({
        ConnectionsDetachable: this.flowConfig.jsPlumbConfig.conn.isDetachable
      })
    },
    // 初始化快捷键
    listenShortcut() {
      document.onkeydown = (e) => {
        const event = window.event || e

        // 画布聚焦开启快捷键
        if (!this.activeShortcut) return
        const key = event.keyCode

        switch (key) {
          case shortcutKeys.multiple.code:
            this.$refs.flowArea.rectangleMultiple.flag = true
            break
          case shortcutKeys.dragContainer.code:
            this.$refs.flowArea.container.dragFlag = true
            break
          case shortcutKeys.dragTool.code:
            this.selectTool('drag')
            break
          case shortcutKeys.connTool.code:
            this.selectTool('connection')
            break
          case shortcutKeys.leftMove.code:
            this.moveNode('left')
            break
          case shortcutKeys.upMove.code:
            this.moveNode('up')
            break
          case shortcutKeys.rightMove.code:
            this.moveNode('right')
            break
          case shortcutKeys.downMove.code:
            this.moveNode('down')
            break
        }

        if (event.ctrlKey) {
          switch (key) {
            case shortcutKeys.settingModal.code:
              this.saveFlow()
              break
            case shortcutKeys.testModal.code:
              this.openTest()
              break
          }
        }
      }
      // 拖拽、缩放、多选快捷键复位
      document.onkeyup = (e) => {
        const event = window.event || e

        const key = event.keyCode
        if (key === shortcutKeys.dragContainer.code) {
          this.$refs.flowArea.container.dragFlag = false
        } else if (key === shortcutKeys.multiple.code) {
          this.$refs.flowArea.rectangleMultiple.flag = false
        }
      }
    },
    // 初始化流程图
    initFlow() {
      if (this.flowData.status === flowStatus.CREATE) {
        this.flowData.attr.id = 'flow-' + utils.getId()
      } else {
        this.loadFlow()
      }
    },
    // 渲染流程
    loadFlow(json) {
      this.clear()
      this.$nextTick(() => {
        const loadData = JSON.parse(json)
        this.flowData.attr = loadData.attr
        this.flowData.config = loadData.config
        this.flowData.status = flowStatus.LOADING
        this.plumb.batch(() => {
          const nodeList = loadData.nodeList
          nodeList.forEach((node) => {
            this.flowData.nodeList.push(node)
          })
          const linkList = loadData.linkList
          this.$nextTick(() => {
            linkList.forEach((link) => {
              this.flowData.linkList.push(link)
              const conn = this.plumb.connect({
                source: link.sourceId,
                target: link.targetId,
                anchor: this.flowConfig.jsPlumbConfig.anchor.default,
                connector: [
                  link.cls.linkType,
                  {
                    gap: 5,
                    cornerRadius: 8,
                    alwaysRespectStubs: true
                  }
                ],
                paintStyle: {
                  stroke: link.cls.linkColor,
                  strokeWidth: link.cls.linkThickness
                }
              })
              const linkId = conn.canvas.id
              const labelHandle = (e) => {
                const event = window.event || e
                event.stopPropagation()
                this.currentSelect = this.flowData.linkList.find(
                  (l) => l.id === linkId
                )
              }

              if (link.label !== '') {
                conn.setLabel({
                  label: link.label,
                  cssClass: `linkLabel ${linkId}`
                })

                // 添加label点击事件
                document
                  .querySelector('.' + linkId)
                  .addEventListener('click', labelHandle)
              } else {
                if (document.querySelector('.' + linkId)) {
                  // 移除label点击事件
                  document
                    .querySelector('.' + linkId)
                    .removeEventListener('click', labelHandle)
                }
              }
            })
            this.currentSelect = {}
            this.currentSelectGroup = []
            this.flowData.status = flowStatus.MODIFY
          })
        }, true)
        const canvasSize = this.computeCanvasSize()
        this.$refs.flowArea.container.pos = {
          top: -canvasSize.minY + 100,
          left: -canvasSize.minX + 100
        }
      })
    },
    // 查找相关节点
    findNodeConfig(belongTo, type, callback) {
      let node = null
      switch (belongTo) {
        case 'commonNodes':
          node = commonNodes.find((n) => n.type === type)
          break
        case 'highNodes':
          node = highNodes.find((n) => n.type === type)
          break
        case 'laneNodes':
          node = laneNodes.find((n) => n.type === type)
          break
      }
      callback(node)
    },
    // 设置工具
    selectTool(type) {
      const tool = tools.find((t) => t.type === type)
      if (tool) this.currentTool = tool

      switch (type) {
        case 'drag':
          this.changeToDrag()
          break
        case 'connection':
          this.changeToConnection()
          break
      }
    },
    // 切换为拖拽
    changeToDrag() {
      this.flowData.nodeList.forEach((node) => {
        const f = this.plumb.toggleDraggable(node.id)
        if (!f) {
          this.plumb.toggleDraggable(node.id)
        }
        if (node.type !== 'x-lane' && node.type !== 'y-lane') {
          this.plumb.unmakeSource(node.id)
          this.plumb.unmakeTarget(node.id)
        }
      })
    },
    // 切换为连线
    changeToConnection() {
      this.flowData.nodeList.forEach((node) => {
        const f = this.plumb.toggleDraggable(node.id)
        if (f) {
          this.plumb.toggleDraggable(node.id)
        }
        if (node.type !== 'x-lane' && node.type !== 'y-lane') {
          this.plumb.makeSource(
            node.id,
            this.flowConfig.jsPlumbConfig.makeSourceConfig
          )
          this.plumb.makeTarget(
            node.id,
            this.flowConfig.jsPlumbConfig.makeTargetConfig
          )
        }
      })

      this.currentSelect = {}
      this.currentSelectGroup = []
    },
    // 切换为放大工具
    changeToZoomIn() {
      console.log('切换到放大工具')
    },
    // 切换为缩小工具
    changeToZoomOut() {
      console.log('切换到缩小工具')
    },
    // 检测流程数据有效性
    checkFlow() {
      const nodeList = this.flowData.nodeList

      if (nodeList.length <= 0) {
        this.$message.error('流程图中无任何节点！')
        return false
      }
      return true
    },
    // 保存流程
    saveFlow() {
      const flowObj = Object.assign({}, this.flowData)

      if (!this.checkFlow()) return
      flowObj.status = flowStatus.SAVE
      const d = JSON.stringify(flowObj)
      this.$message.success('保存流程成功！请查看控制台。')
      return d
    },
    // 生成流程图片
    exportFlowPicture() {
      if (!this.checkFlow()) return

      const $Container = this.$refs.flowArea.$el.children[0]
      const svgElems = $Container.querySelectorAll('svg[id^="link-"]')
      const removeArr = []

      svgElems.forEach((svgElem) => {
        const linkCanvas = document.createElement('canvas')
        const canvasId = 'linkCanvas-' + utils.getId()
        linkCanvas.id = canvasId
        removeArr.push(canvasId)

        const svgContent = svgElem.outerHTML.trim()
        canvg(linkCanvas, svgContent)
        if (svgElem.style.position) {
          linkCanvas.style.position += svgElem.style.position
          linkCanvas.style.left += svgElem.style.left
          linkCanvas.style.top += svgElem.style.top
        }
        $Container.appendChild(linkCanvas)
      })

      const canvasSize = this.computeCanvasSize()

      const pbd = this.flowConfig.defaultStyle.photoBlankDistance
      const offsetPbd = utils.div(pbd, 2)

      html2canvas($Container, {
        width: canvasSize.width + pbd,
        height: canvasSize.height + pbd,
        scrollX: -canvasSize.minX + offsetPbd,
        scrollY: -canvasSize.minY + offsetPbd,
        logging: false,
        onclone: () => {
          removeArr.forEach((id) => {
            const currentNode = document.querySelector('#' + id)
            currentNode.parentNode.removeChild(currentNode)
          })
        }
      }).then((canvas) => {
        const dataURL = canvas.toDataURL('image/png')
        this.flowPicture.url = dataURL
        this.flowPicture.modalVisible = true
      })
    },
    // 下载图片
    downLoadFlowPicture() {
      const alink = document.createElement('a')
      const alinkId = 'alink-' + utils.getId()
      alink.id = alinkId
      alink.href = this.flowPicture.url
      alink.download = '流程设计图_' + this.flowData.attr.id + '.png'
      alink.click()
    },
    // 取消下载
    cancelDownLoadFlowPicture() {
      this.flowPicture.url = ''
      this.flowPicture.modalVisible = false
    },
    // 计算流程图宽高
    computeCanvasSize() {
      const nodeList = Object.assign([], this.flowData.nodeList)
      let minX = nodeList[0].x
      let minY = nodeList[0].y
      let maxX = nodeList[0].x + nodeList[0].width
      let maxY = nodeList[0].y + nodeList[0].height

      nodeList.forEach((node) => {
        minX = Math.min(minX, node.x)
        minY = Math.min(minY, node.y)
        maxX = Math.max(maxX, node.x + node.width)
        maxY = Math.max(maxY, node.y + node.height)
      })
      const canvasWidth = maxX - minX
      const canvasHeight = maxY - minY
      return {
        width: canvasWidth,
        height: canvasHeight,
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY
      }
    },
    // 清除画布
    clear() {
      this.flowData.nodeList.forEach((node) => {
        this.plumb.remove(node.id)
      })
      this.currentSelect = {}
      this.currentSelectGroup = []
      this.flowData.nodeList = []
      this.flowData.linkList = []
      this.flowData.remarks = []
    },
    // 显示隐藏网格
    toggleShowGrid() {
      const flag = this.flowData.config.showGrid
      if (flag) {
        this.flowData.config.showGrid = false
        this.flowData.config.showGridText = '显示网格'
        this.flowData.config.showGridIcon = 'eye-invisible'
      } else {
        this.flowData.config.showGrid = true
        this.flowData.config.showGridText = '隐藏网格'
        this.flowData.config.showGridIcon = 'eye'
      }
    },
    // 设置
    setting() {
      this.$refs.settingModal.open()
    },
    // 快捷键大全
    shortcutHelper() {
      this.$refs.shortcutModal.open()
    },
    // 使用文档
    goGit() {
      window.open(this.info.gitee)
    },
    // 连接线右键
    showLinkContextMenu(e) {
      const event = window.event || e

      event.preventDefault()
      event.stopPropagation()
      document.querySelector('.vue-contextmenuName-flow-menu').style.display =
        'none'
      document.querySelector('.vue-contextmenuName-node-menu').style.display =
        'none'
      const x = event.clientX
      const y = event.clientY
      this.linkContextMenuData.axis = { x, y }
    },
    // 删除线
    deleteLink() {
      const sourceId = this.currentSelect.sourceId
      const targetId = this.currentSelect.targetId
      this.plumb.deleteConnection(
        this.plumb.getConnections({
          source: sourceId,
          target: targetId
        })[0]
      )
      const linkList = this.flowData.linkList
      linkList.splice(
        linkList.findIndex(
          (link) => link.sourceId === sourceId && link.targetId === targetId
        ),
        1
      )
      this.currentSelect = {}
    },
    // 设置快捷键失效
    loseShortcut() {
      this.activeShortcut = false
    },
    // 设置快捷键启用
    getShortcut() {
      this.activeShortcut = true
    },
    // 测试
    openTest() {
      const flowObj = Object.assign({}, this.flowData)
      this.$refs.testModal.flowData = flowObj
      this.$refs.testModal.testVisible = true
    },
    // 键盘移动节点
    moveNode(type) {
      let m = this.flowConfig.defaultStyle.movePx
      let isX = true

      switch (type) {
        case 'left':
          m = -m
          break
        case 'up':
          m = -m
          isX = false
          break
        case 'right':
          break
        case 'down':
          isX = false
      }

      if (this.currentSelectGroup.length > 0) {
        this.currentSelectGroup.forEach((node) => {
          if (isX) {
            node.x += m
          } else {
            node.y += m
          }
        })
        this.plumb.repaintEverything()
      } else if (this.currentSelect.id) {
        if (isX) {
          this.currentSelect.x += m
        } else {
          this.currentSelect.y += m
        }
        this.plumb.repaintEverything()
      }
    }
  }
}
</script>
<style scoped></style>
