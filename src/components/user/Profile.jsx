import { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { getData } from "../../utils/fetch";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Icon from "../UI/Icon";
import css from "./Profile.module.css";
import { useHistory } from "react-router-dom";
import UserInfo from "./UserInfo";
import Credentials from "./Credentials";
import { useEditProfileCtx } from "../../store/EditProfileContext";

function Profile() {
    const history = useHistory();
    const { editInfoToggle, setEditInfoToggle, handleEmailToggle, handlePasswordToggle, editEmailToggle, editPasswordToggle } = useEditProfileCtx();
    const [userInfo, setUserInfo] = useState({});

    const { token, logout } = useAuthCtx();

    const getUserData = async () => {
        const userData = await getData('user', token);
        if(userData.error === "Bad token") {
            toast.error("Session has expired. Please login again");
            logout();
            history.push('/login');
            return;
        }
        setUserInfo(userData.data[0]);
    }

    useEffect(() => {
        getUserData();
        return () => {
            setUserInfo({});
        }
    }, [])

    return (
        <section className={css["profile-wrapper"]}>
            <div className={css["control-panel"]}>
                <div className={css["cred-control-panel"]}>
                    <Button mainBtn={editEmailToggle} clickFunc={handleEmailToggle}>Change Email</Button>
                    <Button mainBtn={editPasswordToggle} clickFunc={handlePasswordToggle}>Change Password</Button>
                </div>
                
                <Button clickFunc={() => setEditInfoToggle(!editInfoToggle)}><Icon icon='fa-pencil' /> Edit Info</Button>
            </div>

            <div className={css.forms}>
                <Credentials userInfo={userInfo} />
                <UserInfo userInfo={userInfo} />
            </div>
        </section>
    );

}

export default Profile;
