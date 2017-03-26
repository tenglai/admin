<template>
    <div class="step1">
       <!-- element表单组件 -->
      <el-form :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleForm" label-position="top">
         <!-- 表单项，prop属性表示要进行表单验证，验证规则对应为rules的属性name -->
         <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name" size="large"></el-input>
        </el-form-item>

        <el-form-item label="" prop="fenLei">
           <!-- 改装后的表单项，在标签栏添加了一个按钮 -->
          <el-row style="height: 35px;" type="flex" align="middle">
            <el-col :span="3" style="width: 90px;">
              <div class="el-form-item__label" style="padding-bottom: 0;"> 活动分类</div>
            </el-col>
            <el-col  class="" :span="2">
              <el-button type="text" @click.native="dialogFormFenLeiVisible = true" style="margin: 0;padding: 0;">设置</el-button>
            </el-col>
          </el-row>

          <el-radio-group v-model="ruleForm.fenLei" >
            <el-radio v-for="item of ruleForm.fenLeis" :label="item.name"></el-radio>
          </el-radio-group>
        </el-form-item>

          <!-- 活动标签并不是一个表单元素，无法使用element自带的验证功能 -->
        <el-form-item label="活动标签" required>
            <el-tag
              v-for="tag in ruleForm.tags"
              :closable="true"
              type="primary"
              @close="handleClose(tag)"
               >
              {{tag.name}}
            </el-tag>
          <el-button icon="plus" size="large" @click.native="showDialog" style="vertical-align: middle;margin: 10px;"></el-button>
          <transition name="fade">
            <div class="el-form-item__error" v-show="tagsValid">{{ tagsError }}</div>
          </transition>
        </el-form-item>


        <el-form-item label="活动时间" required style="width: 750px;">
          <el-col :span="5">
            <!-- 时间选择器，表单验证，报错异常，自己写验证规则 -->
            <el-form-item prop="activeStartTimeDate">
              <el-date-picker
                v-model="ruleForm.activeStartTimeDate"
                type="date"
                placeholder="活动开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="activeStartTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.activeStartTimeTime"
                :picker-options="{start: '00:00',step: '00:15',end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>

          <el-col :span="1" style="text-align: center;">—</el-col>

          <el-col :span="5">
            <el-form-item prop="activeEndTimeDate">

              <el-date-picker
                v-model="ruleForm.activeEndTimeDate"
                type="date"
                placeholder="活动结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="activeEndTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.activeEndTimeTime"
                :picker-options="{start: '00:00',step: '00:15',end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>

        </el-form-item>

        <el-form-item label="报名时间" required style="width: 750px;">
          <el-col :span="5">
              <el-form-item prop="signStartTimeDate">
                <el-date-picker
                  v-model="ruleForm.signStartTimeDate"
                  type="date"
                  placeholder="报名开始日期">
                </el-date-picker>
              </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="signStartTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.signStartTimeTime"
                :picker-options="{start: '00:00',step: '00:15', end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>

          <el-col :span="1" style="text-align: center;">—</el-col>

          <el-col :span="5">
            <el-form-item prop="signEndTimeDate">
              <el-date-picker
                v-model="ruleForm.signEndTimeDate"
                type="date"
                placeholder="报名结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="signEndTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.signEndTimeTime"
                :picker-options="{start: '00:00',step: '00:15',end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>
        </el-form-item>


        <el-form-item label="活动地点" required >
            <!-- 二级联动地址选择器 -->
            <address-select
              :province="ruleForm.province"
              :city="ruleForm.city"
              :detail="ruleForm.detail"
              :isAddressTrue="isAddressTrue"
              ></address-select>
        </el-form-item>

        <el-form-item label="活动人数">
          <el-row>
          <el-col :span="6" style="width: 187px;">
            <el-radio class="radio" v-model="ruleForm.activePerson" label="无限制">无限制</el-radio>
            <el-radio class="radio" v-model="ruleForm.activePerson" label="限制">限制</el-radio>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="0" :number="true" size="large" v-model="ruleForm.activePersonNum" :disabled=" ruleForm.activePerson == '无限制' "><template slot="append">人</template></el-input>
          </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="活动封面">
          <el-upload action="http://jsonplaceholder.typicode.com/" type="drag" :multiple="true" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="活动简介">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :autosize="{minRows: 4, maxRows: 8}"
              v-model="ruleForm.activeDescribe">
            </el-input>
        </el-form-item>

        <el-form-item label="报名用户信息展示">
          <el-radio-group v-model="ruleForm.UseMsgShow">
            <el-radio label="不展示"></el-radio>
            <el-radio label="展示报名人数"></el-radio>
            <el-radio label="展示报名清单"></el-radio>
            <el-radio label="报名成功显示完整用户资料"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="评价功能">
          <el-radio-group v-model="ruleForm.evaluate">
            <el-radio  label="不开启"></el-radio>
            <el-radio  label="实时评价"></el-radio>
            <el-radio  label="审核后评论"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="">
          <el-row>
            <div class="el-form-item__label"> 赞助广告</div>
            <el-col  class="el-form-item__label is-active" :span="2">
              <el-button type="text" @click.native="openAd">开通赞助广告</el-button>
            </el-col>
          </el-row>
          <el-upload action="http://jsonplaceholder.typicode.com/" type="drag" :multiple="true" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError">
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">图片尺寸建议比例1；4.18，如160*666像素，且不超过2M</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-input
            placeholder="请填写您的广告标题"
            size="large"
            v-model="ruleForm.adTitle">
          </el-input>
        </el-form-item>

        <el-form-item>
        <el-input
            placeholder="请填写您的广告内容"
            size="large"
            v-model="ruleForm.adContent">
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-input
            placeholder="请填写您的赞助链接"
            size="large"
            v-model="ruleForm.adLink">
          </el-input>
        </el-form-item>

        </el-form>

      <!-- 弹框 -->
      <el-dialog title="添加活动标签"  v-model="dialogFormVisible" top="35%">
        <el-form :model="dialogForm">
          <el-form-item>
            <el-input v-model="dialogForm.name" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"  @click.native="handleAdd(dialogForm.name,dialogForm,ruleForm.tags)">添加</el-button>
                </span>
      </el-dialog>

      <!-- 设置活动分类 -->
      <el-dialog title="设置活动分类" v-model="dialogFormFenLeiVisible" >
        <el-form :model="dialogFormFenLei">
          <el-form-item>
            <el-tag
              v-for="feiLei of ruleForm.fenLeis"
              :closable="true"
              type="primary"
              @close="handleCloseFenLei(feiLei)"
              >
              {{ feiLei.name }}
            </el-tag>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dialogFormFenLei.name" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="dialogFormFenLeiVisible = false">取 消</el-button>
          <el-button type="primary"  @click.native="handleAdd(dialogFormFenLei.name,dialogFormFenLei,ruleForm.fenLeis)">添加</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  // 地址选择器组件
  import addressSelect from 'src/components/address.vue'

  export default {
    name: 'step1',
    // 组件
    components: {
      'address-select': addressSelect
    },
    data: function () {
      return {
        tagsValid: false,                  // 活动标签是否合包
        tagsError: '请设置标签',           // 活动标签不合法的提示信息
        isAddressTrue: false,              // 地址是否正确
        dialogFormVisble: false,           // 添加活动标签的对话框可见
        dialogFormFenLeiVisible: false,    // 分类对话框可见
        dialogForm: {name: ''},            // 活动标签对话框表单
        dialogFormFenLei: {name: ''},      // 活动分类对话框表单
        ruleFormChange: false,             // ruleForm表单是否改变
        ruleFormValid: false,              // ruleForm是否合法
        rules: {                           // 表单验证规则
          name: [
            {required: true, message: '请输入活动名称', trigger: 'change'}
          ],
          fenLei: [
            {required: true, message: '请选择活动分类', trigger: 'change'}
          ],
          activeStartTimeDate: [
            {required: true, message: '请选择活动开始日期', trigger: 'change'}
          ],
          activeStartTimeTime: [
            {required: true, message: '请选择活动开始时间', trigger: 'change'}
          ],
          activeEndTimeDate: [
            {required: true, message: '请选择活动结束日期', trigger: 'change'}
          ],
          activeEndTimeTime: [
            {required: true, message: '请选择活动结束时间', trigger: 'change'}
          ],
          signStartTimeDate: [
            {required: true, message: '请选择报名开始日期', trigger: 'change'}
          ],
          signStartTimeTime: [
            {required: true, message: '请选择报名开始时间', trigger: 'change'}
          ],
          signEndTimeDate: [
            {required: true, message: '请选择报名截止日期', trigger: 'change'}
          ],
          signEndTimeTime: [
            {required: true, message: '请选择报名截止时间', trihher: 'change'}
          ],
          ruleForm: {                         // step1页面的表单，记录页面所有表单信息
            name: '',                         // 活动名称
            fenLeis: [                        // 活动分类选择
              {name: '未发布'},
              {name: '测试活动'},
              {name: '精彩活动'}
            ],
            fenLei: '',    // 当前选中的活动页面
            tags: [],      // 活动标签
            activeStartTimeDate: '', // 活动开始时间
            activeStartTimeTime: '', // 活动结束时间
            activeEndTimeDate: '',
            activeEndTimeTime: '',
            signStartTimeDate: '',
            signStartTimeTime: '',
            signEndTimeDate: '',
            signEndTimeTime: '',
            activePerson: '',      // 是否限制活动人数
            activePersonNum: '',   // 限制多少人
            activeDescribe: '',    // 活动简介
            UseMsgShow: '',        // 报名活动信息展示
            evaluate: '',          // 评价功能
            adTitle: '',           // 广告标题
            adContent: '',         // 广告内容
            adLink: ''             // 赞助链接
          }
        }
      }
    },
    watch: {     // 监控
      ruleForm: {
        handler: function (val,oldVal) {
          store.commit('setRuleForm',this.ruleForm)
          this.tagsValid = !this.ruleForm.tags.length ? '' : false
          this.ruleFormChange = true
        },
        deep: true // 深度监控,可以观察到ruleForm内任意属性的变化
      }
    },
    methods: {
      handleRemove: function (file, fileList) {
        console.log(file,fileList)
      },
      handlePreview: function (file) {
        console.log(file)
      },
      handleSuccess: function () {
      },
      handleError: function () {
      },
      // 显示添加活动标签对话框
      showDialog: function () {
        if (this.ruleForm.tags.length >= 5 ) {
          this.$message({
            message: '最多设置5个标签',
            type: 'warning'
          })
        }else{
          this.dialogFormVisible = true
          this.dialogForm = {}
        }
      },
      // 删除活动标签
      handleClose: function (tag) {
        var index = this.ruleForm.tags.indexOf(tag)
        this.ruleForm.tags.splice(index,1)
      },
      // 删除活动分类的某一项
      handleCloseFenLei: function (fenLei){
        var index = this.ruleForm.fenLeis.indexOf(fenLei)
        this.ruleForm.fenLeis.splice(index,1)
      },
      // 添加标签
      handleAdd: function (tag,form,tags) {
        if(tag && tag.trim().length != 0){
          var isExist = false
          tag = tag.trim()
          for(var i=0;i<tags.length; i++){
            if( tag[i].name == tag ){
              isExist = true
              break
            }
          }
          if(isExist){
            this.$message({
              message: '该标签已存在'，
              type: 'warning'
            })
          }else{
            this.dialogFormVisible = false
            this.dialogFormFenLeiVisible = false
            tags.push({
              name: tag
            })
          }
        }else{
          this.$message({
            message: '标签不能为空',
            type: 'warning'
          })
        }
      },
      openAd: function () {
        this.$message('该功能正在完善')
      },
    },
    // 页面初始化
    created: function () {

    }
  }
</script>

<style>
  .step{
    margin-bottom: 30px;
  }
  .step1 .demo-ruleForm .el-form-item{
    margin-bottom: 25px;
    margin-right: 50px;
  }
  
</style>
