import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'

import OnlyShowMap from '@/views/showMap'

import TopTitle from '@/views/dashboard/common/TopTitle'
Vue.use(Router)

//通用路由表
export const commonRouter= [
  {
    path: '/home',
    component: TopTitle,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/common/TopTitle'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'example', noCache: true}
      },
    ]
  },
  {
    path: '/sutter',
    component: Layout,
    name: '地震展示',
    meta: { title: '地震展示', icon: 'example' },      
        children: [
          {
            path: 'index',
            component:OnlyShowMap,
            name: '快速触发',
            meta: { title: '快速触发', icon: 'example', map:'full'  }
          },          
      ]     
  },


  
  {
    path: '/earthquakeBase',
    component: Layout,
    name:'dzc',
    meta: { title: '地震库', icon: 'example'},
    children: [
      {
            path: '/earthquakeBase/dataManage',
            component: () => import('@/views/earthquakeBase/dataManage'),
            name: 'dzc2',
            meta: { title: '数据管理', icon: 'tubiao', noCache: true,map:'open'}

      },
      {
        path:'/earthquakeBase/dataManageDetail',
        hidden:true,
        component: () => import('@/views/earthquakeBase/dataManageDetail'),
        name: '地震详情',
         meta: { title: '地震详情', icon: 'dashboard',map:'open'}
      },
      //在线预览
      {
        path: 'dashboard/common/showDocument',
        component: () => import('@/views/dashboard/common/showDocument'),
        name: 'showPdf',
        hidden:true,
        meta: { title: 'showPdf', icon: 'dashboard', noCache: true,map:'open'}
      },
      {
            path: '/productionManage',
            component: () => import('@/views/earthquakeBase/productionManage'),
            name: 'dzc3',
            meta: { title: '产品管理', icon: 'tubiao', noCache: true,map:'open'}
      }
    ]
  },
  {
    path: '/dataManageAidDecision',
    hidden:true,
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/earthquakeBase/dataManageAidDecision'),
          name: '地震辅助决策',
           meta: { title: '地震辅助决策', icon: 'dashboard', noCache: true,map: 'open' }
        }
      ]
    },
    {
      path: '/focusTarget',
      hidden:true,
        component: Layout,
        children: [
          {
            path: '',
            component: () => import('@/views/earthquakeBase/focusTarget'),
            name: '重点目标查询',
            meta: { title: '重点目标查询', icon: 'dashboard', noCache: true,map: 'open' }
          }
        ]
      },
     
  {
    path: '/systemManage',
    component: Layout,
    name:'系统管理',
    meta: { title: '系统管理', icon: 'example'},
    children: [
      {
          path: '/systemManage/influenceData',
          component:() => import('@/views/systemManage/influenceData/index'),
          name: 'influenceData',
          children:[
            {
              path: '/systemManage/influenceData/influenceSet',
              component:() => import('@/views/systemManage/influenceData/influenceSet'),
              name: '影响场数据',
              meta: { title: '影响场数据', icon: 'example',map:'closed'}
            },
          ]
        },
      {
        path: '/systemManage/modelSetting',
        component: () => import('@/views/systemManage/modelSetting/index'),
        name: '模型设置',
        meta: { title: '模型设置', icon: 'example', map:'closed'},
        children:[
          {
            path: '/systemManage/modelSetting/model1',
            component:() => import('@/views/systemManage/modelSetting/model1'),
            name: '评估模型',
            meta: { title: '评估模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model2',
            component:() => import('@/views/systemManage/modelSetting/model2'),
            name: '建筑矩阵模型',
            meta: { title: '建筑矩阵模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model3',
            component:() => import('@/views/systemManage/modelSetting/model3'),
            name: '死亡人员模型',
            meta: { title: '死亡人员模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model4',
            component:() => import('@/views/systemManage/modelSetting/model4'),
            name: '受伤人员模型',
            meta: { title: '受伤人员模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model5',
            component:() => import('@/views/systemManage/modelSetting/model5'),
            name: '压埋人员模型',
            meta: { title: '压埋人员模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model6',
            component:() => import('@/views/systemManage/modelSetting/model6'),
            name: '无家可归模型',
            meta: { title: '无家可归模型', icon: 'tubiao', map:'closed'}
          }, {
            path: '/systemManage/modelSetting/model7',
            component:() => import('@/views/systemManage/modelSetting/model7'),
            name: '经济损失模型',
            meta: { title: '经济损失模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model8',
            component:() => import('@/views/systemManage/modelSetting/model8'),
            name: '应急响应模型',
            meta: { title: '应急响应模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model9',
            component:() => import('@/views/systemManage/modelSetting/model9'),
            name: '救援队伍模型',
            meta: { title: '救援队伍模型', icon: 'tubiao', map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model10',
            component:() => import('@/views/systemManage/modelSetting/model10'),
            name: '救援力量模型',
            meta: { title: '救援力量模型', icon: 'tubiao',map:'closed'}
          },
          {
            path: '/systemManage/modelSetting/model11',
            component:() => import('@/views/systemManage/modelSetting/model11'),
            name: '救援物资模型',
            meta: { title: '救援物资模型', icon: 'tubiao',map:'closed'}
          }
        ]
      }
    ]
  },
{
  path: '/queryGeographyInfo/index',
  component: Layout,
  name:'地理信息查询',
  meta: { title: '地理信息查询', icon: 'example'},
  children:[
    {
    path: '/geographyData',
    name:'地理数据',
    meta: { title: '地理数据', icon: 'example'},
    component:() => import('@/views/queryGeographyInfo/geographyData/index'),  
    children:[
        // {
        // path: '/geographyInfoData',
        // name:'地理信息',
        // meta: { title: '地理信息', icon: 'tab', map: 'open'},
        // component:() => import('@/views/queryGeographyInfo/geographyData/historicalEarthquake'),
        // children:[
          {
            path: '/queryGeographyInfo/geographyData/historicalEarthquake',
            name:'地理信息',
            meta: { title: '地理信息', icon: 'tubiao',map: 'open'},       
            component:() => import('@/views/queryGeographyInfo/geographyData/historicalEarthquake'),
          },
          {
            path: '/queryGeographyInfo/geographyData/from1970ToCurrentEQ',
            //name:'1970以来小震',
            //meta: { title: '1970以来小震', icon: 'example',map: 'open'},
            hidden:true,
            component:() => import('@/views/queryGeographyInfo/geographyData/from1970ToCurrentEQ'),
          },
        // ]
        // },
        // {
        //   path: '/geologyInfo',
        //   name:'地质信息',
        //   meta: { title: '地质信息', icon: 'tab',map: 'open'},
        //   component:() => import('@/views/queryGeographyInfo/geologyInfo/stratigraphy'),
        //   children:[
            {
              path: '/queryGeographyInfo/geologyInfo/stratigraphy',
              name:'地质信息',
              meta: { title: '地质信息', icon: 'tubiao',map: 'open'},
              hidden:true,
              component:() => import('@/views/queryGeographyInfo/geologyInfo/stratigraphy'),
            },
            {
              path: '/queryGeographyInfo/geologyInfo/rock',
              name:'岩体',
              meta: { title: '岩体', icon: 'example',map: 'open'},
              hidden:true,
              component:() => import('@/views/queryGeographyInfo/geologyInfo/rock'),
            },
            {
              path: '/queryGeographyInfo/geologyInfo/fault',
              name:'断裂',
              meta: { title: '断裂', icon: 'example',map: 'open'},
              hidden:true,
              component:() => import('@/views/queryGeographyInfo/geologyInfo/fault'),
            },
            {
              path: '/queryGeographyInfo/geologyInfo/activeFault',
              name:'活动断层',
              meta: { title: '活动断层', icon: 'example',map: 'open'},
              hidden:true,
              component:() => import('@/views/queryGeographyInfo/geologyInfo/activeFault'),
            },
          // ]
          //  },
          // {
          //   path: '/tripDistribution',
          //   name:'交通分布',
          //   meta: { title: '交通分布', icon: 'tab',map:'open'},
          //   component:() => import('@/views/queryGeographyInfo/trafficDistribution/airport'),
          //   children:[
              {
                path: '/queryGeographyInfo/trafficDistribution/airport',
                name:'交通分布',
                meta: { title: '交通分布', icon: 'tubiao',map:'open'},
                //hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/airport'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/road',
                // name:'道路',
                // meta: { title: '道路', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views//queryGeographyInfo/trafficDistribution/road'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/railway',
                // name:'铁路',
                // meta: { title: '铁路', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/railway'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/waterway',
                // name:'水道',
                // meta: { title: '水道', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views//queryGeographyInfo/trafficDistribution/waterway'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/bridge',
                // name:'桥梁',
                // meta: { title: '桥梁', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/bridge'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/tunnel',
                // name:'隧道',
                // meta: { title: '隧道', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/tunnel'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/harbor',
                // name:'港口、码头',
                // meta: { title: '港口、码头', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/harbor'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/metroline',
                // name:'地铁线路',
                // meta: { title: '地铁线路', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/metroline'),
              },
              {
                path: '/queryGeographyInfo/trafficDistribution/metrostation',
                // name:'地铁站',
                // meta: { title: '地铁站', icon: 'example',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/metrostation'),
              },
            // ]
            // },
          // {
          //     path: '/pipelineData',
          //     name:'管线数据',
          //     meta: { title: '管线数据', icon: 'tab',map:'open'},
          //     component:() => import('@/views/queryGeographyInfo/trafficDistribution/largeoilgaspipeline'),
          //     children:[
                {
                  path: '/queryGeographyInfo/trafficDistribution/largeoilgaspipeline',
                  name:'管线数据',
                  meta: { title: '管线数据', icon: 'tubiao',map:'open'},
                  //hidden:true,
                  component:() => import('@/views/queryGeographyInfo/trafficDistribution/largeoilgaspipeline'),
                },
                {
                  path: '/queryGeographyInfo/trafficDistribution/gaspipe',
                  // name:'燃气管网',
                  // meta: { title: '燃气管网', icon: 'example',map:'open'},
                  hidden:true,
                  component:() => import('@/views/queryGeographyInfo/trafficDistribution/gaspipe'),
                },
                {
                  path: '/queryGeographyInfo/trafficDistribution/waterpipe',
                  // name:'供水主管网',
                  // meta: { title: '供水主管网', icon: 'example',map:'open'},
                  hidden:true,
                  component:() => import('@/views/queryGeographyInfo/trafficDistribution/waterpipe'),
                },
              // ]
              // },
          {
                path: '/queryGeographyInfo/trafficDistribution/citykeyobject',
                name:'城区重要目标',
                meta: { title: '城区重要目标', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/citykeyobject'),
                },
          {
                path: '/queryGeographyInfo/trafficDistribution/shelter',
                name:'避难场所',
                meta: { title: '避难场所', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/shelter'),
                  },
          {
                path: '/queryGeographyInfo/trafficDistribution/scenic',
                name:'旅游景区',
                meta: { title: '旅游景区', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/scenic'),
                    },
          {
                path: '/queryGeographyInfo/trafficDistribution/school',
                name:'学校',
                meta: { title: '学校', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/school'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/hospital',
                name:'医院',
                meta: { title: '医院', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/hospital'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/dangersource',
                name:'危险源分布',
                meta: { title: '危险源分布', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/dangersource'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/urbanrefuge',
                name:'城市避难场所',
                meta: { title: '城市避难场所', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/urbanrefuge'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/powerstation',
                name:'重要发电厂房信息',
                meta: { title: '重要发电厂房信息', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/powerstation'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/station',
                name:'台站',
                meta: { title: '台站', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/station'),
                      },
          {
                path: '/queryGeographyInfo/trafficDistribution/detachedbuilding',
                name:'独立建筑',
                meta: { title: '独立建筑', icon: 'tubiao',map:'open'},
                component:() => import('@/views/queryGeographyInfo/trafficDistribution/detachedbuilding'),
                      },
                    ]
                  },
      // 普通数据查询
      {
        path: '/queryCommonInfo',
        name:'普通数据',
        meta: { title: '普通数据', icon: 'example'},
        component:() => import('@/views/queryGeographyInfo/commonData/index'),
        children:[
          // {
          //   path: '/commonData',
          //   name:'人口与经济',
          //   meta: { title: '人口与经济', icon: 'tab',map:'open'},
          //   component:() => import('@/views/queryGeographyInfo/commonData/countyPersonStatistics'),
          //   children:[
              {
                path: '/countyPersonStatistics',
                name:'人口与经济',
                meta: { title: '人口与经济', icon: 'tubiao',map:'open'},
                //hidden:true,
                component:() => import('@/views/queryGeographyInfo/commonData/countyPersonStatistics'),
              },
              {
                path: '/townPersonStatistics',
                // name:'乡镇级人口统计',
                // meta: { title: '乡镇级人口统计', icon: 'tab',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/commonData/townPersonStatistics'),
              },
              {
                path: '/economyStatistics',
                // name:'国民经济统计',
                // meta: { title: '国民经济统计', icon: 'tab',map:'open'},
                hidden:true,
                component:() => import('@/views/queryGeographyInfo/commonData/economyStatistics'),
              },
          //   ]
          // },
          //房屋
            // {
            //   path: '/queryHouseData',
            //   name:'房屋',
            //   meta: { title: '房屋', icon: 'tab',map:'open'},
            //   component:() => import('@/views/queryGeographyInfo/commonData/cityBuilding'),
            //   children:[
                {
                  path: '/cityBuilding',
                  name:'房屋',
                  meta: { title: '房屋', icon: 'tubiao',map:'open'},
                  //hidden:true,
                  component:() => import('@/views/queryGeographyInfo/commonData/cityBuilding'),
                },
                {
                  path: '/townBuilding',
                  // name:'乡镇房屋统计',
                  // meta: { title: '乡镇房屋统计', icon: 'tab',map:'open'},
                  hidden:true,
                  component:() => import('@/views/queryGeographyInfo/commonData/townBuilding'),
                },
            //   ]
            // }, 
            {
              path: '/climate',
              name:'气象统计数据',
              meta: { title: '气象统计数据', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/climate'),
            },
            {
              path: '/firePower',
              name:'消防力量',
              meta: { title: '消防力量', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/firePower'),
            },
            {
              path: '/storageInventory',
              name:'物资储备',
              meta: { title: '物资储备', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/storageInventory'),
            },
            //相关部门信息
            // {
            //   path: '/queryRelevantDeptInfo',
            //   name:'相关部门信息',
            //   meta: { title: '相关部门信息', icon: 'tab',map:'open'},
            //   component:() => import('@/views/queryGeographyInfo/commonData/nsbCommunication'),
            //   children:[
                {
                  path: '/nsbCommunication',
                  name:'相关部门信息',
                  meta: { title: '相关部门信息', icon: 'tubiao',map:'open'},
                  //hidden:true,
                  component:() => import('@/views/queryGeographyInfo/commonData/nsbCommunication'),
                },
                {
                  path: '/govCommunication',
                  // name:'地方政府系统联系',
                  // meta: { title: '地方政府系统联系', icon: 'tab',map:'open'},
                  hidden:true,
                  component:() => import('@/views/queryGeographyInfo/commonData/govCommunication'),
                },
                {
                  path: '/troopCommunication',
                  // name:'军队与武警',
                  // meta: { title: '军队与武警', icon: 'tab',map:'open'},
                  hidden:true,
                  component:() => import('@/views/queryGeographyInfo/commonData/troopCommunication'),
                },
            //   ]
            // }, 

            {
              path: '/emergencyPlan',
              name:'应急预案',
              meta: { title: '应急预案', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/emergencyPlan'),
            },
            {
              path: '/storage',
              name:'物资储备库',
              meta: { title: '物资储备库', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/storage'),
            },
            {
              path: '/medical',
              name:'医疗力量',
              meta: { title: '医疗力量', icon: 'tubiao',map:'open'},
              component:() => import('@/views/queryGeographyInfo/commonData/medical'),
            },
          ]
        },
    ]
  },
  
  {
    path: '',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login/index')
  },
  
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/errorPage/404'),
  },
]

//需要权限验证的路由表
export const roleRouter=[
  {
    path: '/map',
    component: Layout,
    name:'map',
    hidden:true,
    children: [
      {
        path: 'index',
        component:OnlyShowMap,
        name: 'index',
        meta: { title: 'map', icon: 'example', map:'full'  }
      },
      
    ]
  },
  {
    path: '/authHome',
    component: TopTitle,
    redirect: '首页',
    hidden:true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/common/TopTitle'),
        name: '首页',
        meta: { title: '首页', icon: 'example', noCache: true}
      },
    ]
  },
  // { path: '*', redirect: '/404' ,hidden: true }
]

export default new Router({
  routes:commonRouter
})