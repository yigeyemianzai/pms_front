## 目录结构 ##
```
    |-- main-content.vue                       // 主入口标签页
    |-- main-navbar-update-password.vue        // 修改密码
    |-- main-navbar.vue                        // 告警栏
    |-- main-sidebar-sub-menu.vue              // 菜单渲染组件
    |-- main-sidebar.vue                       // 菜单
    |-- main.vue                               // 主页入口
    |-- README.md
    |-- common                                 //
    |   |-- 404.vue                            // 404页面
    |   |-- home.vue                           // 未用
    |   |-- login.vue                          // 登录页面
    |-- modules
        |-- index.vue                          // 首页
        |-- alarm-statistics                   // 告警统计
        |   |-- energy-alarm.vue               // 能耗告警-未编辑
        |   |-- energy-statistics.vue          // 未使用-未编辑
        |   |-- load-statistics.vue            // 未使用-未编辑
        |   |-- statistics.vue                 // 统计数据-未编辑
        |-- analysis                           // 统计分析
        |   |-- analysis-his.vue               // 历史数据-未使用
        |   |-- energy-analysis.vue            // 用能分析
        |   |-- fpg.vue                        // 峰平谷统计-未使用
        |-- equipment-monitor                  // 设备监测
        |   |-- charging-pile.vue              // 充电桩
        |   |-- compression-air.vue            // 压缩空气储能
        |   |-- equipment-topology.vue         // 插座系统拓扑图
        |   |-- fan.vue                        // 风机盘管
        |   |-- hths.vue                       // 高温相变储热
        |   |-- HVAC.vue                       // 暖通空调
        |   |-- illumination-index.vue         // 照明系统-楼层
        |   |-- illumination.vue               // 照明系统主页
        |   |-- incident-record.vue            // 插座系统-事件记录-已弃用
        |   |-- light-heat.vue                 // 光热发电
        |   |-- operating-record.vue           // 插座系统-操作记录-已弃用
        |   |-- photovoltaic.vue               // 光伏系统
        |   |-- precision.vue                  // 精密空调
        |   |-- socket-floor.vue               // 插座系统-楼层
        |   |-- socket-index.vue               // 插座系统主页-已弃用
        |   |-- socket.vue                     // 插座系统主页
        |   |-- sys-pic.vue                    // 系统结构图
        |   |-- vrv.vue                        // VRV空调
        |   |-- energy-monitoring              // 能源监测
        |       |-- air-monitor.vue            // 气监测
        |       |-- cold-hot-monitor.vue       // 冷热监测
        |       |-- electric-monitor.vue       // 电监测
        |       |-- water-monitor.vue          // 水监测
        |-- improve                            // 能效提升
        |   |-- energy-imp.vue                 // 能效提升
        |   |-- history-detail.vue             // 历史记录-详情
        |   |-- imp-his.vue                    // 历史记录
        |-- interactive                        // 电网互动
        |   |-- his-detail.vue                 // 操作历史-详情
        |   |-- interactive-his.vue            // 操作历史
        |   |-- non-urgent.vue                 // 紧急需求响应
        |   |-- urgent.vue                     // 非紧急需求响应
        |-- management                         // 系统管理
        |   |-- manage-comm                    // 通讯管理
        |   |   |-- comm-agreement-sub.vue     // 已弃用
        |   |   |-- comm-agreement.vue         // 通讯协议管理
        |   |   |-- comm-connect.vue           // 通讯连接
        |   |   |-- comm-device.vue            // 通讯设备
        |   |   |-- comm-redis-sub.vue         // 已弃用
        |   |   |-- comm-redis.vue             // 已弃用
        |   |-- manage-data
        |   |   |-- ecalarm.vue                // 能耗告警配置
        |   |   |-- ecstatistics.vue           // 未使用
        |   |   |-- load.vue                   // 未使用
        |   |   |-- sc.vue                     // 统计数据配置
        |   |-- manage-device                  // 设备管理
        |   |   |-- device-detail.vue          // 未使用
        |   |   |-- device-firm.vue            // 设备厂商配置
        |   |   |-- device-info.vue            // 设备信息配置
        |   |   |-- device-model.vue           // 设备型号配置
        |   |   |-- device-point.vue           // 点位配置
        |   |-- manage-site                    // 站点管理
        |   |   |-- cost.vue                   // 费用管理
        |   |   |-- dictionary.vue             // 字典管理
        |   |   |-- floor.vue                  // 楼层管理
        |   |   |-- site.vue                   // 站点管理
        |   |-- remote                          
        |       |-- tycrule-add-or-update.vue  // 已弃用
        |       |-- tycrule.vue                // 通讯规约管理
        |       |-- tykrule-add-or-update.vue  // 已弃用
        |       |-- tykrule.vue                // 通讯规约转发管理
        |       |-- tymrule-add-or-update.vue  // 已弃用
        |       |-- tymrule.vue                // 已弃用
        |       |-- tytrule-add-or-update.vue  // 已弃用
        |       |-- tytrule.vue                // 已弃用
        |       |-- tyxrule-add-or-update.vue  // 已弃用
        |       |-- tyxrule.vue                // 已弃用
        |-- sys                                // 权限管理
            |-- sysdeptinfo-add-or-update.vue  // 部门管理-新增/修改
            |-- sysdeptinfo.vue                // 部门管理
            |-- sysmenu-add-or-update.vue      // 菜单管理-新增/修改
            |-- sysmenu.vue                    // 菜单管理
            |-- sysorg-add-or-update.vue       // 组织管理-新增/修改
            |-- sysorg.vue                     // 组织管理
            |-- sysorginfo-add-or-update.vue   // 组织机构详情页-新增/修改-未使用
            |-- sysorginfo.vue                 // 组织机构详情页-未使用
            |-- sysresinfo-add-or-update.vue   // 资源管理-新增/修改
            |-- sysresinfo.vue                 // 资源管理
            |-- sysroleinfo-add-or-update.vue  // 角色管理-新增/修改
            |-- sysroleinfo.vue                // 角色管理
            |-- user-add-or-update.vue         // 用户管理-新增/修改
            |-- user.vue                       // 用户管理
```
