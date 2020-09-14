import React,{useEffect,useState} from 'react'
import { View, Text,Image ,StyleSheet} from 'react-native'
import { AuthContext } from "../context"
import  Firebase from '../../config/Firebase'

const DrawerProfile = () => {
    const {API_URL} = React.useContext(AuthContext)
    const {ASSETS_URL} = React.useContext(AuthContext)

    const [userImage, setuserImage] = useState(0)
    const [username, setusername] = useState('Jon Doe')

    useEffect(() => {
        fetch(API_URL+`/api/users/${Firebase.auth().currentUser.phoneNumber}`)
        .then((response) => response.json())
        .then((json) => {
            setusername(json.response[0].name)
            setuserImage(ASSETS_URL+json.response[0].profile_pic)
        })
        .catch((error)=>{
          alert("Network Error")
        })
    }, [])

    return (
        <View style={styles.container}>
            {userImage?(<Image source={{uri:userImage}} style={styles.avatar}/>):(<Image source={require('../../assets/userdefault.png')} style={styles.avatar}/>)}
            <Text>{username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        height:100,
        width:100,
        borderRadius:75
    },
    container:{
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        marginTop:10
    }
    
})

export default DrawerProfile
