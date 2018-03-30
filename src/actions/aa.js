export const loginUser = ({ userName, password }) => {
  console.log({ userName, password });

  return dispatch => {
    // disptach({type: LOGIN_USER});cs

    API.login(userName, password)
      .then(response => {
        dispatch({ type: "LOGIN_USER_SUCCESS", payload: response });

        try {
          AsyncStorage.setItem("user", JSON.stringify(response.data.user))

            .then(() => {
              AsyncStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              ).then(() => {
                console.log('User login data saved in storage');
                Session.save(response.data.user, response.data.token);
                console.log('User session',Session.getUser());
                Actions.postCreator();            
              });
            })
            .catch(() => {
              console.log("Greska prilikom snimanja korisnika.");
            });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log("Logovanje nije uspelo: " + error);
      });
  };
};
