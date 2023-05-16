
/*

const firebase = new FirebaseConfig();

export const FirebaseAuthService = {
  async signInWithGoogle() {
    console.log("running google");
    try {
      const result = await signInWithPopup(
        firebase.getAuth(),
        firebase.googleAuthProvider
      );

      console.log(JSON.stringify(result));

      const user = await result["_tokenResponse"];
      console.log({
        firebase_uid: user.localId,
        provider: user.providerId,
        first_name: user.firstName,
        last_name: user.lastName,
        photo_url: user.photoUrl,
        email: user.email,
        is_email_verified: user.emailVerified,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async signInWithFacebook() {
    console.log("running facebook");
    try {
      const result = await signInWithPopup(
        firebase.getAuth(),
        firebase.facebookAuthProvider
      );
      console.log(JSON.stringify(result));

      const user = await result["_tokenResponse"];
      console.log({
        firebase_uid: user.localId,
        provider: user.providerId,
        first_name: user.firstName,
        last_name: user.lastName,
        photo_url: user.photoUrl,
        email: user.email,
        is_email_verified: user.emailVerified,
      });

    } catch (error) {
      console.log(error);
    }
  },
};


 */