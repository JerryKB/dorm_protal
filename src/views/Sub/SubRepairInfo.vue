<template>
    <div>


        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学号" prop="Sid">
                <el-input v-model="ruleForm.Sid"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="Sname">
                <el-input v-model="ruleForm.Sname"></el-input>
            </el-form-item>
            <el-form-item label="宿舍号" prop="did">
                <el-input  v-model="ruleForm.did" ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phoneNum">
                <el-input  v-model="ruleForm.phoneNum" ></el-input>
            </el-form-item>
            <el-form-item label="报修详情" prop="repairInfo">
                <el-input type="textarea" v-model="ruleForm.repairInfo" class="textInput"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button class="leftBtn" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>

                <el-button  round style="margin-left: 25px" @click="checkForm">查看已提交申请</el-button>


            </el-form-item>
        </el-form>
        <el-dialog title="维修单" :visible.sync="dialogTableVisible"  class="titleClass el-dialogClass" style="width: auto;padding: 0">
            <el-table :data="stateData" style="padding: 0">
                <el-table-column property="sid" label="学号" align="center"></el-table-column>
                <el-table-column property="sname" label="姓名" align="center"></el-table-column>
                <el-table-column property="did" label="宿舍号" align="center"></el-table-column>
                <el-table-column property="phoneNum" label="手机号码" width="112px" align="center"></el-table-column>
                <el-table-column property="repairInfo" label="报修详情" align="center"></el-table-column>
                <el-table-column property="edit_time" label="提交时间"align="center"></el-table-column>
                <el-table-column property="situation" label="申请状态" align="center">
                    <template slot-scope="scope">
                        <p v-if="stateData[scope.$index].situation==0"><el-tag type="info">待解决</el-tag></p>
                        <p v-if="stateData[scope.$index].situation==2"><el-tag >已解决</el-tag></p>
                        <p v-if="stateData[scope.$index].situation==1"><el-tag type="primary">正在处理</el-tag></p>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import {getRequest, postRequest} from "../../utils/api";

    export default {
        name:'CheckAdjust',
        data() {
            return {
                ruleForm: {
                    Sid: '',
                    phoneNum:'',
                    Sname:'',
                    did:'',
                    repairInfo:''



                },
                dialogTableVisible: false,
                rules: {
                    Sid: [
                        { required: true, message: '请输入学号', trigger: 'blur' },

                    ],
                    phoneNum: [
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    Sname:[
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    did:[
                        { required: true, message: '请输入宿舍号', trigger: 'blur' }
                    ],
                    repairInfo: [
                        { required: true, message: '请填写报修详情', trigger: 'blur' }
                    ]
                },
                stateData:[]
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postRequest('/repair/submitRepair',this.ruleForm).then((res)=>{
                        })
                    } else {
                        this.$message.error("所有字段不能为空")
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            checkForm(){
                this.dialogTableVisible=true
                getRequest('/repair/').then((res)=>{
                    this.stateData = res;
                })
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm{
        margin-top: 45px;
        width: 600px;
    }
    .leftBtn{
        margin-right: 65px;
    }
    .textInput{
        min-height:62px;
    }
    .dialogClass div{
        height:100px;
        padding: 0px;
    }
    .titleClass{
        line-height: 50px;

    }
    .el-dialogClass{
        width: 35%;
    }


</style>
