<template>
  <div>
    <!-- 调用v-chart组件:渲染折线图 -->
    <button @click="changeType(2)">效果超群</button>
    <button @click="changeType(0)">效果不好</button>
    <v-chart :options="type===0?myGraph0:myGraph2"></v-chart>
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
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import "echarts/lib/chart/graph";

// 所需宝可梦属性相克的数据
import attributesJson from "../data/attributes.json";

export default {
  name: "HelloWorld",
  components: {
    "v-chart": ECharts,
  },
  data() {
    const nodesColors = [
      "#9199A1",
      "#CD406A",
      "#8EA8DE",
      "#A96AC8",
      "#D87844",
      "#C5B78B",
      "#91C02E",
      "#9F9FEC",
      "#5A8DA1",
      "#FE9C54",
      "#77BBFF",
      "#62BB5A",
      "#F4D23C",
      "#F97178",
      "#73CEBF",
      "#0A6DC2",
      "#5A5365",
    ];
    const lineColors = { x0: "black", "x1/2": "red", x2: "green" };
    const nodes = Object.keys(attributesJson).map((item, index) => ({
      name: item,
      itemStyle: { color: nodesColors[index] },
      category: index,
    }));
    // 效果不好 / 无效
    const links0 = [];
    // 效果超群
    const links2 = [];
    for (const key in attributesJson) {
      if ({}.hasOwnProperty.call(attributesJson, key)) {
        const Attribute = attributesJson[key];
        for (const _key in Attribute) {
          if ({}.hasOwnProperty.call(Attribute, _key)) {
            const element = Attribute[_key];
            if (_key === "x2") {
              if (element.length !== 0) {
                element.map((target) => {
                  links2.push({
                    source: key,
                    target,
                    name: _key,
                    lineStyle: { color: lineColors[_key] },
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
                    lineStyle: { color: lineColors[_key] },
                  });
                });
              }
            }
          }
        }
      }
    }

    return {
      type: 0,
      // 效果不好
      myGraph0: {
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
            // edgeSymbolSize: [80, 10],
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
                width: 2,
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

            data: nodes,
            links: links0,
          },
        ],
      },
      // 效果超群
      myGraph2: {
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
            // edgeSymbolSize: [80, 10],
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
                width: 2,
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

            data: nodes,
            links: links2,
          },
        ],
      },
    };
  },

  methods: {
    changeType(type) {
      this.type = type;
    },
  },
};
</script>