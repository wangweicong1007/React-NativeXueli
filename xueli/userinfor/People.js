import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity,
    AsyncStorage
  } from 'react-native';
  import ImagePicker from 'react-native-image-picker';
import {Actions} from'react-native-router-flux';
  import Icon from 'react-native-vector-icons/AntDesign';


  const {width,height} =Dimensions.get('window');
  const data=[
      {
          title:'账户管理',
          name:'setting'
      },
      {
        title:'收货地址',
        name:'enviromento'
    },
    {
        title:'我的信息',
        name:'solution1'
    },
    {
        title:'我的订单',
        name:'profile'
    },
    {
        title:'我的二维码',
        name:'qrcode'
    },
    {
        title:'我的积分',
        name:'areachart'
    },
    {
        title:'我的收藏',
        name:'staro'
    },
  ];
  console.debug =true;
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class People extends Component {
    constructor(){
        super();
        this.state={
            imageUrl:''
        }
    }
    
    //获取照片
    componentDidMount(){
        AsyncStorage.getItem('touxiang',(err,result)=>{
            if(JSON.parse(result)){
                this.setState({
                    imageUrl: JSON.parse(result)
                })
            }
        })
    }
    takephoto=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source,
              });
              AsyncStorage.setItem("touxiang",JSON.stringify(source));
            }
          });
    }
    componentDidUpdate(){
        AsyncStorage.getItem('touxiang',(err,result)=>{
            if(JSON.parse(result) == ''){
                this.setState({
                    imageUrl:''
                })
            }else{
                this.setState({
                    imageUrl: JSON.parse(result)
                })
            }
        })
    }
    render() {
        return (
            <ScrollView>
                <View>
                    {/* 头像 */}
                    <View style={styles.top}>
                        <TouchableOpacity
                            style={{width:120,height:120,borderRadius:60,borderWidth:1,borderColor:'white'}}
                            onPress={()=>{this.takephoto()}}
                        >
                            <Image 
                                style={{width:120,height:120,borderRadius:60}}
                                source={this.state.imageUrl}
                            />
                            {/* <Image style={{width:120,height:120,borderRadius:60}} source={require('../assets/timg.jpg')} /> */}
                        </TouchableOpacity>
                        <Text style={{color:'white',fontSize:18,marginTop:5}}>BINNU DHILLON</Text>
                    </View>
                    {/* 不会写颜色波浪，截图下来的图片 */}
                    <Image source={require('../../assets/bolang.png')} />
                    {/* 个人中心 */}
                    <View style={styles.people}>
                        <View style={styles.center}>
                            <Icon name='smileo' size={18} color="#aeaeae" />
                            <Text style={{color:'#4f4e4e',fontSize:15,marginLeft:15}}>我的个人中心</Text>
                        </View>
                        <FlatList
                            numColumns={3}
                            data={data}
                            renderItem={
                                ({item})=>
                                    <View style={styles.detail}>
                                        <Icon name={item.name} size={23} color='#aeaeae' />
                                        <Text style={{color:'#4f4e4e',marginTop:8}}>{item.title}</Text>
                                    </View>
                            }
                        />
                    </View>
                    {/* E族活动 */}
                    <View style={styles.E} >
                        <View style={styles.E1}>
                            <Icon name='tago' size={18} color="#aeaeae" />
                            <Text style={{color:'#4f4e4e',fontSize:15,marginLeft:15}}>E族活动</Text>
                        </View>
                    <View style={{flexDirection:'row'}}>
                            <View 
                                    style={styles.detail} >
                                    <Icon name='tool' size={23} color='#aeaeae' />
                                    <Text style={{color:'#4f4e4e',marginTop:8}}
                                    >居家维修保养</Text>
                                </View>
                                <View 
                                    style={styles.detail} >
                                    <Icon name='car' size={23} color='#aeaeae' />
                                    <Text style={{color:'#4f4e4e',marginTop:8}}
                                    >出行接送</Text>
                                </View>
                                <View 
                                    style={styles.detail} >
                                    <Icon name='user' size={23} color='#aeaeae' />
                                    <Text style={{color:'#4f4e4e',marginTop:8}}
                                    >我的受赠人</Text>
                                </View>
                            </View>
                        <View style={{flexDirection:'row'}}>
                                <View 
                                    style={styles.detail} >
                                    <Icon name='database' size={23} color='#aeaeae' />
                                    <Text style={{color:'#4f4e4e',marginTop:8}}
                                    >我的住宅优惠</Text>
                                </View>
                                <View 
                                    style={styles.detail} >
                                    <Icon name='flag' size={23} color='#aeaeae' />
                                    <Text style={{color:'#4f4e4e',marginTop:8}}
                                    >我的活动</Text>
                                </View>
                                <View 
                                    style={styles.detail} >
                                    <Icon name='form' size={23} color='#aeaeae' onPress={()=>Actions.publish()}/>
                                    <Text style={{color:'#4f4e4e',marginTop:8}} onPress={()=>Actions.publish()}
                                    >我的发布</Text>
                                </View>
                            </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.login}
                        onPress={()=>{
                            AsyncStorage.setItem('isloading','false');
                            Actions.login()}}>
                        <Text style={{color:'#FFFFFF',fontSize:19}}>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles= StyleSheet.create({
    top:{
        width:width,
        height:height*0.18,
        backgroundColor:'#f23030',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:12
    },
    people:{
        width:width,
        height:height*0.33,
        backgroundColor:'white',
    },
    center:{
        flexDirection:'row',
        width:width,
        height:height*0.04,
        // justifyContent:'center',
        alignItems:'center',
        paddingLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    detail:{
        width:width*0.35,
        height:height*0.1,
        alignItems:'center',
        justifyContent:'center',
    },
    E:{
        backgroundColor:'white',
        marginTop:10
    },
    E1:{
        width:width,
        height:height*0.05,
        flexDirection:'row',
        paddingLeft:15,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    login :{
        width: '60%',
        height: 48,
        backgroundColor: '#f23030',
        borderRadius:15,
        marginTop:10,
        marginBottom:30,
        marginLeft:90,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
})