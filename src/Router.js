import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Actions, Scene, Router, NavBar } from "react-native-router-flux";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import a from "./components/a";
import AddPhoto from "./components/AddPhoto";
import AddDescription from "./components/AddDescription";
import AddLocation from "./components/AddLocation";
import PostCreator from "./components/PostCreator";

const RouterComponent = () => {

// za menjanje back dugmeta
	// const renderBackButton = () => {
  //   return (
  //       <TouchableOpacity
	// 			//TODO - logOutAlert
  //           onPress={() => {}}>
  //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //               <Image
  //                   source={require('./assets/images/back_chevron.png')}
  //                   resizeMode={'contain'}/>
  //               {/* <Text>Back</Text> */}
  //           </View>
  //       </TouchableOpacity>
    // );
// };

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
            key="postCreator"
            title="Create a new post"
						component={PostCreator}
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
