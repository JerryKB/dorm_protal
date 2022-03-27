<template>

    <div>
        <el-table
                class="el-main"
                :data="tableData"
                style="width: 100%;"

        >
            <el-table-column
                    prop="id"
                    label="编号"
                    align="center"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="sid"
                    label="学生学号"
                    align="center"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="phoneNum"
                    label="联系方式"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="申请原因"
                    align="center"
            >
            </el-table-column>
            <el-table-column
                    prop="edit_time"
                    label="提交时间"
                    align="center"
                    sortable
            >
            </el-table-column>
            <el-table-column property="permit_state" label="申请状态" class="columnClass" align="center">
                <template slot-scope="scope">
                    <p v-if="tableData[scope.$index].permit_state==0"><el-tag type="info">未解决</el-tag></p>
                    <p v-if="tableData[scope.$index].permit_state==1"><el-tag >已同意</el-tag></p>
                    <p v-if="tableData[scope.$index].permit_state==2"><el-tag type="danger">已拒绝</el-tag></p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    label="操作"

            >
                <template slot-scope="scope" >
                    <el-button type="success" icon="el-icon-check" circle @click="agree(scope.row)"></el-button>
                    <el-button type="warning" icon="el-icon-close" circle @click="refuse(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete"  ref="delete" @click="deleteById(scope.$index,scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>


    import {postRequest} from "../../utils/api";

    export default {
        name:'LeaveDorSub',
        data() {
            return {
                tableData: [],
                inputText:'',

                formLabelWidth: '120px'
            };

        },
        methods: {
            initTableData(){
                this.getRequest("/leave-dorm/").then(data=>{
                    this.tableData=data;
                })
            },
            deleteById(index,data){
                console.log(index,data.id)

                this.$confirm('此操作将永久删除'+ data.id+'号申请单数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(data.id)

                    this.deleteRequest("/leave-dorm/"+data.id).then(data=>{
                    })
                    this.initTableData();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            agree(data){
                let form={
                    leaveId:data.id,
                    state:1
                }
                postRequest('/admin/permitLeave',form);
                this.initTableData();

            },
            refuse(data){
                let form={
                    leaveId:data.id,
                    state:2
                }
                postRequest('/admin/permitLeave',form);
                this.initTableData();

            },
            search(){

                let newData=[]
                let j=0;

                for(let i=0;i<this.tableData.length;i++){
                    this.tableData[i].bid += "";
                    this.tableData[i].floor += "";

                    if (this.tableData[i].bid.indexOf(this.inputText)!==-1||this.tableData[i].floor.indexOf(this.inputText)!==-1){


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
        line-height: 40px;
        padding: 30px 6px;
    }
    el-table-column{
        width: 200px;
    }
    .columnClass div{
        height: 0px;

    }








</style>
