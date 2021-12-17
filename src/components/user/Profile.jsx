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

function Profile() {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({});

    const [editCredToggle, setEditCredToggle] = useState(false);
    const [editInfoToggle, setEditInfoToggle] = useState(false);

    const { token, logout } = useAuthCtx();

    const getUserData = async () => {
        const userData = await getData('user/', token);
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
            <div className={css.container}>
                <Credentials userInfo={userInfo} editCredToggle={editCredToggle} setEditCredToggle={setEditCredToggle}/>
                
                <div className={css["control-panel"]}>
                    <Button clickFunc={() => setEditCredToggle(!editCredToggle)}>Change password</Button>
                    <Button clickFunc={() => setEditInfoToggle(!editInfoToggle)}><Icon icon='fa-pencil' /> Edit Info</Button>
                </div>
            </div>
            
            <UserInfo userInfo={userInfo} editInfoToggle={editInfoToggle} setEditInfoToggle={setEditInfoToggle}/>
        </section>
    );
}

export default Profile;