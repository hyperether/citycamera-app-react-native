import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Actions, Scene, Router, NavBar } from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Chooser from "./components/Chooser";
import AddPhoto from "./components/AddPhoto";
import AddDescription from "./components/AddDescription";
import AddLocation from "./components/AddLocation";

const RouterComponent = () => {
  console.log("Ruter");

// za menjanje back dugmeta
	const renderBackButton = () => {
    return (
        <TouchableOpacity
				//TODO - logOutAlert
            onPress={() => {}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('./assets/images/back_chevron.png')}
                    resizeMode={'contain'}/>
                {/* <Text>Back</Text> */}
            </View>
        </TouchableOpacity>
    );
};

  return (
    <Router>
      <Scene key="root" >
        <Scene
					hideNavBar
          key="login"
          title="Welcome to CityCam"
					component={LoginForm}
          initial
        />
				<Scene 
					key="signup" 
					title="Please signup" 
					component={SignupForm} 
				/>


        {/* <Scene key="main"> */}
          <Scene						
            key="chooser"
            title="Create a new post"
						component={Chooser}
						renderBackButton={() => renderBackButton()}
            // initial
          />
					<Scene 
						key="addPhoto" 
						title="Add a photo" 
						component={AddPhoto} />
          <Scene
            key="addLocation"
            title="Select a location"
            component={AddLocation}
          />
          <Scene
            key="addDescription"
            title="Add description"
            component={AddDescription}
          />
        {/* </Scene> */}
      </Scene>
    </Router>
  );
};

export default RouterComponent;
