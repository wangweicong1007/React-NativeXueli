import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, AsyncStorage, Alert,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import  { myFetch } from '../utils'

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
          username :'',
          pwd:'',
          pwd2:'',
          isloading:false,
          user:[]
        }
      }
  
    userhandle =(text)=>{
      this.setState({username:text})
      console.log(text)
    }
    conpwd =(text)=>{
        this.setState({pwd2:text})
    }
    pwdhandle =(text)=>{
        this.setState({pwd:text})
    }

    login =() =>{
        if(this.state.username != '' && this.state.pwd != '' && this.state.pwd != ''){
            if(this.state.pwd != this.state.pwd2){
                Alert.alert('输入密码不一致');
            }else{
                myFetch.post('/reg',{
                    username:this.state.username,
                        pwd:this.state.pwd
                }).then(res=>{
                    if(res.data.token =='1'){
                        Alert.alert('此账户已存在！');
                    }else if(res.data.token =='2'){
                        Alert.alert('连接错误!');
                    }else{
                        AsyncStorage.getItem('user').then((reg)=>{
                                AsyncStorage.setItem('user',JSON.stringify([res.data]))
                                    .then(()=>{
                                        Alert.alert('注册成功');
                                        Actions.login();
                                    })
                        })
                       
                    }
                })
            }
        }else{
            Alert.alert('不能为空！');
        }
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center'}} >
               <View
                    style={{ alignItems: 'center'}}>
                        
                    <View
                        style={styles.reg}>
                        <Icon name="user" color="red"/>
                        <TextInput placeholder="用户名" onChangeText={this.userhandle} />
                    </View>
                    <View
                        style={styles.reg}>
                        <Icon name="eye" color="red"/>
                        <TextInput 
                            placeholder="密码" 
                            onChangeText={this.pwdhandle}
                            secureTextEntry={true}
                        />
                        
                    </View>
                    <View
                        style={styles.reg}>
                        <Icon name="eye" color="red"/>
                        <TextInput 
                            placeholder="确认密码" 
                            onChangeText={this.conpwd}
                            secureTextEntry={true}
                        />
                    </View>
                        <TouchableOpacity style={{
                            width: '58%',
                            height: 40,
                            borderRadius:15,
                            color :'#fff',
                            marginTop: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f23030'
                        }} onPress={this.login}>
                            <Text style={{color:'white'}}>注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{top:'2%'}} onPress={()=>Actions.login()}>
                            <Text style={{fontSize: 16, color: "blue"}}>返回登录</Text>
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    reg:{
        width: '80%',
        marginRight: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginBottom:5
    }
})