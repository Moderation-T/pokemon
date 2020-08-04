<template>
  <div>
    <button @click="changeType(0)">效果不好</button>
    <button @click="changeType(2)">效果超群</button>
    <button @click="changeType('all')">全部</button>
    <span>{{type}}</span>
    <!-- 调用v-chart组件:渲染graph -->
    <v-chart :options="myGraph"></v-chart>
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100vw;
  height: 100vh;
}
</style>

<script>
import ECharts from "vue-echarts";
// 按需引入不同的图表需要的依赖
import "echarts/lib/chart/graph";

// 所需宝可梦属性相克的数据
import attributesJson from "../data/attributes.json";

export default {
  name: "HelloWorld",
  components: {
    "v-chart": ECharts,
  },
  data() {
    const colors = {
      一般: "#9199A1",
      格斗: "#CD406A",
      飞行: "#8EA8DE",
      毒: "#A96AC8",
      地面: "#D87844",
      岩石: "#C5B78B",
      虫: "#91C02E",
      幽灵: "#9F9FEC",
      钢: "#5A8DA1",
      火: "#FE9C54",
      水: "#77BBFF",
      草: "#62BB5A",
      电: "#F4D23C",
      超能力: "#F97178",
      冰: "#73CEBF",
      龙: "#0A6DC2",
      恶: "#5A5365",
      妖精:'#FBCBFB'
    };
    // const lineColors = { x0: "black", "x1/2": "red", x2: "green" };
    const nodes = Object.keys(attributesJson).map((item, index) => ({
      name: item,
      itemStyle: { color: colors[item] },
      category: index,
    }));
    // 效果不好 / 无效
    const links0 = [];
    // 效果超群
    const links2 = [];
    // 所有 linksAll
    const linksAll = [];
    for (const key in attributesJson) {
      if ({}.hasOwnProperty.call(attributesJson, key)) {
        const Attribute = attributesJson[key];
        for (const _key in Attribute) {
          if ({}.hasOwnProperty.call(Attribute, _key)) {
            const element = Attribute[_key];
            if (element.length !== 0) {
              element.map((target) => {
                linksAll.push({
                  source: key,
                  target,
                  name: _key,
                  lineStyle: { color: colors[key] },
                });
              });
            }
            if (_key === "x2") {
              if (element.length !== 0) {
                element.map((target) => {
                  links2.push({
                    source: key,
                    target,
                    name: _key,
                    lineStyle: { color: colors[key] },
                  });
                });
              }
            } else {
              if (element.length !== 0) {
                element.map((target) => {
                  links0.push({
                    source: key,
                    target,
                    name: _key,
                    lineStyle: { color: colors[key] },
                  });
                });
              }
            }
          }
        }
      }
    }

    return {
      /*0-效果不好 2-效果超群 all-全部 */
      type: 0,
      links: {
        all: linksAll,
        0: links0,
        2: links2,
      },
      nodes,
    };
  },
  computed: {
    myGraph() {
      return {
        title: {
          text: "知识图谱",
        },
        // legend: [
        //   {
        //     // selectedMode: 'single',
        //     data: categories.map(x => x.name)
        //     // icon: 'circle'
        //   }
        // ],
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 58,
            draggable: true,
            roam: true,
            focusNodeAdjacency: true,
            // categories: categories,
            edgeSymbol: ["", "arrow"],
            edgeSymbolSize: [80, 10],
            // edgeLabel: {
            //   normal: {
            //     show: true,
            //     textStyle: {
            //       fontSize: 30,
            //     },
            //     formatter(x) {
            //       return x.data.name;
            //     },
            //   },
            // },
            lineStyle: {
              normal: {
                width: 5,
                shadowColor: "none",
                curveness: 0.1,
              },
            },
            label: {
              show: true,
            },
            force: {
              repulsion: 2000,
              edgeLength: 120,
            },
            data: this.nodes,
            links: this.links[this.type],
          },
        ],
      };
    },
  },

  methods: {
    changeType(type) {
      this.type = type;
    },
  },
};
</script>