import React, { Component } from 'react'
import {View,Image,TextInput,Text,Dimensions,ScrollView,StyleSheet,FlatList} from 'react-native' 
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/FontAwesome';

const {width,height} =Dimensions.get('window');

export default class List extends Component {
    constructor(){
        super();
        let Fa =[
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/yumi.png")
            },
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/supian.png")
            },
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/yumi.png")
            },
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/supian.png")
            },
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/yumi.png")
            },
            {
                title:'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
                price:'36.00',
                img:require("../../assets/supian.png")
            },
        ]
        // let ta=["综合","销量","新品","价格","信用"];
        let ta=[
            {
                title:"综合",
                colo:'#939393'
            },
            {
                title:"销量",
                colo:'#939393'
            },
            {
                title:"综合",
                colo:'#939393'
            },
            {
                title:"新品",
                colo:'#939393'
            },
            {
                title:"信用",
                colo:'#939393'
            },
        ]
        let col=false
        this.state={
            Fa,
            ta,
            col,
        }
    }
    zoom=(index,item)=>{
        let ta=this.state.ta
        if(item.colo=='#939393'){
            ta[index].colo='#f23030';
            this.setState({
                ta
            })
            console.log(ta);
        }else{
            ta[index].colo='#939393';
            this.setState({
                ta
            })
        }
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <View style={styles.head1}>
                        {/* 搜索框 */}
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <TextInput 
                                placeholder="请输入商品名称"
                                style={styles.search}
                                />
                        </View>
                        <Icon name='search' style={styles.icon} />
                    </View>
                    {/* 中间列表 */}
                    <View style={styles.head2}>
                        <FlatList 
                            numColumns={5}
                            data={this.state.ta}
                            renderItem={
                                ({item,index})=>
                                <View style={{
                                    justifyContent:'center',
                                    // backgroundColor:'yellow',
                                    paddingLeft:width*0.105,
                                    paddingTop:height*0.01

                                }}>
                                    <Text 
                                    onPress={()=>{this.zoom(index,item)}}
                                    style={[{fontSize:18,color:item.colo}]}>
                                    {item.title}</Text>
                                </View>
                            }
                        />   
                    </View> 
                    {/* 下面商品 */}
                    <FlatList
                        numColumns={2}
                        ListFooterComponent={<Text></Text>}
                        data={this.state.Fa}
                        renderItem={
                            ({item,index})=><View style={styles.slide}>
                                <Image style={styles.img} source={item.img} />
                                <Text style={{color:'#999',paddingTop:12,fontSize:11}} >{item.title}</Text>
                                <Text style={{color:'#f23030',width:"100%",marginTop:10}}>{item.price}</Text>
                            </View>
                        }
                    />
                </View>
            </ScrollView>
        )
    }
}
const styles= StyleSheet.create({
    icon:{
        marginTop:height*0.02,
        marginLeft:width*0.8,
        position:'absolute',
        color:'#a6a6a6',
        fontSize:width*0.035
    },
    search:{
        width:width*0.8,
        height:height*0.045,
        borderRadius:height*0.005,
        alignItems:'center',
        color:'#a6a6a6',
        backgroundColor:'#e5e4e4',
        marginTop:height*0.01,
        paddingLeft:width*0.03,
        fontSize:15,
        // marginLeft:width*0.2
        // justifyContent:'center'

    },
    head1:{
        width:width,
        height:height*0.063,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
        backgroundColor:'white'
    },
    head2:{
        width:width,
        height:height*0.05,
        borderBottomWidth:0.5,
        borderBottomColor:'#bfbfbf',
        backgroundColor:'white',
    },
    slide:{
        width:width*0.43,
        height:height*0.26,
        marginLeft:width*0.04,
        marginTop:width*0.025,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:width*0.03
    },
    img:{
        width:width*0.2,
        height:height*0.15,
    },
})