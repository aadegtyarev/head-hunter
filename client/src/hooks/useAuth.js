import { onMounted, ref } from "vue";
import axios from "axios";
import useToken from "./useToken";
import store from "@/store";
import router from "@/router/router";

export default function useAuth() {
    const { createToken, deleteToken, checkToken } = useToken()

    const login = async (auth) => {
        const [response] = await Promise.all([
            checkUser(auth)
        ]);

        if (response.isValid) {
            store.state.auth.isAuth = true
            router.push('/')

            const [token] = await Promise.all([
                createToken(response.user_id)
            ]);
            // console.log(token)

            const [res] = await Promise.all([
                checkToken(token)
            ]);

            $cookies.set("head-hunter", {
                "id": response.user_id,
                "token": token
            }, "7d")
        }
    };

    const logout = async () => {
        try {
            if ($cookies.get("head-hunter")) {
                const user_id = $cookies.get("head-hunter").id
                deleteToken(user_id)
                $cookies.remove("head-hunter")
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    const checkUser = (auth) => {
        return new Promise((resolve, reject) => {
            axios.get("/user-valid-password",
                {
                    params: {
                        login: auth.login,
                        password: auth.password,
                    },
                }
            ).then(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            })
        })
    };

    const checkCookie = async () => {
        try {
            const cookie = $cookies.get("head-hunter")
            if (cookie) {
                const [res] = await Promise.all([
                    checkToken(cookie.token)
                ]);
                store.state.auth.isAuth = res
                if (res) {
                    router.push('/')
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    return {
        login,
        logout,
        checkCookie
    };
}
