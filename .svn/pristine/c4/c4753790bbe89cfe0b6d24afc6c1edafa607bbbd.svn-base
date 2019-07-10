<template>
  <div class="device_info">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" class="top-area">
      <el-form-item>
        <el-cascader
          :options="sysOptons"
          v-model="selectSys"
          @change="sysChange"
          change-on-select
          placeholder="选择系统"
          clearable
        ></el-cascader>
        <!-- 组织机构连级 -->
        <el-cascader
          :options="conOrgOption"
          v-model="selectedOrg"
          @change="conditionOrg"
          change-on-select
          placeholder="选择组织机构"
        ></el-cascader>
        <!-- 站点下拉框 -->
        <!-- <el-cascader :options="conSiteOption" v-model="selectedSite" @change="conditionSite" change-on-select placeholder="选择站点" clearable>
        </el-cascader>-->
        <el-select v-model="selectedSite" placeholder="选择站点" @change="conditionSite" clearable>
          <el-option
            v-for="item in conSiteOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 楼层/房间连级 -->
        <el-cascader
          :options="conFloorOption"
          v-model="selectedFloor"
          change-on-select
          placeholder="选择楼层/房间"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isAuth(OPTAUTH_ADD)" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button
          v-if="isAuth(OPTAUTH_DELETE)"
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>
        <!-- <el-button type="danger" @click="addOrUpdateHandle()" :disabled="dataListSelections.length <= 0">批量修改</el-button> -->
        <!-- <el-button type="danger" @click="dataHandle()" :disabled="dataListSelections.length <= 0">批量数据配置</el-button> -->
      </el-form-item>
      <div class="searchTool">
        <el-form-item>
          <el-input v-model="searchCon" placeholder="输入设备名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectEquipType" placeholder="选择设备类型" clearable>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectComm" placeholder="选择通讯设备" clearable>
            <el-option
              v-for="item in commOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList('params')" type="success">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selfTable=!selfTable">自定义列表</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-transfer
      v-model="tableHead"
      @change="changeColumns"
      :props="{key: 'dataIndex',label: 'text'}"
      :data="ckColumns"
      v-if="selfTable"
      class="tableTransfer"
      :titles="['显示列', '隐藏列']"
    ></el-transfer>
    <!-- <el-dialog title="自定义表格" :close-on-click-modal="false" ref="addOrUpdate" :visible.sync="selfTable" > -->

    <!-- </el-dialog> -->
    <!-- <lazy-tree :data="treeData" @loadNode="loadNodes"></lazy-tree> -->
    <!-- <tree-grid :treeStructure="true" :columns="columns" :data-source="dataList" :expandList="expandList" @deleteRow="deleteHandle"
      @changeHandle="addOrUpdateHandle"  @selection="selectionChangeHandle" v-loading="dataListLoading" isExpand isDataSet >
    </tree-grid>-->
    <!-- <el-tree :props="props1" :load="loadNode" lazy node-key highlight-current @node-click="handleNodeClick">
    </el-tree>-->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      max-height="640"
      :row-class-name="tableRowClassNames"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
        fixed="left"
      ></el-table-column>
      <el-table-column
        type="index"
        header-align="center"
        align="center"
        width="50"
        label="序号"
        fixed="left"
      ></el-table-column>
      <!-- <el-table-column prop="equipId" header-align="center" align="center" width="200" label="设备ID" fixed="left">
      </el-table-column>-->
      <!-- <el-table-column prop="equipName" header-align="center" align="center" width="120" label="设备名称" fixed="left">
      </el-table-column>-->
      <table-tree-column
        ref="child"
        prop="equipName"
        treeKey="equipId"
        header-align="center"
        label="设备名称"
        lazy
        @expanded="expandedHandle"
        width="160"
      ></table-tree-column>
      <!-- <el-table-column prop="equipCode" header-align="center" align="center" label="设备编号" >
        </el-table-column>
      <el-table-column prop="useTypeName" header-align="center" align="center" label="用途类型">
      </el-table-column>
      <el-table-column prop="useStatus" header-align="center" align="center" label="设备使用状态" :formatter="ftUseStatus">
      </el-table-column>
      <el-table-column prop="adiustableMargin" header-align="center" align="center" label="调节裕度">
      </el-table-column>
      
      <el-table-column prop="affiliateId" header-align="center" align="center" label="归属类型" :formatter="ftAffiliateId">
      </el-table-column>
      <el-table-column prop="orgName" header-align="center" align="center" label="组织机构">
      </el-table-column>
      <el-table-column prop="stationName" header-align="center" align="center" label="站点">
      </el-table-column>
      <el-table-column prop="floorName" header-align="center" align="center" label="楼层/房间">
      </el-table-column>
      <el-table-column prop="systemName" header-align="center" align="center" label="系统">
      </el-table-column>
      <el-table-column prop="subSystemName" header-align="center" align="center" label="子系统">
        </el-table-column>
      <el-table-column prop="commEquipName" header-align="center" align="center" label="通信设备">
      </el-table-column>
      <el-table-column prop="equipTypeName" header-align="center" align="center" label="设备类型">
      </el-table-column>
      
      <el-table-column prop="isBus" header-align="center" align="center" label="是否总线" :formatter="ftIsBus">
      </el-table-column>

      <el-table-column prop="isVirtual" header-align="center" align="center" label="是否虚拟设备" :formatter="ftIsVirtual">
      </el-table-column>
      <el-table-column prop="adiustableStatus" header-align="center" align="center" label="是否可调节" :formatter="ftAdiustableStatus"> 
      </el-table-column>

      <el-table-column prop="energyFunction" header-align="center" align="center" label="设备机能" :formatter="ftEnergyFunction">
      </el-table-column>

      <el-table-column prop="energyName" header-align="center" align="center" label="能源种类">
      </el-table-column>
      <el-table-column prop="energyDirection" header-align="center" align="center" label="能源方向" :formatter="ftEnergyDirection">
      </el-table-column>
      <el-table-column prop="parentName" header-align="center" align="center" label="上级设备">
      </el-table-column>
      <el-table-column prop="physicalName" header-align="center" align="center" label="实际设备">
      </el-table-column>
      <el-table-column prop="commAddress" header-align="center" align="center" label="通讯地址">
      </el-table-column>
      <el-table-column prop="equipCost" header-align="center" align="center" label="设备成本">
      </el-table-column>
      <el-table-column prop="productionDate" header-align="center" align="center"  width="100px" label="生产日期">
      </el-table-column>
      <el-table-column prop="commissioningDate" header-align="center" align="center" width="100px" label="投运日期">
      </el-table-column>-->
      <el-table-column
        v-for="item in columns"
        :label="item.text"
        :key="item.index"
        :prop="item.dataIndex"
        :width="item.width"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column fixed="right" header-align="center" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-tooltip content="修改" placement="top">
            <el-button
              v-if="isAuth(OPTAUTH_UPDATE)"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row)"
            >
              <i class="el-icon-edit-outline istyle"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              v-if="isAuth(OPTAUTH_DELETE)"
              type="text"
              size="small"
              @click="deleteHandle(scope.row.equipId)"
            >
              <i class="el-icon-delete istyle"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="新增下级" placement="top">
            <el-button
              v-if="isAuth(OPTAUTH_ADD) && scope.row.isVirtual == 0"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row,true,'lower',scope.row.equipName)"
            >
              <i class="el-icon-circle-plus istyle"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="新增虚拟" placement="top">
            <el-button
              v-if="isAuth(OPTAUTH_ADD)  && scope.row.isVirtual == 0"
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row,true,'dummy',scope.row.equipName)"
            >
              <i class="el-icon-circle-plus-outline istyle"></i>
            </el-button>
          </el-tooltip>
          <!-- <el-button type="text" size="small" @click="dataHandle(scope.row.equipId)">数据配置</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix"></div>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <el-dialog
      :title="!dataForm.id ||falg==true? (addType=='lower'?'新增下级设备':(addType=='dummy'?'增加虚拟设备':'新增' )): '修改'"
      :close-on-click-modal="false"
      ref="addOrUpdate"
      :visible.sync="visible"
      :close="cancel"
    >
      <el-form
        :model="dataForm"
        :rules="dataRule"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="100px"
      >
        <el-form-item label="归属类型" prop="affiliateId">
          <el-select v-model="dataForm.affiliateId" placeholder="归属类型">
            <!-- :disabled="!dataForm.id ? true:false" -->
            <el-option
              v-for="item in affiliateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-if="!dataForm.id ? true:false" v-model="dataForm.affiliateId" :disabled="true">
          </el-input>-->
        </el-form-item>
        <el-form-item label="组织机构" prop="orgSelect">
          <el-cascader
            :options="dataForm.orgOptions"
            v-model="dataForm.orgSelect"
            @change="handleChange1()"
            change-on-select
          ></el-cascader>
          <!-- <el-input v-if="!dataForm.id ? true:false" v-model="dataForm.orgName">
          </el-input>-->
        </el-form-item>
        <el-form-item label="站点" prop="stationId">
          <el-select
            v-model="dataForm.stationId"
            placeholder="选择站点"
            :disabled="dataForm.affiliateId==1"
            @change="handleChange2"
            @click.native="handleChange1()"
            clearable
          >
            <el-option
              v-for="item in dataForm.stationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-if="!dataForm.id ? true:false" v-model="dataForm.stationName" :disabled="true">
          </el-input>-->
        </el-form-item>
        <el-form-item label="楼层/房间" prop="floorId">
          <!--  <el-select v-model="dataForm.floorId" placeholder="无" :disabled="dataForm.affiliateId!=3 && dataForm.affiliateId!=4 ">
            <el-option v-for="item in dataForm.floorOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>-->
          <el-cascader
            @click.native="handleChange2()"
            :options="dataForm.floorOptions"
            v-model="dataForm.floorSelect"
            change-on-select
            :disabled="dataForm.affiliateId!='3' && dataForm.affiliateId!='4' "
            clearable
          ></el-cascader>
          <!-- <el-input v-if="!dataForm.id ? true:false" v-model="dataForm.floorName" :disabled="true">
          </el-input>-->
        </el-form-item>
        <el-form-item label="系统" prop="sysFormSelect">
          <el-cascader
            :options="dataForm.systemOptions"
            v-model="dataForm.sysFormSelect"
            @change="changeFormSys"
            change-on-select
            placeholder="选择系统"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="通信设备" prop="commId">
          <el-select v-model="dataForm.commId" placeholder="请选择" @change="changeComm" @click.native="getConditionComm()">
            <el-option
              v-for="item in dataForm.commOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯地址" prop="commAddress">
          <el-input v-model="dataForm.commAddress" placeholder></el-input>
        </el-form-item>
        <el-form-item label="设备SN码" prop="equipSn">
          <el-input v-model="dataForm.equipSn" placeholder></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="equipTypeId">
          <el-select v-model="dataForm.equipTypeId" placeholder="请选择">
            <el-option
              v-for="item in dataForm.equipTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="equipName">
          <el-input v-model="dataForm.equipName" placeholder></el-input>
        </el-form-item>
        <!-- <el-form-item label="设备编号" prop="equipCode">
          <el-input v-model="dataForm.equipCode" placeholder=""></el-input>
        </el-form-item>-->
        <el-form-item label="是否总线" prop="isBus" class="radioWid">
          <el-radio v-model="dataForm.isBus" label="0">否</el-radio>
          <el-radio v-model="dataForm.isBus" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="是否虚拟设备" prop="isVirtual" class="radioWid">
          <el-radio v-model="dataForm.isVirtual" label="0">否</el-radio>
          <el-radio v-model="dataForm.isVirtual" label="1">是</el-radio>
        </el-form-item>
        <el-form-item label="是否可调节" prop="adiustableStatus" class="radioWid">
          <el-radio v-model="dataForm.adiustableStatus" label="0">不可调节</el-radio>
          <el-radio v-model="dataForm.adiustableStatus" label="1">可调节</el-radio>
        </el-form-item>
        <el-form-item label="调节裕度" prop="adiustableMargin">
          <el-input-number v-model="dataForm.adiustableMargin" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="设备机能" prop="energyFunction">
          <el-select v-model="dataForm.energyFunction" placeholder="请选择">
            <el-option
              v-for="item in energyfunctionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能源种类" prop="energyId">
          <el-select v-model="dataForm.energyId" placeholder="请选择">
            <el-option
              v-for="item in dataForm.ENERGYOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能源方向" prop="energyDirection">
          <el-select v-model="dataForm.energyDirection" placeholder="请选择">
            <el-option
              v-for="item in energyDirection_Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级设备" prop="parentId" v-if="addType=='lower'">
          <!-- <el-select v-model="dataForm.parentId" placeholder="请选择">
            <el-option v-for="item in dataForm.PARENTOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>-->
          <el-input v-model="dataForm.parentName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="实际设备" prop="physicalId" v-if="addType == 'dummy'">
          <!-- <el-select v-model="dataForm.physicalIdName" placeholder="请选择">
            <el-option v-for="item in dataForm.PHYSICALOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>-->
          <el-input v-model="dataForm.parentName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="用途类型" prop="useType">
          <el-select v-model="dataForm.useType" placeholder="请选择">
            <el-option
              v-for="item in dataForm.useTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用状态" prop="useStatus" class="ellipsis">
          <el-select v-model="dataForm.useStatus" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备成本" prop="equipCost">
          <el-input-number v-model="dataForm.equipCost" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="生产日期">
          <!-- <span>{{ dataForm.productionDate }}</span> -->
          <el-date-picker
            v-model="dataForm.productionDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="投运日期">
          <!-- <span>{{ dataForm.commissioningDate }}</span> -->
          <el-date-picker
            v-model="dataForm.commissioningDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="新增数量" v-if="!dataForm.id ? true:false">
          <el-input-number v-model="dataForm.addNum" :step="1" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <!-- <el-button type="info" class="detail" size="small">设备详情</el-button> -->
        <el-switch
          style="display: block"
          v-model="detailSwitch"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="编辑详细信息"
          inactive-text="不编辑详细信息"
          class="detail"
          :disabled="isDetail"
        ></el-switch>
        <el-form :model="detailForm" ref="detailForm" label-width="100px" v-if="detailSwitch">
          <!-- 具体的设备设置 -->
          <!-- 配电 -->
          <div class="distribution" v-if="currentFormSys==1 ">
            <el-form-item label="额定功率" prop="nomP">
              <el-input-number v-model="detailForm.nomP" :step="1" :min="0" :max="100">%</el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input-number v-model="detailForm.nomV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="额定电流" prop="nomC">
              <el-input-number v-model="detailForm.nomC" :step="1" :min="0">A</el-input-number>
            </el-form-item>
          </div>
          <!-- 电蓄热锅炉 -->
          <div class="electricHeat" v-if="currentFormSys==5">
            <el-form-item label="工作模式" prop="workMode">
              <el-select v-model="detailForm.workMode" placeholder="请选择">
                <el-option
                  v-for="item in workModeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="额定功率" prop="nomP">
              <el-input-number v-model="detailForm.nomP" :step="1" :min="0" :max="100">%</el-input-number>
            </el-form-item>
            <el-form-item label="最大功率" prop="maxP">
              <el-input-number v-model="detailForm.maxP" :step="1" :min="0" :max="100">%</el-input-number>
            </el-form-item>
            <el-form-item label="最小功率" prop="minP">
              <el-input-number v-model="detailForm.minP" :step="1" :min="0" :max="100">%</el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input v-model="detailForm.nomV" placeholder></el-input>
            </el-form-item>
            <el-form-item label="额定电流" prop="nomC">
              <el-input v-model="detailForm.nomC" placeholder></el-input>
            </el-form-item>
            <el-form-item label="额定蓄热量" prop="nomJoule">
              <el-input v-model="detailForm.nomJoule" placeholder>J</el-input>
            </el-form-item>
            <el-form-item label="额定频率" prop="nomF">
              <el-input v-model="detailForm.nomF" placeholder></el-input>
            </el-form-item>
            <el-form-item label="额定内压" prop="nomPressure">
              <el-input v-model="detailForm.nomPressure" placeholder>Pa</el-input>
            </el-form-item>
            <el-form-item label="热水容量" prop="nomCapacity">
              <el-input v-model="detailForm.nomCapacity" placeholder>L</el-input>
            </el-form-item>
            <el-form-item label="额定蓄热温度" prop="nomTemp">
              <el-input v-model="detailForm.nomTemp" placeholder></el-input>
            </el-form-item>
            <el-form-item label="防护等级" prop="protectionRank">
              <el-input v-model="detailForm.protectionRank" placeholder></el-input>
            </el-form-item>
            <el-form-item label="蓄热材料体积" prop="mediaVolume">
              <el-input v-model="detailForm.mediaVolume" placeholder></el-input>
            </el-form-item>
            <el-form-item label="蓄热材料密度" prop="mediaDensity">
              <el-input v-model="detailForm.mediaDensity" placeholder></el-input>
            </el-form-item>
            <el-form-item label="蓄热材料比热容" prop="mediaShy">
              <el-input v-model="detailForm.mediaShy" placeholder></el-input>
            </el-form-item>
          </div>
          <!-- 分布式光伏 -->
          <div class="distributedPV" v-if="currentFormSys==64">
            <el-form-item label="最大输出功率" prop="maxP">
              <el-input-number v-model="detailForm.maxP" :step="1" :min="0" :max="100">%</el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input-number v-model="detailForm.nomV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="额定电流" prop="nomC">
              <el-input-number v-model="detailForm.nomC" :step="1" :min="0">A</el-input-number>
            </el-form-item>
            <el-form-item label="额定频率" prop="nomF">
              <el-input v-model="detailForm.nomF" placeholder></el-input>
            </el-form-item>
          </div>
          <!-- 分布式储能 -->
          <div class="distributedEnergyStorage" v-if="currentFormSys==128">
            <el-form-item label="电池容量" prop="nomCapacity">
              <el-input v-model="detailForm.nomCapacity" placeholder></el-input>
            </el-form-item>
            <el-form-item label="soc门限下限值" prop="minSoc">
              <el-input v-model="detailForm.minSoc" placeholder></el-input>
            </el-form-item>
            <el-form-item label="soc门限上限值" prop="maxSoc2">
              <el-input v-model="detailForm.maxSoc2" placeholder></el-input>
            </el-form-item>
            <el-form-item label="效率" prop="efficiency">
              <el-input v-model="detailForm.efficiency" placeholder>%</el-input>
            </el-form-item>
            <el-form-item label="最小输出电压" prop="minV">
              <el-input v-model="detailForm.minV" placeholder></el-input>
            </el-form-item>
            <el-form-item label="最大输出电压" prop="maxV">
              <el-input v-model="detailForm.maxV" placeholder></el-input>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input v-model="detailForm.nomV" placeholder></el-input>
            </el-form-item>
            <el-form-item label="最大充电电压" prop="maxChargeV">
              <el-input v-model="detailForm.maxChargeV" placeholder></el-input>
            </el-form-item>
            <el-form-item label="持续充放电功率" prop="continutyP">
              <el-input v-model="detailForm.continutyP" placeholder></el-input>
            </el-form-item>
            <el-form-item label="冷却方式" prop="coolMethod">
              <el-select v-model="detailForm.coolMethod" placeholder="请选择">
                <el-option
                  v-for="item in coolMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 燃气蓄热锅炉 -->
          <div class="gasFiredBoiler" v-if="currentFormSys==6"></div>
          <!-- 插座 -->
          <div class="socket" v-if="currentFormSys==4">
            <el-form-item label="连接负荷类型" prop="loadType">
              <!-- <el-input v-model="detailForm.loadType" placeholder=""></el-input> -->
              <el-select v-model="detailForm.loadType" placeholder="请选择">
                <el-option
                  v-for="item in loadTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最大电流" prop="maxA">
              <el-input-number v-model="detailForm.maxA" :step="1" :min="0">A</el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input-number v-model="detailForm.nomV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
          </div>
          <!-- 电开水炉 -->
          <div class="waterBoiler" v-if="currentFormSys==7"></div>
          <!-- 水设备 -->
          <div class="waterEquipment" v-if="currentFormSys==512"></div>
          <!-- 地源热泵设备 -->
          <div class="GSHP" v-if="currentFormSys==8"></div>
          <!-- 气设备 -->
          <div class="gasEquipment" v-if="currentFormSys==1024"></div>
          <!-- 空气源热泵设备 -->
          <div class="ASHP" v-if="currentFormSys==9"></div>
          <!-- 冰蓄冷设备 -->
          <div class="iceStorage" v-if="currentFormSys==10"></div>
          <!-- 空调设备 -->
          <div
            class="airConditioner"
            v-if="dataForm.subSystemCode==1||dataForm.subSystemCode==2||dataForm.subSystemCode==3||dataForm.subSystemCode==4"
          >
            <el-form-item label="空调类型" prop="acWay">
              <el-select v-model="detailForm.acWay" placeholder="请选择">
                <el-option
                  v-for="item in acWayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作模式" prop="acMode">
              <el-select v-model="detailForm.acMode" placeholder="请选择">
                <el-option
                  v-for="item in acModeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系统类型" prop="acType">
              <el-select v-model="detailForm.acType" placeholder="请选择">
                <el-option
                  v-for="item in acTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="制冷额定功率" prop="nomCoolP">
              <el-input-number v-model="detailForm.nomCoolP" :step="1" :min="0">P</el-input-number>
            </el-form-item>
            <el-form-item label="制热额定功率" prop="nomHeatP">
              <el-input-number v-model="detailForm.nomHeatP" :step="1" :min="0">P</el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input-number v-model="detailForm.nomV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="额定电流" prop="nomC">
              <el-input-number v-model="detailForm.nomC" :step="1" :min="0">A</el-input-number>
            </el-form-item>
            <el-form-item label="额定频率" prop="nomF">
              <el-input-number v-model="detailForm.nomF" :step="1" :min="0">Hz</el-input-number>
            </el-form-item>
            <el-form-item label="制冷效率" prop="eer">
              <el-input-number v-model="detailForm.eer" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="制热效率" prop="cop">
              <el-input-number v-model="detailForm.cop" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="负荷率限定值" prop="loadRateLimit">
              <el-input-number v-model="detailForm.loadRateLimit" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="室内制冷" prop="roomArea">
              <el-input-number v-model="detailForm.roomArea" :step="1" :min="0">㎡</el-input-number>
            </el-form-item>
            <el-form-item label="能量损失系数" prop="lossFactor">
              <el-input-number v-model="detailForm.lossFactor" :step="0.1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="是否支持变频" prop="freCon" class="radioWid">
              <el-radio v-model="detailForm.freCon" label="0">不支持</el-radio>
              <el-radio v-model="detailForm.freCon" label="1">支持</el-radio>
            </el-form-item>
            <el-form-item label="控制模式" prop="conMethod">
              <el-select v-model="detailForm.conMethod" placeholder="请选择">
                <el-option
                  v-for="item in conMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 照明设备 -->
          <div class="lighting" v-if="currentFormSys==2">
            <el-form-item label="额定功率" prop="nomPw">
              <el-input-number v-model="detailForm.nomPw" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="额定电压" prop="nomV">
              <el-input-number v-model="detailForm.nomV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
          </div>
          <!-- 充电桩设备 -->
          <div class="chargingPile" v-if="currentFormSys==256">
            <el-form-item label="能量补给类型" prop="energyType">
              <el-select v-model="detailForm.energyType" placeholder="请选择">
                <el-option
                  v-for="item in energyTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="额定功率" prop="nomPw">
              <el-input-number v-model="detailForm.nomPw" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="最小电压" prop="minV">
              <el-input-number v-model="detailForm.minV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="最大电压" prop="maxV">
              <el-input-number v-model="detailForm.maxV" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="额定电流" prop="nomC">
              <el-input-number v-model="detailForm.nomC" :step="1" :min="0">V</el-input-number>
            </el-form-item>
            <el-form-item label="软件版本号" prop="softVer">
              <el-input v-model="detailForm.softVer" placeholder></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import treeGrid from "@/components/tree-grid";
