import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Router,Scene,Tabs}from 'react-native-router-flux';
import Server from './xueli/Server';
import People from './xueli/People';
import Shangping from './xueli/Shangping';
import Shopcat from './xueli/Shopcat';
import Icon from 'react-native-vector-icons/FontAwesome';
import List from './xueli/List';



const {width} =Dimensions.get('window');

const App= () => {
  // 实现tabs
    return (
      <Router>
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
                      hideDrawerButton
                      icon={
                        ({focused})=>
                          <Icon 
                            color={focused?'red':'#949494'} 
                            name='table' 
                            size={23}
                            />}
                          
                        // component={Shangping} 
                >
                    <Scene 
                      key='list' 
                      component={List} 
                      hideNavBar
                      hideTabBar
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
          </Scene>
      </Router>
    );
};

export default App;