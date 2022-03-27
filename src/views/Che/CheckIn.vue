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
                    label="宿舍号"
                    sortable>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="bid"
                    label="楼栋号"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    align="center"
                    label="剩余空闲床位"
            >
                <template slot-scope="scope">
                    {{scope.row.contain_count-scope.row.now_count}}
                </template>

            </el-table-column>
            <el-table-column
                    align="center"
                    label="入住"
                    sortable
            >
                <template slot-scope="scope">

                    <el-button type="primary" plain @click="checkIn(scope.row)">+ 入住</el-button>
                </template>

            </el-table-column>



        </el-table>


    </div>

</template>

<script>


    export default {
        name:'CheckIn',
        data() {
            return {
                tableData: [],
                identity:false
            };

        },
        methods: {
            initTableData(){
                this.getRequest("/dorm/getFreeRoom").then(data=>{
                    this.tableData = data;

                })
            },
            checkIn(row){

                this.postRequest('/checkinRoom/',row).then((res)=>{
                    this.initTableData()



                })
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
