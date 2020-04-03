import React, { Component } from 'react'
import { Text, View, ScrollView,Dimensions,StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from'react-native-router-flux';

const {width,height} =Dimensions.get('window');
let page=1;

export default class Publish extends Component {
    constructor(){
        super();
        let num;
        this.state={
            tits:[],
        }
        
    }
    componentDidMount=()=>{
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+page)
        .then(res=>res.json())
        .then(res=>{
            // console.log(res.data);
            this.setState({tits:res.data});
        })
        
    }
    judge=()=>{
        //获取翻页的页数进行判断
        if(page == 1){
           ToastAndroid.show('已经是第一页了',100); 
        }else{
            page=page-1;
            fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+page)
            .then(res=>res.json())
            .then(res=>{
                // console.log(res.data);
                this.setState({tits:res.data});
            })
        }

    }
    //下一页
    setNext=()=>{
        page=page+1;
        fetch('https://cnodejs.org/api/v1/topics?limit=15&page='+page)
            .then(res=>res.json())
            .then(res=>{
                // console.log(res.data);
                this.setState({tits:res.data});
            })
    }
    render() {
        return (
            <View>
                <ScrollView style={{backgroundColor:'white'}}>
                <View style={styles.top} >
                    <Icon name='left' style={styles.icon} onPress={Actions.pop} />
                    <Text style={{color:'white',fontSize:20,position:'absolute'}}>我的发布</Text>
                    <Icon name='ellipsis1' style={styles.icon1}/>
                </View>
                    {
                        this.state.tits.map((item,index)=>(
                            <View>
                                    <View style={{flexDirection:'row',marginLeft:10}}>
                                        <Text 
                                            style={{
                                                fontSize:11,
                                                // backgroundColor:'red',
                                                width:width*0.6,
                                                height:30,
                                            }}
                                        >{item.title.length>15?
                                            <Text>{item.title.slice(0,15)}...</Text>
                                        :
                                            <Text>{item.title}</Text>
                                        }</Text>
                                        <Text
                                            style={{marginRight:width*0.07,fontSize:11}}
                                        >{item.create_at.slice(0,10)}</Text>
                                        <Text style={{fontSize:11}}>{item.create_at.slice(8,10)%2?
                                            <Text>已回复</Text>:<Text style={{color:'red'}}>待回复</Text>
                                        }</Text> 
                                    </View>
                            </View>
                        ))
                    }
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={styles.cli}
                            onPress={()=>{this.judge()}}
                        >
                            <Text
                                style={{color:'white',fontSize:12}}
                            >上一页
                            </Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:width*0.2}}>第{page}页</Text>
                        <TouchableOpacity style={[styles.cli,{marginLeft:width*0.15}]} onPress={()=>this.setNext()}>
                            <Text style={{color:'white',fontSize:12}}>下一页</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    cli:{
        width:70,
        height:25,
        backgroundColor:'#f23030',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:width*0.1
    },
    top:{
        width:width,
        height:height*0.06,
        backgroundColor:'#f23030',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
    icon:{
        color:'white',
        fontSize:width*0.04,
        marginRight:width*0.8
    },
    icon1:{
        color:'white',
        fontSize:width*0.07,
    },
})
