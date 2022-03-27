<template>

    <div>
        <div style="height: 60px;margin-bottom: 5px;padding-top: 0px;line-height: 48px">
        </div>
        <el-table
                class="el-main"
                :data="tableData"
                style="width: 100%;"

        >
            <el-table-column
                    prop="id"
                    align="center"
                    label="学号"
                    sortable>
            </el-table-column>

            <el-table-column
                    align="center"
                    prop="real_name"
                    label="姓名"
            >


            </el-table-column>
            <el-table-column
                    align="center"
                    prop="major"
                    label="专业"

            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="checkin_time"
                    label="入住时间"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="role_name"
                    label="职位"
            >
            </el-table-column>



        </el-table>


    </div>

</template>

<script>


    export default {
        name:'DorUser',
        data() {
            return {
                tableData: [],
                identity:false
            };

        },
        methods: {
            initTableData(){
                this.getRequest("/student/getDorms").then(data=>{
                    this.tableData = data;

                })
            },
            change(row){
                console.log(row)
            }


        },

        mounted() {
            this.initTableData();
            let data=sessionStorage.getItem("userInfo");
            if (JSON.parse(data).identity=="2"){
                //     this.$refs.addBtn;
                //     console.log(this.$refs.addBtn)
                //
                this.identity=true
            }
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
