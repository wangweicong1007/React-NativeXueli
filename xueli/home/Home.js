import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    TextInput,
    FlatList,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Swiper from 'react-native-swiper';
  const {width,height} =Dimensions.get('window');

export default class Server extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    {/* <StatusBar backgroundColor='red'/>
                    <TextInput placeholderTextColor='' /> */}
                    {/* 搜索框 */}
                    <View style={styles.tab}>
                        <Icon 
                            name="search"
                            color="white"
                            size={23}
                        />
                        <TextInput
                            placeholder='请输入您要搜索的关键词'
                            style={{
                                width:width*0.8,
                                height:height*0.06,
                                backgroundColor:'white',
                                borderRadius:20,
                                opacity:0.8,
                                flexDirection:'row',
                                marginLeft:-30,
                                paddingLeft:40
                            }}
                        />
                        <Icon 
                            name="shopping-cart" 
                            color="white"
                            size={28}
                            style={{
                                marginLeft:20
                            }}
                        />
                    </View>
                    {/* 轮播图块 */}
                    <View style={styles.lunbo}>
                        <Swiper
                            paginationStyle={{bottom:10}}
                        >
                            <Image style={styles.img1} source={require('../../assets/lunbo1.png')}/>
                            <Image style={styles.img1} source={require('../../assets/lunbo2.png')}/>
                            <Image style={styles.img1} source={require('../../assets/lunbo1.png')}/>
                        </Swiper>
                    </View>
                    {/* 列表 */}
                    <ScrollView >
                        <View style={styles.slide}>
                            <Image style={{height:height*0.11}} source={require('../../assets/flex.png')} />
                            <Text style={styles.list}>居家维修保养</Text>
                            <Icon name='angle-right' size={25} color='#7e7b7b' style={{marginLeft:180}} />
                        </View>
                        <View style={styles.slide}>
                            <Image style={{height:height*0.11}} source={require('../../assets/discount.png')} />
                            <Text style={styles.list}>住宿优惠</Text>
                            <Icon name='angle-right' size={25} color='#7e7b7b' style={{marginLeft:220}} />
                        </View>
                        <View style={styles.slide}>
                            <Image style={{height:height*0.11}} source={require('../../assets/trip.png')} />
                            <Text style={styles.list}>出行接送</Text>
                            <Icon name='angle-right' size={25} color='#7e7b7b' style={{marginLeft:220}} />
                        </View>
                        <View style={styles.slide}>
                            <Image style={{height:height*0.11}} source={require('../../assets/eclup.png')} />
                            <Text style={styles.list}>E族活动</Text>
                            <Icon name='angle-right' size={25} color='#7e7b7b' style={{marginLeft:220}} />
                        </View>
                    </ScrollView>
                    {/* 发布按钮 */}
                    <View style={{
                            alignItems:'center',
                            // justifyContent:'center',
                            }}>
                        <TouchableOpacity
                            style={{
                                width:width*0.7,
                                height:height*0.05,
                                backgroundColor:'#f23030',
                                borderRadius:8,
                                alignItems:'center',
                                justifyContent:'center',
                                marginTop:15,
                            }}
                        >
                            <Text style={{color:'white',fontSize:16}}>发布需求</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </ScrollView>
        )
    }
}
const styles= StyleSheet.create({
    tab:{
        width:width,
        height:height*0.09,
        backgroundColor:'#f23030',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    lunbo:{
        width:width,
        height:height*0.23,
        // backgroundColor:'pink'
    },
    img1:{
        width:width,
        height:height*0.23,
    },
    slide:{
        width:width,
        height:height*0.12,
        marginTop:10,
        backgroundColor:'white',
        // justifyContent:'center', //主轴
        alignItems:'center' ,
        flexDirection:'row'
    },
    list:{
        fontSize:22,
        color:'#7e7b7b',
        marginLeft:25
    }
    
})
