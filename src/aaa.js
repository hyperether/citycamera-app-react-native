// Left back button
renderBackButton = () => {
    return (
            <TouchableOpacity
            //TODO - logOutAlert
                    onPress={() => {this.logOutAlert()}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft:18 }}>
                            <Image
                                    source={require('./assets/images/exit.png')}
                                    resizeMode={'contain'}/>
                            {/* <Text>Back</Text> */}
                    </View>
            </TouchableOpacity>
        );
};

logOutAlert(){
Alert.alert(
  'Log Out',
  'Do you want to log out?',
  [
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'Yes', onPress: () => this.logOut()},
  ],
  { cancelable: false }
)
}

logOut(){
    console.log('test',this.props);
    this.props.loginUser({});
    this.props.postSent({});
    Actions.pop()
}