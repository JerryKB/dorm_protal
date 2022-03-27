<template >
       <div style="height: 100%">
           <el-container>
               <el-header style="display: flex ">

                   <div>学生宿舍管理系统</div>
                   <div style="margin-left: 83%">
                       <el-dropdown @command="handleCommand">
                     <span class="el-dropdown-link" style="font-size: 15px">
                         <span class="el-icon-user"></span>

                                  {{username}}
                         <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                           <el-dropdown-menu slot="dropdown">
                               <el-dropdown-item command="user">个人中心</el-dropdown-item>
                               <el-dropdown-item command="logOut">退出</el-dropdown-item>
                           </el-dropdown-menu>
                       </el-dropdown>
                   </div>
               </el-header>
               <el-container >
                   <div style="width: 200px">

                       <el-menu  style="height: 100vh"
                                 default-active="2"
                                 class="el-menu-vertical-demo"

                                 unique-opened
                                 router
                       >

                           <el-submenu :index="index+''"
                                       style="padding-left: 0px"
                                       v-for="(item,index) in routers"
                                       :key="index"
                                       v-if="!item.hidden"
                           >
                               <template slot="title">
                                   <i :class="item.iconName"></i>
                                   <span>{{item.name}}</span>
                               </template>
                               <el-menu-item :index="children.path" v-for="(children,k) in item.children" :key="k">{{children.name}}</el-menu-item>
                           </el-submenu>

                       </el-menu>

                   </div>
                   <el-main>
                       <router-view/>
                   </el-main>
               </el-container>
           </el-container>
       </div>



</template>

<script>
    import router from "../router";


    export default {
        name: "Home",

        computed:{
            username(){
                return JSON.parse(window.sessionStorage.getItem("userInfo")).realName;
            },
            routers(){

               return  this.$store.state.routes;
            }

        },
        methods:{
            handleCommand(command){
                if (command=="logOut"){

                        this.$confirm('是否确定需要退出登录?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            this.$message({
                                type: 'success',
                                message: '退出成功!'
                            });
                            sessionStorage.clear()
                            router.replace("/");
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消退出'
                            });
                        });


                }

            }
        }


    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

</style>
