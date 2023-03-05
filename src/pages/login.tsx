import Layout from "@/components/layout";
import styles from "@/styles/Login.module.css"
import buttons from "@/styles/Buttons.module.css"
import Script from "next/script";

export default function Login({ username, error }: { username?: string, error?: string }) {

    const closeErr = () => {
        if (typeof document != undefined) {
            document.getElementById('clsbtn')!.style.display = 'none'
        }
    }
    return (
        <Layout title={"Login - Whatsapp clone"}>
            <form action="/api/login" method="POST">
                <div className={styles["up-login-card"]}>
                    <div className={styles["login-card"]}>
                        <h2 style={{ "textAlign": "center", "color": "#eff3f5" }}>Log in to continue</h2>

                        {error ? (
                            <div className="alert" id="clsbtn">
                                <span className="closebtn" onClick={closeErr}>&times;</span>
                                {error}
                            </div>
                        ) : <></>
                        }


                        <div className={styles["login-forms"]}>

                            <div className={styles["form-group"]}>
                                <label className="label" htmlFor="username">
                                    Username
                                </label>
                                <input className={styles["username-input"]} id="username" name="username" defaultValue={username} required />
                            </div>
                            <div className={styles["form-group"]}>
                                <label className="label" htmlFor="password">
                                    Password
                                </label>
                                <input className={styles["password-input"]} type="password" name="password" required />
                            </div>
                        </div>

                        <button type="submit" className={`${styles["submit-input"]} ${buttons["button-3"]}`}>Login</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

Login.getInitialProps = async function (ctx: { query: { user?: string; error?: string; }; }) {
    return {
        username: ctx.query.user ? ctx.query.user : undefined,
        error: ctx.query.error ? ctx.query.error : undefined
    }
}