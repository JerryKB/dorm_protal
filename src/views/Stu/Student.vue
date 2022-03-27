<template>

    <div>
        <div style="height: 60px;margin-bottom: 5px;padding-top: 0px;line-height: 48px">
            <el-input
                    placeholder="请输入搜索内容"
                    prefix-icon="el-icon-search"
                    v-model="inputText"
                    style="width: 28%;margin-left: -695px;margin-top:0px;margin-bottom: 0px;">
            </el-input>
            <el-button type="primary" round style="margin-left: 10px" icon="el-icon-search" @click="search">搜索</el-button>
            <el-button type="primary" class="left" ref="addBtn" @click="dialogFormVisibleAdd=true">新增学生</el-button>
        </div>
        <el-table
                class="el-main"
                :data="tableData"
                style="width: 100%;"
                min-width="50px"

        >
            <el-table-column
                    prop="id"
                    label="学号"
                    align="center"
                    min-width="50px"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="real_name"
                    label="姓名"
                    align="center"
                    min-width="50px"

            >
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    align="center"
                    min-width="50px"
            >
            </el-table-column>
            <el-table-column
                    prop="role_name"
                    label="身份"
                    align="center"
                    min-width="50px"
            >
            </el-table-column>
            <el-table-column
                    prop="did"
                    label="宿舍号"
                    align="center"
                    min-width="50px"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="sclass"
                    label="班级"
                    align="center"
                    min-width="50px"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="major"
                    label="专业"
                    align="center"
                    min-width="50px"
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"

            >
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" ref="edit" @click="showEditView(scope.$index,scope.row)" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete"  ref="delete" @click="deleteById(scope.$index,scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑学生"   :visible.sync="dialogFormVisible" style="width: auto;padding: 0" class="titleClass el-dialogClass">
            <i class="el-icon-edit"></i>
            <el-form :model="form" size="small">
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.real_name" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="身份" :label-width="formLabelWidth">
                    <el-input v-model="form.role_name" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-input v-model="form.sclass" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                    <el-input v-model="form.major" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editFinish">确 定</el-button>
            </div>

        </el-dialog>
        <el-dialog title="新增学生"   :visible.sync="dialogFormVisibleAdd" style="width: auto;padding: 0" class="titleClass el-dialogClass">
            <i class="el-icon-edit"></i>
            <el-form :model="addForm" size="small">
                <el-form-item label="学号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.id" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.real_name" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.username" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="addForm.sex" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="身份" :label-width="formLabelWidth">
                    <el-input v-model="addForm.role_name" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-input v-model="addForm.sclass" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>
                <el-form-item label="专业" :label-width="formLabelWidth">
                    <el-input v-model="addForm.major" autocomplete="off" class="inputClass"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addFinish">确 定</el-button>
            </div>

        </el-dialog>
    </div>

</template>

<script>


    export default {
        name:'Building',
        data() {
            return {
                tableData: [],
                inputText:'',
                dialogFormVisible:false,
                dialogFormVisibleAdd:false,
                addForm:{
                    id:'',
                    username:'',
                    real_name:'',
                    sex:'',
                    role_name:'',
                    sclass:'',
                    major:''

                },
                form:{
                    id:'',
                   real_name:'',
                    sex:'',
                    role_name:'',
                    sclass:'',
                    major:''

                },
                formLabelWidth: '120px'
            };

        },
        methods: {
            initTableData(){
                this.getRequest("/student/").then(data=>{
                    this.tableData=data;
                })
            },
            deleteById(index,data){
                console.log(index,data.id)

                this.$confirm('此操作将永久删除学号为'+ data.id+'学生数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.deleteRequest("/student/"+data.id).then(data=>{
                    })
                    this.initTableData();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            showEditView(index,row){
                this.form=row
                this.dialogFormVisible = true;
            },
            editFinish(){
                this.putRequest("/student/",this.form).then(data=>{
                    console.log(this.form)

                    this.dialogFormVisible=false;
                    this.initTableData()
                })
            },
            addFinish(){
                this.postRequest("/student/",this.addForm).then(resp=>{
                    console.log(this.addForm)
                    this.dialogFormVisibleAdd=false;
                    this.initTableData()

                })
            },
            search(){

                let newData=[]
                let j=0;

                for(let i=0;i<this.tableData.length;i++){
                    this.tableData[i].id += "";
                    this.tableData[i].real_name += "";

                    if (this.tableData[i].id.indexOf(this.inputText)!==-1||this.tableData[i].real_name.indexOf(this.inputText)!==-1){


                        newData[j]=this.tableData[i];
                        j++;
                    }
                }
                this.tableData = newData;

            }


        },
        watch:{
            inputText(newValue){
                if (newValue==""){
                    this.initTableData();
                }
                else {

                    this.search()
                }

            }
        },
        mounted() {
            this.initTableData();
            // let data=sessionStorage.getItem("userInfo");
            // if (JSON.parse(data).identity!=="2"){
            //     this.$refs.addBtn;
            //     console.log(this.$refs.addBtn)
            //
            // }
        }

    }
</script>
<style scoped>
    .el-main{
        line-height: 19px;
    }
    el-table-column{
        width: 200px;
    }
    .titleClass{
        line-height: 50px;

    }
    .el-dialogClass{
        width: 35%;
    }
    .left{
        float: right;
    }








</style>
