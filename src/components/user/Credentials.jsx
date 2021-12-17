
import css from './Credentials.module.css';
import UserPassword from './UserPassword';
import UserEmail from './UserEmail';
import { useEditProfileCtx } from '../../store/EditProfileContext';



function Credentials({userInfo}) {
    const { editPasswordToggle } = useEditProfileCtx();
    return (
        <div className={css.credentials}>
            {editPasswordToggle ? <UserPassword /> : <UserEmail userInfo={userInfo}/>}
            
            
        </div>
    );
}

export default Credentials;