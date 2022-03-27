import {getRequest} from "./api";


export const formatRoutes=(routes) => {
    let fmtRoutes = [];
    routes.forEach(router=>{
        let {
            path,
            name,
            component,
            icon_name,
            children,
        }=router;
        if (children && children instanceof Array){
            children = formatRoutes(children);
        }
        let fmRouter={
            path:path,
            name:name,
            children:children,
            component(resolve){
                if (component!="Home"){
                    let str = component.substring(0, 3);
                    if (component.startsWith(str)){
                        require(['../views/' + str+'/'+component + '.vue'], resolve);

                    }
                }
                else {
                    require(['../views/' +component + '.vue'], resolve);
                }



            },
            iconName:icon_name
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;
}

export const initMenu=(router, store)=>{
    if (store.state.routes.length>0){
        return;
    }
    getRequest('/menu/').then(data=>{

        if(data){
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    })
}