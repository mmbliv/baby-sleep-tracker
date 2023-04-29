import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { JwtUtils, UrlUtils } from "../../../constants/Utils";

// export const NextAuthUtils = {
//   refreshToken: async function (refreshToken) {
//     try {
//       const response = await axios.post(
//         UrlUtils.makeUrl(
//           process.env.BACKEND_API_BASE,
//           "auth",
//           "token",
//           "refresh"
//         ),
//         {
//           refresh: refreshToken,
//         }
//       );

//       const { access, refresh } = response.data;
//       return [access, refresh];
//     } catch (error) {
//       console.error(error);
//       return [null, null];
//     }
//   },
// };

const settings = {
  // secret: process.env.SESSION_SECRET,
  // session: {
  //   jwt: true,
  //   maxAge: 24 * 60 * 60, // 24 hours
  // },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     if (account.provider === "google") {

  //       try {
  //         const reponse = await axios.post(
  //           "http://127.0.0.1:8000/api/social/login/google/",
  //           {
  //             access_token: account.access_token,
  //             id_token: account.id_token,
  //           }
  //         );
  //         console.log(reponse.data, "/////////");
  //         user.accessToken = reponse.data.access_token;
  //         return true;
  //       } catch (err) {
  //         console.log("err");
  //         return false;
  //       }
  //     }
  //     return false;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     return token;
  //   },
  //   async session(session, user) {
  //     return session;
  //   },
  // },
  // callbacks: {
  //   async jwt(token, user, account, profile, isNewUser) {
  //     // user just signed in
  //     // console.log("&&&&", token, "&&&&&&");
  //     if (token) {
  //       // may have to switch it up a bit for other providers
  //       if (token.account.provider === "google") {
  //         // extract these two tokens
  //         // const { accessToken, idToken } = token.account;

  //         // console.log(token.account.access_token, "*******");
  //         // make a POST request to the DRF backend
  //         try {
  //           const response = await axios.post(
  //             // tip: use a seperate .ts file or json file to store such URL endpoints
  //             // "http://127.0.0.1:8000/api/social/login/google/",
  //             UrlUtils.makeUrl(
  //               "http://127.0.0.1:8000/api/social/login/google/",
  //               "social",
  //               "login",
  //               token.account.provider
  //             ),
  //             {
  //               access_token: token.account.access_token, // note the differences in key and value variable names
  //               id_token: token.account.id_token,
  //             }
  //           );
  //           console.log(response, "%%%%%%%%%");
  //           // extract the returned token from the DRF backend and add it to the `user` object
  //           const { access_token, refresh_token } = response.data;
  //           // reform the `token` object from the access token we appended to the `user` object
  //           token = {
  //             ...token.token,
  //             accessToken: access_token,
  //             refreshToken: refresh_token,
  //           };
  //           console.log(token, "*******");
  //           return token;
  //         } catch (error) {
  //           return null;
  //         }
  //       }
  //     }

  //     // user was signed in previously, we want to check if the token needs refreshing
  //     // token has been invalidated, try refreshing it
  //     if (JwtUtils.isJwtExpired(token.accessToken)) {
  //       const [newAccessToken, newRefreshToken] =
  //         await NextAuthUtils.refreshToken(token.refreshToken);

  //       if (newAccessToken && newRefreshToken) {
  //         token = {
  //           ...token,
  //           accessToken: newAccessToken,
  //           refreshToken: newRefreshToken,
  //           iat: Math.floor(Date.now() / 1000),
  //           exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
  //         };

  //         return token;
  //       }

  //       // unable to refresh tokens from DRF backend, invalidate the token
  //       return {
  //         ...token,
  //         exp: 0,
  //       };
  //     }

  //     // token valid
  //     return token;
  //   },

  //   async session(session, userOrToken) {
  //     session.accessToken = userOrToken.accessToken;
  //     return session;
  //   },
  // },
};

const nextauth = (req, res) => NextAuth(req, res, settings);
export default nextauth;