import lazyTree from "@/components/lazy-tree";
import TableTreeColumn from "@/components/table-tree-column";
export default {
  components: {
    treeGrid,
    lazyTree,
    TableTreeColumn
  },
  data() {
    return {
      cpDetailForm: [], //复制详情表单
      getColumns: [],
      toRightArr: [],
      tableHead: [],
      selfTable: false,
      oldColumn: [
        /* {
              "dataIndex":"equipCode",
              "text":"设备编号"
          }, */
        {
          dataIndex: "affiliateName",
          text: "归属类型"
        },
        {
          dataIndex: "orgName",
          text: "组织机构",
          width: "120"
        },
        {
          dataIndex: "stationName",
          text: "站点"
        },
        {
          dataIndex: "floorName",
          text: "楼层/房间",
          width: "100"
        },
        {
          dataIndex: "systemName",
          text: "系统"
        },
        {
          dataIndex: "subSystemName",
          text: "子系统",
          width: "120"
        },
        {
          dataIndex: "commEquipName",
          text: "通信设备"
        },
        {
          dataIndex: "commAddress",
          text: "通讯地址"
        },
        {
          dataIndex: "equipSn",
          text: "SN码"
        },
        {
          dataIndex: "equipTypeName",
          text: "设备类型"
        },
        {
          dataIndex: "busName",
          text: "是否总线"
        },
        {
          dataIndex: "virtualName",
          text: "是否虚拟"
        },
        {
          dataIndex: "adiustableName",
          text: "是否调节"
        },
        {
          dataIndex: "adiustableMargin",
          text: "调节裕度"
        },
        {
          dataIndex: "funtionName",
          text: "设备机能"
        },
        {
          dataIndex: "energyName",
          text: "能源种类"
        },
        {
          dataIndex: "directionName",
          text: "能源方向"
        },
        {
          dataIndex: "parentName",
          text: "上级设备"
        },

        {
          dataIndex: "physicalName",
          text: "实际设备"
        },
        {
          dataIndex: "useTypeName",
          text: "用途类型"
        },
        {
          dataIndex: "useStatusName",
          text: "使用状态"
        },
        {
          dataIndex: "equipCost",
          text: "设备成本"
        },
        {
          dataIndex: "productionDate",
          text: "生产日期",
          width: "160"
        },
        {
          dataIndex: "commissioningDate",
          text: "投运日期",
          width: "160"
        }
      ],
      addType: "",
      falg: false,
      columns: [], //动态表头
      ckColumns: [],
      conOrgOption: [], //组织机构联级框
      conSiteOption: [], //站点联级框
      conFloorOption: [], //楼层联级框
      selectedOrg: [],
      selectedSite: null,
      selectedFloor: [],
      selectIndex: "",
      isDetail: true,
      detailSwitch: false,
      currentFormSys: "", //当前修改|增加联级框选择的最后一层系统
      searchCon: "", //搜索内容
      systemCode: null,
      subSystemCode: null,
      clickNode: null,
      selectSys: [],
      selectEquipType: null,
      selectComm: null,
      props1: {
        label: "label",
        children: "zones",
        isLeaf: "leaf"
      },
      loadTypeOptions: [
        {
          value: "1",
          label: "空调"
        },
        {
          value: "2",
          label: "热水器"
        },
        {
          value: "3",
          label: "风机"
        },
        {
          value: "4",
          label: "水泵"
        }
      ],
      energyDirection_Options: [
        {
          value: "1",
          label: "外部"
        },
        {
          value: "2",
          label: "内部"
        }
      ],
      energyfunctionOptions: [
        {
          value: "1",
          label: "用能"
        },
        {
          value: "2",
          label: "储能/供能"
        },
        {
          value: "3",
          label: "产能"
        }
      ],
      affiliateOptions: [
        {
          value: "1",
          label: "组织机构"
        },
        {
          value: "2",
          label: "站点"
        },
        {
          value: "3",
          label: "楼层"
        },
        {
          value: "4",
          label: "房间"
        }
      ],
      treeData: [],
      statusOptions: [
        {
          value: "1",
          label: "未投运"
        },
        {
          value: "2",
          label: "投运"
        },
        {
          value: "3",
          label: "保养"
        },
        {
          value: "4",
          label: "检修"
        },
        {
          value: "5",
          label: "停用"
        },
        {
          value: "6",
          label: "报废"
        }
      ],
      workModeOptions: [
        {
          value: "1",
          label: "速热"
        },
        {
          value: "2",
          label: "快热"
        },
        {
          value: "3",
          label: "经济"
        },
        {
          value: "4",
          label: "保温"
        }
      ],
      coolMethodOptions: [
        {
          value: "1",
          label: "水冷"
        }
      ],
      acWayOptions: [
        {
          value: "1",
          label: "集中式"
        },
        {
          value: "2",
          label: "分散式"
        }
      ],
      acModeOptions: [
        {
          value: "1",
          label: "制冷"
        },
        {
          value: "2",
          label: "制热"
        },
        {
          value: "3",
          label: "通风"
        },
        {
          value: "4",
          label: "除湿"
        }
      ],
      acTypeOptions: [
        {
          value: "1",
          label: "水冷"
        },
        {
          value: "2",
          label: "风冷"
        },
        {
          value: "3",
          label: "多联机"
        }
      ],
      conMethodOptions: [
        {
          value: "1",
          label: "本地控制"
        },
        {
          value: "2",
          label: "远程控制"
        }
      ],
      energyTypeOptions: [
        {
          value: "1",
          label: "单项交流"
        },
        {
          value: "2",
          label: "三相交流"
        },
        {
          value: "3",
          label: "直流"
        }
      ],
      radio: "",
      dataForm: {
        addNum: 1,
        equipId: "",
        affiliateId: "1",
        orgId: null,
        floorId: null,
        systemCode: null,
        subSystemCode: null,
        commId: null,
        equipTypeId: null,
        energyId: null,
        parentId: null,
        useType: null,

        orgName: "",
        stationId: null,
        stationName: "",
        floorName: "",
        sysFormSelect: [],
        commEquipName: "",
        equipTypeName: "",
        equipName: "",
        equipCode: "",
        isBus: "0",
        isVirtual: "0",
        adiustableStatus: "0",
        adiustableMargin: "100",
        energyFunction: "",
        energyName: "",
        energyDirection: "",
        parentId: "",
        physicalIdName: "",
        commAddress: "",
        equipSn: "",
        useTypeName: "",
        useStatus: "",
        equipCost: "100",
        productionDate: "",
        commissioningDate: "",
        PHYSICALOptions: [],
        useTypeOptions: [],
        ENERGYOptions: [],
        equipTypeOptions: [],
        commOptions: [],
        systemOptions: [],
        floorOptions: [],
        stationOptions: [],
        orgOptions: [],
        orgSelect: [],
        floorSelect: [],
        siteSelect: []
      },
      workModeOptions: [
        {
          value: "1",
          label: "速热"
        },
        {
          value: "2",
          label: "快热"
        },
        {
          value: "3",
          label: "经济"
        },
        {
          value: "4",
          label: "保温"
        }
      ],
      coolMethodOptions: [
        {
          value: "1",
          label: "水冷"
        }
      ],
      acWayOptions: [
        {
          value: "1",
          label: "集中式"
        },
        {
          value: "2",
          label: "分散式"
        }
      ],
      acModeOptions: [
        {
          value: "1",
          label: "制冷"
        },
        {
          value: "2",
          label: "制热"
        },
        {
          value: "3",
          label: "通风"
        },
        {
          value: "4",
          label: "除湿"
        }
      ],
      acTypeOptions: [
        {
          value: "1",
          label: "水冷"
        },
        {
          value: "2",
          label: "风冷"
        },
        {
          value: "3",
          label: "多联机"
        }
      ],
      conMethodOptions: [
        {
          value: "1",
          label: "本地控制"
        },
        {
          value: "2",
          label: "远程控制"
        }
      ],
      energyTypeOptions: [
        {
          value: "1",
          label: "单项交流"
        },
        {
          value: "2",
          label: "三相交流"
        },
        {
          value: "3",
          label: "直流"
        }
      ],
      radio: "",

      //设备子表表单数据
      detailForm: {
        equipId: null,
        nomP: null,
        nomV: null,
        nomC: null,
        workMode: null,
        maxP: null,
        minP: null,
        nomJoule: null,
        nomF: null,
        nomPressure: null,
        nomCapacity: null,
        nomTemp: null,
        protectionRank: null,
        mediaVolume: null,
        mediaDensity: null,
        mediaShy: null,
        minSoc: null,
        maxSoc2: null,
        efficiency: null,
        minV: null,
        maxV: null,
        maxChargeV: null,
        continutyP: null,
        coolMethod: null,
        loadType: null,
        maxA: null,
        acWay: null,
        acMode: null,
        acType: null,
        nomCoolP: null,
        nomHeatP: null,
        eer: null,
        cop: null,
        loadRateLimit: null,
        roomArea: null,
        lossFactor: null,
        freCon: null,
        conMethod: null,
        nomPw: null,
        energyType: null,
        softVer: null
      },

      dataSetForm: {},
      // dataSetTable: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      options1: [],
      selectedOptions1: "",
      sysOptons: [],
      visible: false, //信息配置
      typeOptions: [], //设备类型下拉框数组
      commOptions: [], //通讯设备下拉框数组
      // dataVisible: false, //数据配置
      dataRule: {
        equipName: [
          {
            required: true,
            message: "设备名不能为空",
            trigger: "blur"
          }
        ],
        /* equipCode: [{
            required: true,
            message: '设备编号不能为空',
            trigger: 'blur'
          }], */
        energyId: [
          {
            type: "string",
            required: true,
            message: "能源种类不能为空",
            trigger: "change"
          }
        ],
        energyDirection: [
          {
            type: "string",
            required: true,
            message: "能源方向不能为空",
            trigger: "change"
          }
        ],
        useStatus: [
          {
            type: "string",
            required: true,
            message: "设备使用状态不能为空",
            trigger: "change"
          }
        ],
        equipCost: [
          {
            required: true,
            message: "设备成本不能为空",
            trigger: "change"
          }
        ]
      }
      // dataSource: [],
    };
  },
  computed: {
    comOldColumn: {
      get() {
        return this.$store.state.columns.oldColumns;
      },
      set(val) {
        this.$store.commit("columns/updateOldColumns", val);
      }
    }
  },
  created() {
    this.cpDetailForm = Object.assign({}, this.detailForm);
    // console.log(this.cpDetailForm);
    this.init();

    this.getDataList();
  },
  mounted() {
    // document.addEventListener('click', (e)=> {
    //   console.log(e)
    //   if (e.target.className != 'el-transfer tableTransfer' && e.target.innerText != "自定义列表") {
    //     this.selfTable = false;
    //   }
    // })
  },
  watch: {
    "dataForm.sysFormSelect": "listenSys",
    getColumns: "listenGetColumns",
    /**
     * 监听 新增/修改 页面组 织机构选框值改变 清空站点、楼层选框的值
     * 1: 组织机构 ； 2： 站点； 3： 楼层； 4： 房间
     * 站点选框值：dataForm.stationId；站点下拉框值：dataForm.stationOptions; 楼层/房间选框值：dataForm.floorOptions；楼层/房间下拉框：dataForm.floorSelect
     */
    'dataForm.affiliateId': function (val) {
      if(val == 1) {
        this.dataForm.stationId = null
        this.dataForm.stationOptions = []
        this.dataForm.floorOptions = []
        this.dataForm.floorSelect = []
      } else if(val == 2 || val == 3 || val ==4) {
        this.dataForm.floorOptions = []
        this.dataForm.floorSelect = []
      }
    }
  },
  methods: {
    // 获取通信设备下拉框
    getConditionComm () {
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/condition/comm"),
        method: "post",
        data: this.$http.adornData({
          orgId: this.dataForm.orgSelect[this.dataForm.orgSelect.length - 1],
          stationId: this.dataForm.stationId
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.commOptions = data.list;
        }
      });
    },
    changeComm(val) {
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/commAddress"),
        method: "post",
        data: this.$http.adornParams({
          commId: val
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataForm.commAddress = data.data;
        }
      });
    },
    listenGetColumns() {
      // console.log(this.getColumns)
      this.columns = this.oldColumn.concat(this.getColumns);
      // this.ckColumns =this.columns
      // console.log(this.columns)
    },
    changeColumns(a, b, val) {
      if (b == "right") {
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < this.columns.length; j++) {
            if (this.columns[j].dataIndex == val[i]) {
              this.columns.splice(j, 1);
            }
          }
        }
      } else if (b == "left") {
        for (var i = 0; i < val.length; i++) {
          for (var j = 0; j < this.ckColumns.length; j++) {
            if (this.ckColumns[j].dataIndex == val[i]) {
              this.columns.splice(j, 0, this.ckColumns[j]);
            }
          }
        }
      }
    },
    listenSys() {
      if (
        this.dataForm.sysFormSelect.length > 0 &&
        this.dataForm.sysFormSelect[0] != "" &&
        this.dataForm.sysFormSelect[0] != null
      ) {
        this.isDetail = false;
      } else {
        this.isDetail = true;
      }
    },
    //组织机构联级框change事件
    conditionOrg(val) {
      //站点下拉框
      this.$http({
        url: this.$http.adornUrl("/admin/tstation/station"),
        method: "post",
        data: this.$http.adornParams({
          orgId: val[val.length - 1]
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.conSiteOption = data.list;
        }
      });
    },
    //站点联级框change事件
    conditionSite(val) {
      //楼层下拉框
      this.$http({
        url: this.$http.adornUrl("/admin/tfloor/floors"),
        method: "post",
        data: this.$http.adornParams({
          stationId: val
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.conFloorOption = data.list;
        }
      });
    },
    // 获取子信息
    getDetails(val, lv) {
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/equiplist"),
        method: "post",
        data: this.$http.adornParams({
          equipId: val,
          level: lv.toString()
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = this.dataList.splice(0, this.selectIndex + 1).concat(data.list).concat(this.dataList);
          // console.log(this.dataList)
        } else {
          this.dataSource = [];
        }
        this.dataListLoading = false;
      });
    },
    expandedHandle(index, row, expanded) {
      this.selectIndex = index;
      if (expanded) {
        this.getDetails(row.equipId, row.level);
      } else {
        this.dataList = this.$refs.child.removeChildNode(
          this.dataList,
          row.equipId
        );
        // this.dataList = this.removeChildNode(this.dataList,row.codeId)
      }
    },
    changeFormSys(val) {
      // this.currentFormSys = val[val.length-1]
      if (this.dataForm.sysFormSelect[0] == "8") {
        this.currentFormSys = this.dataForm.sysFormSelect[0];
      } else {
        this.currentFormSys = this.dataForm.sysFormSelect[
          this.dataForm.sysFormSelect.length - 1
        ];
      }
      if (val.length > 1) {
        (this.dataForm.systemCode = val[0]),
          (this.dataForm.subSystemCode = val[val.length - 1]);
        // this.subSystemCode = val[val.length-1]
      } else {
        this.dataForm.systemCode = val[0];
        this.dataForm.subSystemCode = null;
        // this.subSystemCode = null
      }
    },
    //搜索条件数据
    init() {
      this.$http({
        url: this.$http.adornUrl("/admin/tstation/org"),
        method: "post",
        data: this.$http.adornParams({
          orgId: this.$store.state.user.orgId
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.conOrgOption = data.list;
          this.selectedOrg = new Array(this.$store.state.user.orgId);
        }
      });
      this.$http({
        url: this.$http.adornUrl("/admin/tstation/station"),
        method: "post",
        data: this.$http.adornParams({
          orgId: this.$store.state.user.orgId
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.conSiteOption = data.list;
        }
      });
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/condition/system"),
        method: "post",
        data: this.$http.adornData({
          orgId: this.$store.state.user.orgId
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.sysOptons = data.list;
          // this.selectSys = new Array(data.list[0].value)
        }
      });

      this.$http({
        url: this.$http.adornUrl("/admin/tequip/condition/type"),
        method: "post",
        data: this.$http.adornData({
          orgId: this.$store.state.user.orgId
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.typeOptions = data.list;
        }
      });
      // 选择通讯设备
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/condition/comm"),
        method: "post",
        data: this.$http.adornData({
          orgId: this.$store.state.user.orgId,
          stationId: this.selectedSite
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          this.commOptions = data.list;
        }
      });
    },

    //搜索条件数据-组织机构
    handleChange1(value) {
      // console.log(this.dataForm.orgSelect);
      //站点下拉框
      this.$http({
        url: this.$http.adornUrl("/admin/tstation/station"),
        method: "post",
        data: this.$http.adornParams({
          orgId: this.dataForm.orgSelect[this.dataForm.orgSelect.length - 1],
          type: 2
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataForm.stationOptions = data.list;
        }
      });
    },
    handleChange2(value) {
      //楼层房间下拉框
      this.$http({
        url: this.$http.adornUrl("/admin/tfloor/floors"),
        method: "post",
        data: this.$http.adornParams({
          // stationId: value
          stationId: this.dataForm.stationId
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          if (this.dataForm.affiliateId == "3") {
            for (let i = 0; i < data.list.length; i++) {
              data.list[i].children = null;
            }
            this.dataForm.floorOptions = data.list;
          } else {
            this.dataForm.floorOptions = data.list;
          }
        }
      });
    },
    //检索条件-系统
    sysChange(value) {
      if (this.selectSys.length === 1) {
        this.systemCode = this.selectSys[0];
        this.subSystemCode = null;
      } else if (this.selectSys.length === 2) {
        this.systemCode = this.selectSys[0];
        this.subSystemCode = this.selectSys[1];
      } else {
        this.systemCode = null;
        this.subSystemCode = null;
      }
    },

    // 获取数据列表
    getDataList(params) {
      if (params) {
        this.pageIndex = 1;
      }
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/admin/tequip/list"),
        // url: this.$http.adornUrl('/management/device-info/devices'),
        method: "post",
        data: this.$http.adornData({
          page: this.pageIndex.toString(),
          limit: this.pageSize.toString(),
          orgId:
            this.selectedOrg.length > 0
              ? this.selectedOrg[this.selectedOrg.length - 1]
              : this.$store.state.user.orgId,
          stationId: this.selectedSite,
          floorId:
            this.selectedFloor.length > 0
              ? this.selectedFloor[this.selectedFloor.length - 1]
              : null,
          systemCode: this.systemCode,
          subSystemCode: this.subSystemCode,
          commId: this.selectComm ? this.selectComm.toString() : null,
          equipTypeId: this.selectEquipType
            ? this.selectEquipType.toString()
            : null,
          equipName: this.searchCon == "" ? null : this.searchCon
          // "id": this.clickNode
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          // this.dataList = data.page.list
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
          this.columns = this.oldColumn;
          // this.columns = this.$store.state.user.oldColumns
          this.ckColumns = this.columns;
          this.$http({
            url: this.$http.adornUrl("/admin/tequip/child/equipChildren"),
            method: "post",
            data: this.$http.adornData({
              systemCode:this.systemCode == null ? null : this.systemCode.toString(),
              subSystemCode:this.subSystemCode == null ? null : this.subSystemCode.toString()
            })
          }).then(({ data }) => {
            if (data && data.code == 0) {
              this.getColumns = data.list;
              this.columns = this.oldColumn.concat(this.getColumns);
              this.ckColumns = this.columns;
            }
          });
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(row, falg, type, name) {
      // console.log(this.dataForm);
      this.falg = falg;
      this.addType = type;
      this.dataForm.parentName = name;
      // this.detailForm =this.cpDetailForm
      this.detailForm = Object.assign({}, this.cpDetailForm);
      this.visible = true;
      this.detailSwitch = false;
      this.$nextTick(() => {
        this.dataForm.id = row ? row.equipId : 0;
        this.visible = true;
        this.$nextTick(() => {
          this.$refs["dataForm"].resetFields();
          this.dataForm.systemCode = null;
          this.dataForm.subSystemCode = null;

          if (this.$refs["detailForm"]) {
            this.$refs["detailForm"].resetFields();
          }
          this.dataForm.productionDate = null;
          this.dataForm.commissioningDate = null;
          this.selectedOptions1 = [];
          //组织机构下拉框
          this.dataForm.orgOptions = this.conOrgOption;
          this.dataForm.orgSelect = this.selectedOrg;
          //站点下拉框
          this.dataForm.stationOptions = this.conSiteOption;
          this.dataForm.siteSelect = this.selectedSite;
          /* let arr = this.conSiteOption.concat()
            arr.splice(0,1)
            this.dataForm.stationOptions = arr
            this.dataForm.siteSelect = this.selectedSite */
          //房间下拉框
          this.dataForm.floorOptions = this.conFloorOption;
          this.dataForm.floorSelect = this.selectedFloor;
          /* let arr2 = this.conFloorOption.concat()
            arr2.splice(0,1)
            this.dataForm.floorOptions = arr2
            this.dataForm.floorSelect = this.selectedFloor */
          //设备类型下拉框
          this.dataForm.equipTypeOptions = this.typeOptions;
          this.dataForm.selectEquipType = this.selectEquipType;
          /* let arr3 = this.typeOptions.concat()
            arr3.splice(0,1)
            this.dataForm.equipTypeOptions = arr3
            this.dataForm.selectEquipType = this.selectedFloor */
          //通讯设备下拉框
          // 选择通讯设备
          this.$http({
            url: this.$http.adornUrl("/admin/tequip/condition/comm"),
            method: "post",
            data: this.$http.adornData({
              orgId: this.selectedOrg[this.selectedOrg.length -1],
              stationId: this.selectedSite
            })
          }).then(({ data }) => {
            if (data && data.code == 0) {
              this.dataForm.commOptions = data.list;
              this.dataForm.selectComm = this.commOptions;
            }
          })
          
          /* let arr4 = this.typeOptions.concat()
            arr4.splice(0,1)
            this.dataForm.commOptions = arr4
            this.dataForm.selectComm = this.commOptions */
        });

        //修改
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl('/admin/tstation/orgName'),
            method: 'post',
            data: this.$http.adornData({
              orgId: row.orgId
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.orgSelect = data.list
            }else {
              this.dataForm.orgSelect = []
            }
          })
          this.$http({
            url: this.$http.adornUrl("/admin/tequip/select"),
            method: "post",
            data: this.$http.adornParams({
              equipId: row.equipId
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              //下拉框数据
              // this.dataForm.statusOptions = data.data.parent
              this.dataForm.useTypeOptions = data.data.useType;
              this.dataForm.PHYSICALOptions = data.data.physical;
              this.dataForm.PARENTOptions = data.data.parent;
              this.dataForm.ENERGYOptions = data.data.energy;
            }
          });

          this.$http({
            url: this.$http.adornUrl("/admin/tequip/condition/type"),
            method: "post",
            data: this.$http.adornData({
              equipId: row.equipId
            })
          }).then(({ data }) => {
            if (data && data.code == 0) {
              this.dataForm.equipTypeOptions = data.list;
            }
          });

          this.$http({
            url: this.$http.adornUrl("/admin/tequip/condition/system"),
            method: "post",
            data: this.$http.adornParams({
              equipId: row.equipId
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.systemOptions = data.list;
            }
          });

          this.$http({
            url: this.$http.adornUrl("/admin/tequip/info"),
            method: "post",
            data: this.$http.adornParams({
              equipId: row.equipId
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              // 获取楼层/房间下拉框值
              this.$http({
                url: this.$http.adornUrl("/admin/tfloor/floors"),
                method: "post",
                data: this.$http.adornParams({
                  stationId: data.tEquip.stationId.toString()
                })
              }).then(({ data }) => {
                if (data && data.code === 0) {
                  this.dataForm.floorOptions = data.list
                }
              })
              // 获取楼层/房间数组值
              this.$http({
                url: this.$http.adornUrl("/admin/tequip/floor"),
                method: "post",
                data: this.$http.adornParams({
                  floorId: data.tEquip.floorId.toString()
                })
              }).then(({ data }) => {
                if (data && data.code === 0) {
                  this.dataForm.floorSelect = data.info
                }
              });
              this.detailForm.equipId = data.tEquip.equipId;
              this.dataForm.orgId = data.tEquip.orgId;
              this.dataForm.floorId = data.tEquip.floorId == -1 ? null : data.tEquip.floorId.toString();
              // this.dataForm.floorSelect = data.tEquip.floorId == -1 ? [] : new Array(data.tEquip.floorId.toString())
              this.dataForm.systemCode = data.tEquip.systemCode;
              this.dataForm.subSystemCode = data.tEquip.subSystemCode;
              this.dataForm.commId = data.tEquip.commId ? data.tEquip.commId.toString() : null;
              this.dataForm.equipTypeId = data.tEquip.equipTypeId ? data.tEquip.equipTypeId.toString() : null;
              this.dataForm.commAddress = data.tEquip.commAddress;
              this.dataForm.equipSn = data.tEquip.equipSn;
              this.dataForm.energyId = data.tEquip.energyId;
              // this.dataForm.parentId = id
              // this.dataForm.parentId = data.tEquip.parentId
              // this.dataForm.physicalId = id
              this.dataForm.useType = data.tEquip.useType ? data.tEquip.useType.toString() : null;

              if (type || name) {
                this.dataForm.equipName = null;
                this.dataForm.equipCode = null;
              } else {
                this.dataForm.equipName = data.tEquip.equipName;
                this.dataForm.equipCode = data.tEquip.equipCode;
              }
              this.dataForm.useTypeName = data.tEquip.useTypeName;
              this.dataForm.adiustableMargin = data.tEquip.adiustableMargin;
              this.dataForm.useStatus = data.tEquip.useStatus ? data.tEquip.useStatus.toString() : null;
              this.dataForm.commissioningDate = data.tEquip.commissioningDate;
              this.dataForm.equipCost = data.tEquip.equipCost;
              this.dataForm.productionDate = data.tEquip.productionDate;
              this.dataForm.energyDirection = data.tEquip.energyDirection ? data.tEquip.energyDirection.toString() : null;
              // this.dataForm.physicalIdName = data.tEquip.physicalIdName

              this.dataForm.energyFunction = data.tEquip.energyFunction ? data.tEquip.energyFunction.toString() : null;
              this.dataForm.adiustableStatus = data.tEquip.adiustableStatus || data.tEquip.adiustableStatus === 0 ? data.tEquip.adiustableStatus.toString() : null;
              this.dataForm.isBus = data.tEquip.isBus || data.tEquip.isBus === 0 ? data.tEquip.isBus.toString() : null;
              if (this.addType == "dummy") {
                this.dataForm.isVirtual = "1";
              } else {
                this.dataForm.isVirtual = data.tEquip.isVirtual || data.tEquip.isVirtual === 0 ? data.tEquip.isVirtual.toString() : null;
              }
              this.dataForm.equipTypeName = data.tEquip.equipTypeName;
              this.dataForm.commEquipName = data.tEquip.commEquipName;
              this.dataForm.floorName = data.tEquip.floorName;
              this.dataForm.stationName = data.tEquip.stationName;
              this.dataForm.stationId = data.tEquip.stationId == -1 ? null : data.tEquip.stationId.toString();
              this.dataForm.affiliateId = data.tEquip.affiliateId ? data.tEquip.affiliateId.toString() : null;
              // let arr = [];
              // console.log(data.tEquip)
              // arr.push(data.tEquip.orgId);
              // this.dataForm.orgSelect = arr;
              // console.log(this.dataForm.orgSelect)
              let array = [];
              if (data.tEquip.subSystemCode) {
                array.push(data.tEquip.systemCode);
                array.push(data.tEquip.subSystemCode);
              } else {
                array.push(data.tEquip.systemCode);
              }
              this.dataForm.sysFormSelect = array;
              this.currentFormSys = array[array.length - 1] | null;
              if (
                this.dataForm.subSystemCode == 1 ||
                this.dataForm.subSystemCode == 2 ||
                this.dataForm.subSystemCode == 3 ||
                this.dataForm.subSystemCode == 4
              ) {
                this.currentFormSys = null;
              }
              //获取设备子表信息
              // console.log(this.detailForm);

              for (let i in data.tEquip.child) {
                var key = i; //得到key值
                var value = data.tEquip.child[i]; //得到对应key的value值
                this.detailForm[key] = value == null ? null : value.toString();
              }
            }
          });
        } else {
          this.$nextTick(() => {
            // this.dataForm.orgId= this.selectedOrg.length>0?this.getCascaderObj(this.selectedOrg, this.conOrgOption)[this.selectedOrg.length-1].value : null
            // this.dataForm.orgId = this.selectedOrg.join("")
            // this.dataForm.stationName = this.selectedSite.length>0? this.getCascaderObj(this.selectedSite, this.conSiteOption)[this.selectedSite.length-1].label : "无"
            // this.dataForm.stationId = this.selectedSite.join("")
            this.dataForm.stationId = this.selectedSite;
            // this.dataForm.floorName = this.selectedFloor.length>0? this.getCascaderObj(this.selectedFloor, this.floorOptions)[this.selectedFloor.length-1].label : "无"
            // this.dataForm.floorId = this.selectedFloor.join("")
            this.dataForm.equipName = null;
            if ( this.dataForm.stationId == "" || this.dataForm.stationId == null
            ) { 
              this.dataForm.affiliateId = "1";
            } else if ( this.dataForm.stationId != "" && this.selectedFloor.length == 0
            ) { 
              this.dataForm.affiliateId = "2";
            } else if (this.selectedFloor.length == 1) {
              this.dataForm.affiliateId = "3";
            } else if (this.selectedFloor.length == 2) {
              this.dataForm.affiliateId = "4";
            }
            // console.log(this.dataForm);
          });

          //弹框中下拉框数据
          this.$http({
            url: this.$http.adornUrl("/admin/tequip/condition/type"),
            method: "post",
            data: this.$http.adornData({
              id: this.clickNode
            })
          }).then(({ data }) => {
            if (data && data.code == 0) {
              this.dataForm.equipTypeOptions = data.list;
            }
          });

          this.$http({
            url: this.$http.adornUrl("/admin/tequip/select"),
            method: "post",
            data: this.$http.adornParams({
              id: this.clickNode
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              //下拉框数据
              // this.dataForm.statusOptions = data.data.parent
              this.dataForm.useTypeOptions = data.data.useType;
              this.dataForm.PHYSICALOptions = data.data.physical;
              this.dataForm.PARENTOptions = data.data.parent;
              this.dataForm.ENERGYOptions = data.data.energy;
            }
          });

          this.$http({
            url: this.$http.adornUrl("/admin/tequip/condition/system"),
            method: "post",
            data: this.$http.adornParams({
              id: this.clickNode
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.systemOptions = data.list;
            }
          });
        }
      });
    },
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.value == value) {
            opt = itm.children;
            return itm;
          }
        }
        return null;
      });
    },
    // 取消提交
    cancel() {
      this.visible = false;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.$refs["detailForm"]) {
          this.$refs["detailForm"].resetFields();
        }
      });
    },
    // 删除
    deleteHandle(id) {
      /* if (id) {
        id = parseInt(id);
      } */
      // console.log(this.dataListSelections)
      var ids = id ? [id] : this.dataListSelections.map(item => {
            return item.equipId.toString();
          });
      this.$confirm(`确定${id ? "删除" : "批量删除"}操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl("/admin/tequip/delete"),
            method: "post",
            data: this.$http.adornData(ids, false)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.getDataList();
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {}
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    },

    // 设备信息表单提交
    dataFormSubmit() {
      // console.log(this.dataForm);
      if (this.sign) {
        this.detailForm.equipId = this.dataForm.id;
      }
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          if (this.dataForm.id) {
            if (
              this.falg &&
              (this.addType == "lower" || this.addType == "dummy")
            ) {
              if (this.addType == "lower") {
                this.dataForm.parentId = this.dataForm.id;
              } else if (this.addType == "dummy") {
                this.dataForm.physicalId = this.dataForm.id;
              }
              this.$http({
                url: this.$http.adornUrl("/admin/tequip/save"),
                method: "post",
                data: this.$http.adornData({
                  affiliateId: this.dataForm.affiliateId,
                  orgId: this.dataForm.orgSelect[
                    this.dataForm.orgSelect.length - 1
                  ],
                  stationId: this.dataForm.stationId,
                  // floorId: this.dataForm.floorId,
                  floorId: this.dataForm.floorSelect[this.dataForm.floorSelect.length -1],
                  systemCode: this.dataForm.systemCode,
                  subSystemCode: this.dataForm.subSystemCode,
                  commId: this.dataForm.commId,
                  commAddress: this.dataForm.commAddress,
                  equipSn: this.dataForm.equipSn,
                  equipTypeId: this.dataForm.equipTypeId,
                  equipName: this.dataForm.equipName,
                  equipCode: this.dataForm.equipCode,
                  isBus: this.dataForm.isBus,
                  isVirtual: this.dataForm.isVirtual,
                  adiustableStatus: this.dataForm.adiustableStatus,
                  adiustableMargin: this.dataForm.adiustableMargin.toString(),
                  energyFunction: this.dataForm.energyFunction,
                  energyId: this.dataForm.energyId,
                  energyDirection: this.dataForm.energyDirection,
                  parentId: this.dataForm.parentId,
                  physicalId: this.dataForm.physicalId,
                  useType: this.dataForm.useType,
                  useStatus: this.dataForm.useStatus,
                  equipCost: this.dataForm.equipCost.toString(),
                  productionDate: this.dataForm.productionDate,
                  commissioningDate: this.dataForm.commissioningDate,
                  count: this.dataForm.addNum,
                  sign: this.detailSwitch && !this.isDetail ? true : false,
                  children: this.detailForm
                })
              }).then(({ data }) => {
                if (data && data.code === 0) {
                  this.visible = false;
                  this.getDataList();
                  this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {
                      // this.$emit('refreshDataList')
                      // this.$refs['detailForm'].resetFields()
                    }
                  });
                } else {
                  this.$message.error(data.msg);
                }
              });
            } else {
              this.$http({
                url: this.$http.adornUrl("/admin/tequip/update"),
                method: "post",
                data: this.$http.adornData({
                  equipId: this.dataForm.id,
                  affiliateId: this.dataForm.affiliateId,
                  orgId: this.dataForm.orgSelect[
                    this.dataForm.orgSelect.length - 1
                  ],
                  stationId: this.dataForm.stationId,
                  floorId: this.dataForm.floorSelect[this.dataForm.floorSelect.length -1],
                  systemCode: this.dataForm.systemCode,
                  subSystemCode: this.dataForm.subSystemCode,
                  commId: this.dataForm.commId,
                  commAddress: this.dataForm.commAddress,
                  equipSn: this.dataForm.equipSn,
                  equipTypeId: this.dataForm.equipTypeId,
                  equipName: this.dataForm.equipName,
                  equipCode: this.dataForm.equipCode,
                  isBus: this.dataForm.isBus,
                  isVirtual: this.dataForm.isVirtual,
                  adiustableStatus: this.dataForm.adiustableStatus,
                  adiustableMargin: this.dataForm.adiustableMargin.toString(),
                  energyFunction: this.dataForm.energyFunction,
                  energyId: this.dataForm.energyId,
                  energyDirection: this.dataForm.energyDirection,
                  parentId: this.dataForm.parentId,
                  useType: this.dataForm.useType,
                  useStatus: this.dataForm.useStatus,
                  equipCost: this.dataForm.equipCost.toString(),
                  productionDate: this.dataForm.productionDate,
                  commissioningDate: this.dataForm.commissioningDate,
                  addNum: 0,
                  sign: this.detailSwitch && !this.isDetail ? true : false,
                  children: this.detailForm
                })
              }).then(({ data }) => {
                if (data && data.code === 0) {
                  this.visible = false;
                  this.getDataList();
                  this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1500,
                    onClose: () => {}
                  });
                } else {
                  this.$message.error(data.msg);
                }
              });
            }
          } else {
            this.$http({
              url: this.$http.adornUrl("/admin/tequip/save"),
              method: "post",
              data: this.$http.adornData({
                affiliateId: this.dataForm.affiliateId,
                orgId: this.dataForm.orgSelect[
                  this.dataForm.orgSelect.length - 1
                ],
                stationId: this.dataForm.stationId,
                // floorId: this.dataForm.floorId,
                floorId: this.dataForm.floorSelect[this.dataForm.floorSelect.length -1],
                systemCode: this.dataForm.systemCode,
                subSystemCode: this.dataForm.subSystemCode,
                commId: this.dataForm.commId,
                commAddress: this.dataForm.commAddress,
                equipSn: this.dataForm.equipSn,
                equipTypeId: this.dataForm.equipTypeId,
                equipName: this.dataForm.equipName,
                equipCode: this.dataForm.equipCode,
                isBus: this.dataForm.isBus,
                isVirtual: this.dataForm.isVirtual,
                adiustableStatus: this.dataForm.adiustableStatus,
                adiustableMargin: this.dataForm.adiustableMargin.toString(),
                energyFunction: this.dataForm.energyFunction,
                energyId: this.dataForm.energyId,
                energyDirection: this.dataForm.energyDirection,
                parentId: this.dataForm.parentId,
                useType: this.dataForm.useType,
                useStatus: this.dataForm.useStatus,
                equipCost: this.dataForm.equipCost.toString(),
                productionDate: this.dataForm.productionDate,
                commissioningDate: this.dataForm.commissioningDate,
                count: this.dataForm.addNum,
                sign: this.detailSwitch && !this.isDetail ? true : false,
                children: this.detailForm
                // "name":this.talbeName[this.currentFormSys]
              })
            }).then(({ data }) => {
              if (data && data.code === 0) {
                this.visible = false;
                // this.$emit('refreshDataList')
                this.getDataList();
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    // this.$refs['detailForm'].resetFields()
                  }
                });
                this.$nextTick(() => {
                  this.$refs["dataForm"].resetFields();
                  if (this.$refs["detailForm"]) {
                    this.$refs["detailForm"].resetFields();
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },

    // 点击树
    /*      handleNodeClick(data) {
             this.clickNode = data.value.toString()
           },
           loadNode(node, resolve) {
             let nodeValue = []
             
             if (node.level === 0) {
               this.$http({
               url: this.$http.adornUrl('/admin/tequip/children'),
               method: 'post',
               data: this.$http.adornData({"id":null})          
             }).then(({
               data
             }) => {
               if (data && data.code === 0) {
                 nodeValue = data.list
                 return resolve(nodeValue)
               }
             })
             }else{
               this.$http({
               url: this.$http.adornUrl('/admin/tequip/children'),
               method: 'post',
               data: this.$http.adornData({"id":node.data.value})          
             }).then(({
               data
             }) => {
               if (data && data.code === 0) {
                 return resolve(data.list);
               }
             })
             }
           
               
           
           }, */
    ftAffiliateId(val) {
      if (val.affiliateId === 1) {
        return "组织机构";
      } else if (val.statisticsType === 2) {
        return "站点";
      } else if (val.statisticsType === 3) {
        return "楼层";
      } else if (val.statisticsType === 4) {
        return "房间";
      }
    },
    ftUseStatus(val) {
      if (val.useStatus === 1) {
        return "未投运";
      } else if (val.useStatus === 2) {
        return "投运";
      } else if (val.useStatus === 3) {
        return "保养";
      } else if (val.useStatus === 4) {
        return "检修";
      } else if (val.useStatus === 5) {
        return "停用";
      } else if (val.useStatus === 6) {
        return "报废";
      }
    },
    ftIsBus(val) {
      if (val.isBus === 0) {
        return "否";
      } else if (val.isBus === 1) {
        return "是";
      }
    },
    ftIsVirtual(val) {
      if (val.isVirtual === 0) {
        return "否";
      } else if (val.isVirtual === 1) {
        return "是";
      }
    },
    ftAdiustableStatus(val) {
      if (val.adiustableStatus === 0) {
        return "否";
      } else if (val.adiustableStatus === 1) {
        return "是";
      }
    },
    ftEnergyFunction(val) {
      if (val.energyFunction === 1) {
        return "用能";
      } else if (val.energyFunction === 2) {
        return "储能/供能";
      } else if (val.energyFunction === 3) {
        return "产能";
      }
    },
    ftEnergyDirection(val) {
      if (val.energyDirection === 1) {
        return "外部";
      } else if (val.energyDirection === 2) {
        return "内部";
      }
    }
  },
  filters: {
    // 运行状态
    usFilters: function(value) {
      if (value == 1) {
        return "未投运";
      } else if (value == 2) {
        return "投运";
      } else if (value == 3) {
        return "保养";
      } else if (value == 4) {
        return "检修";
      } else if (value == 5) {
        return "停用";
      } else if (value == 6) {
        return "报废";
      }
    }
  }
};
</script>
<style scoped>
/* .ellipsis{
    text-overflow:ellipsis;
	 overflow:hidden;
  } */

.el-table tr.el-table__row--striped td {
  background: #f6f9fc;
}

.tableTransfer {
  position: absolute;
  z-index: 300;
  top: 10%;
  right: 17%;
  background-color: #f5f7fa;
  padding: 20px;
}

.searchTool .el-input {
  display: block;
  /* width: auto; */
}

.searchTool .el-form-item {
  margin-top: 0;
}

.detail {
  display: block;
  margin-left: 30px;
}

.el-tree {
  width: 15%;
  height: 100%;
  display: block;
  /* border:1px red solid; */
  float: left;
}

.device_info >>> .el-dialog {
  /* height: 60%; */
  /* border: 1px red solid; */
}

.el-date-editor {
  width: 185px !important;
}

.el-table {
  /* width: 84%; */
  float: right;
}

.el-form-item {
  margin-bottom: 12px;
  margin-top: 12px;
}

.dialogDiv >>> .el-form-item__label {
  width: 40% !important;
  padding-right: 20px;
}

.radioWid >>> .el-form-item__content {
  width: 185px;
}

/* .device_info >>> .el-dialog__body >>> .el-select {
    width: 185px !important;
    padding-right: 20px;
  } */
.device_info >>> .expand_info {
  font-size: 0;
}

.device_info >>> .el-form--inline .el-form-item label {
  width: 100px;
  color: #99a9bf;
}

.device_info >>> .expand_info .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 20%;
}

.device_info >>> .el-dialog .el-dialog__body .el-select {
  width: 185px;
}

.device_info >>> .el-dialog .el-dialog__body {
  /* height: 70%; */
  overflow: auto;
  padding: 30px 20px;
}

.el-dialog form {
  /* border: 1px solid red; */
  /* height: 100%; */
  background-color: #f0f3f3;
  border-radius: 5px;
  padding: 30px 0;
}

.device_info >>> .el-dialog .el-input__inner {
  text-align: center;
}

.el-dialog form .el-form-item {
  display: inline-block;
}

.el-dialog form .el-form-item span {
  display: inline-block;
  width: 185px;
  height: 40px;
  text-align: center;
}

.el-dialog form >>> .el-input {
  width: 100%;
}

.dataSet >>> .el-form-item__label {
  width: 20% !important;
}

/* .dataSet>>>.el-input {
    width: 80%;
  } */

.s_title {
  position: absolute;
  z-index: 20000;
  top: -10px;
  left: 30px;
}

.el-form .first_label {
  margin-top: 20px;
}

.alarm,
.loadStatistics,
.energyStatistics {
  margin-top: 20px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 25px;
}

.table_st {
  margin-left: 30px;
  margin-bottom: 5px;
}
</style>
