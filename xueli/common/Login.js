import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, AsyncStorage,StyleSheet,BackHandler,ToastAndroid, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
          username :'',
          pwd:'',
          isloading:false
        }
        AsyncStorage.getItem('isloading').then((res)=>{
          this.setState({
            isloading:res
          })
        })
      }
      
    pwdhandle =(text)=>{
        this.setState({pwd:text})
    }
    userhandle =(text)=>{
      this.setState({username:text})
      console.log(text)
    }
    login = ()=>{
      if(this.state.username != '' && this.state.pwd != '' ){
        AsyncStorage.getItem('user').then((res)=>{
          let user = JSON.parse(res);
          for(var i=0 ;i<user.length;i++){
            //判断账号密码
            if(user[i].username == this.state.username && user[i].pwd == this.state.pwd){
                AsyncStorage.setItem('isloading','true');
                this.setState({
                  isloading:'true'
                  })
                  Actions.lightbox();
                  return true;
            }else{
              AsyncStorage.setItem('isloading','false')
              ToastAndroid.show("账号或密码错误",ToastAndroid.SHORT); 
            }
          }
      })
      }else{
          ToastAndroid.show("账号或密码不能为空",ToastAndroid.SHORT);
          return false;
        }
    }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
              
          <View
            style={styles.login}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" onChangeText={this.userhandle} />
          </View>
          <View
            style={styles.login}>
            <Icon name="eye" color="red"/>
            <TextInput 
                placeholder="密码" 
                secureTextEntry={true}
                onChangeText={this.pwdhandle}
            />
          </View>
            <TouchableOpacity 
                style={{
                  width: '60%',
                  height: 40,
                  backgroundColor: '#f23030',
                  borderRadius:15,
                  marginTop: 25,
                  alignItems: 'center',
                  justifyContent: 'center'}}
                  onPress={this.login}>
                <Text style={{color:'#FFFFFF'}}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{top:'2%'}}
                onPress={()=>Actions.register()}>
                <Text style={{fontSize: 16,color:'blue'}}>没有账号？注册</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading ?<View style={{height:30,alignItems:'center',paddingTop:40}}><Text style={{color:'gray',fontSize:20}}>正在登录...</Text></View>:null
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
    login:{
      width: '80%',
      marginRight: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius:10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginBottom:10
    }
})