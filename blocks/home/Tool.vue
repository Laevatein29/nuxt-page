<template>
  <div class="home-tool">
    <div class="title">距离记录工具</div>
    <div class="content">
      <div class="operate">
        <div class="title">添加数据</div>
        <div class="info">
          <input-item :value.sync="addPortA" placeholder="portA"></input-item>
          <input-item :value.sync="addPortB" placeholder="portB"></input-item>
          <input-item
            :value.sync="addInstance"
            placeholder="instance"
          ></input-item>
          <el-button @click="add">确定</el-button>
        </div>
      </div>
      <div class="operate">
        <div class="title">模糊搜素</div>
        <div class="info">
          <input-item
            v-debounce:200="setDebounceCondition"
            :value.sync="searchValue"
            placeholder="portA"
          ></input-item>
          <div v-if="searchResult.length !== 0" class="result">
            <div class="result-title">您要找的是不是：</div>
            <div class="result-content">
              <div
                v-for="(item, index) in searchResult"
                :key="index"
                class="result-item"
              >
                <div class="item">portA: {{ item.portA }}</div>
                <div class="item">portB: {{ item.portB }}</div>
                <div class="item">instance: {{ item.instance }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="operate">
        <div class="title">精确搜索</div>
        <div class="info">
          <input-item :value.sync="searchA" placeholder="portA"></input-item>
          <input-item :value.sync="searchB" placeholder="portB"></input-item>
          <el-button @click="search">搜索</el-button>
        </div>
      </div>
      <div v-if="realResult !== undefined" class="result">
        <div class="result-title">您要找的是不是:</div>
        <div class="result-content">
          <div class="result-item">
            <div class="item">portA: {{ realResult.portA }}</div>
            <div class="item">portB: {{ realResult.portB }}</div>
            <div class="item">instance: {{ realResult.instance }}</div>
          </div>
        </div>
        <el-button class="delete" @click="deleteData">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Data {
  portA: string
  portB: string
  instance: string
}
export default Vue.extend({
  name: 'HomeTool',
  data() {
    return {
      searchValue: '',
      addPortA: '',
      addPortB: '',
      addInstance: '',
      localeList: [] as Data[],
      searchResult: [] as Data[],
      searchA: '',
      searchB: '',
      realResult: undefined as unknown as Data,
    }
  },
  computed: {
    addData(): Data {
      return {
        portA: this.addPortA.toUpperCase(),
        portB: this.addPortB.toUpperCase(),
        instance: this.addInstance,
      }
    },
    searchData(): any {
      return {
        portA: this.searchA,
        portB: this.searchB,
      }
    },
    storage() {
      const res = localStorage.getItem('portData')
      return res
    },
  },
  mounted() {
    // eslint-disable-next-line no-prototype-builtins
    if ((localStorage as any).hasOwnProperty('portData')) {
      const res = localStorage.getItem('portData')
      this.localeList = JSON.parse(res!)
    } else {
      localStorage.setItem('portData', [] as any)
    }
  },
  methods: {
    setDebounceCondition() {
      this.searchResult = []
      const res = []
      if (!this.searchValue || this.searchValue === '') {
        this.searchResult = []
        return
      }
      for (let index = 0; index < this.localeList.length; index++) {
        const element = this.localeList[index]
        if (
          element.portA.includes(this.searchValue.toUpperCase()) ||
          element.portB.includes(this.searchValue.toUpperCase())
        ) {
          res.push(element)
        }
      }

      this.searchResult = res
    },
    add() {
      if (
        this.addData.portA === '' ||
        this.addData.portB === '' ||
        this.addData.instance === ''
      ) {
        this.$message.error('请输入正确的数据')
      } else {
        try {
          let hasEle = false
          for (let index = 0; index < this.localeList.length; index++) {
            const element = this.localeList[index]
            if (
              (element.portA === this.addPortA.toUpperCase() &&
                element.portB === this.addPortB.toUpperCase()) ||
              (element.portA === this.addPortB.toUpperCase() &&
                element.portB === this.addPortA.toUpperCase())
            ) {
              hasEle = true
            }
          }
          if (hasEle) {
            this.$message.error('数据已存在')
            return
          }
          if (this.addPortA === this.addPortB) {
            this.$message.error('请输入不同的港口')
            return
          }
          this.localeList.push(this.addData)
          localStorage.setItem('portData', JSON.stringify(this.localeList))
          this.$message.success('添加成功')
        } catch (error) {}
      }
    },
    deleteData() {
      for (let index = 0; index < this.localeList.length; index++) {
        const element = this.localeList[index]
        if (element === this.realResult) {
          this.localeList.splice(index, 1)
          localStorage.setItem('portData', JSON.stringify(this.localeList))
        }
      }
    },
    search() {
      if (this.searchA === '' || this.searchB === '') {
        this.$message.error('请输入正确的数据')
      } else {
        try {
          let hasEle = false
          for (let index = 0; index < this.localeList.length; index++) {
            const element = this.localeList[index]
            if (
              (element.portA === this.searchA.toUpperCase() &&
                element.portB === this.searchB.toUpperCase()) ||
              (element.portA === this.searchB.toUpperCase() &&
                element.portB === this.searchA.toUpperCase())
            ) {
              hasEle = true
              this.realResult = element
            }
          }
          if (!hasEle) {
            this.$message.error('未找到相应数据')
          }
          if (this.searchA === this.searchB) {
            this.$message.error('请输入不同的港口')
          }
        } catch (error) {}
      }
    },
  },
})
</script>

<style scoped lang="scss">
.home-tool {
  height: 100vh;
  padding: 100px 50px;
}

.operate {
  @include flexR;
  height: 200px;

  .title {
    width: 100px;
  }

  .info {
    @include flexR;
    @include flexRGap(10px);
  }
}

.result {
  margin-left: 10px;
  @include flexR;

  .result-content {
    margin-left: 20px;
    max-height: 100px;
    overflow-y: scroll;

    .result-item {
      @include flexR;
      @include flexRGap(20px);

      .item {
        width: 200px;
        height: 30px;
        padding: 5px 0;
      }
    }
  }
}
</style>
