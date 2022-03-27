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
                    prop="now_count"
                    label="现住人数"
            >

            </el-table-column>
            <el-table-column
                    align="center"
                    prop="contain_count"
                    label="可容纳人数"
            >
            </el-table-column>
            <el-table-column v-if="identity"
                    align="center"
                    prop="situation"
                    label="查看"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.situation"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            @change="change($event)"
                    >
                    </el-switch>

                </template>




            </el-table-column>



        </el-table>


    </div>

</template>

<script>


    export default {
        name:'DorClass',
        data() {
            return {
                tableData: [],
                identity:false
            };

        },
        methods: {
            initTableData(){
                this.getRequest("/dorm/getClassDorms").then(data=>{
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