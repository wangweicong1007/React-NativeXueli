import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  BackHandler,
  ToastAndroid,
  View,
  Text
} from 'react-native';
import {Router,Scene,Tabs,Lightbox, Modal,Overlay,Drawer}from 'react-native-router-flux';
import Server from './xueli/home/Home';
import People from './xueli/userinfor/People';
import Shopcat from './xueli/cart/Shopcat';
import Icon from 'react-native-vector-icons/FontAwesome';
import List from './xueli/good/List';
import Publish from './xueli/userinfor/Publish';
import SplashScreen from 'react-native-splash-screen';
import Login from './xueli/common/Login';
import Register from './xueli/common/Register';
import SwiperPage from './xueli/common/SwiperPage';

console.disableYellowBox = true;
const {width} =Dimensions.get('window');

const App= () => {
  let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
    
    let now1 = 0;
    
    let init =()=>{
        AsyncStorage.getItem('isInstall')
            .then(res=>{
                console.log('isinstall',res)
                if(res){
                    setInstall(false);
                }
            })
            AsyncStorage.getItem('isloading')
            .then(res=>{
                let user = JSON.parse(res)
                if(user){
                    //启动页图标消失
                    SplashScreen.hide();
                    setLogin(true);
                }else{
                    //启动页图标消失
                    SplashScreen.hide();
                }
            })
    }
    useEffect(()=>{
        SplashScreen.hide();
        init();
    },[])
    let afterInstall = ()=>{
        console.log('after install')
		setInstall(false)
	}
    if(isInstall){
        return (
          <View style={{flex:1}}>
            <SwiperPage afterInstall = {afterInstall}/>
        </View>
        ) 
    }
    return (
      <Router
          backAndroidHandler={()=>{
            if(Actions.currentScene == 'home' || Actions.currentScene =='login' ){
                if(new Date().getTime()-now1<2000){
                    BackHandler.exitApp();
                }else{
                    ToastAndroid.show('确定要退出吗',100);
                    now1 = new Date().getTime();
                    return true;
                }
            }else{
                Actions.pop();
                return true;
            }
            
        }}
      >
        <Overlay>
          <Modal key='modal' hideNavBar >
            <Lightbox key='lightbox'>
                <Drawer
                    key='drawer'
                    contentComponent={()=><Text>drawer</Text>}
                    drawerIcon={()=><Icon name="bars" />}
                    drawerWidth={400}>
                <Scene key='root'>
                  <Tabs 
                    key='tabbar'
                    hideNavBar
                    activeTintColor='red'
                    inactiveTintColor='#949494'
                  >
                      {/* 首页*/}
                        <Scene key='server'
                            title='首页'
                            hideNavBar
                            // navigationBarStyle={{backgroundColor:'pink'}}
                            icon={
                              ({focused})=>
                                  <Icon 
                                  color={focused?'red':'#949494'} name='home' size={23} />}
                        >
                        <Scene  key='server' component={Server} />
                        </Scene>
                        {/* 商品分类 */}
                        <Scene key='shangping'
                              title='商品分类'
                              // hideDrawerButton
                              icon={
                                ({focused})=>
                                  <Icon 
                                    color={focused?'red':'#949494'} 
                                    name='table' 
                                    size={23}
                                    />}
                        >
                            <Scene 
                              key='list' 
                              component={List} 
                              hideNavBar
                              // hideTabBar
                            />
                        </Scene>
                        {/* 购物车*/}
                        <Scene key='shopcat'
                              title='购物车'
                              hideDrawerButton
                              icon={
                                ({focused})=>
                                  <Icon 
                                  color={focused?'red':'#949494'} name='shopping-cart' size={23} />}
                                // component={LocalPage} 
                                component={Shopcat} 
                        >
                        </Scene>
                        {/* 个人中心 */}
                        <Scene key='people'
                            title='个人中心'
                            // hideDrawerButton
                            hideNavBar
                            icon={
                              ({focused})=>
                                <Icon 
                                color={focused?'red':'#949494'} name='user-o' size={23} />}
                                
                              component={People} 
                        ></Scene>
                    </Tabs>
                    <Scene key='publish' component={Publish} hideNavBar hideTabBar />
                  </Scene>
                  </Drawer>
            </Lightbox>
              <Scene  initial={!isLogin} key='login' >
                  <Scene   key='login'component={Login} hideNavBar/> 
                  <Scene key='register' component={Register} hideNavBar/>
              </Scene>
          </Modal>
        </Overlay>
      </Router>
    );
};

export default App;