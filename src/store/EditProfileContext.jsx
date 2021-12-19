import React, { useContext, useState } from 'react';

const EditProfileContext = React.createContext({});

function EditProfileProvider({ children }) {
    const [editEmailToggle, setEditEmailToggle] = useState(false);
    const [editPasswordToggle, setEditPasswordToggle] = useState(false);
    const [editInfoToggle, setEditInfoToggle] = useState(false);

    const handleEmailToggle = () => {
        if(editEmailToggle) {
            setEditEmailToggle(false);
            setEditPasswordToggle(false);
        } else if (editPasswordToggle) {
            setEditPasswordToggle(false);
            setEditEmailToggle(true);
        } else {
            setEditEmailToggle(true);
        }
    }

    const handlePasswordToggle = () => {
        if(editPasswordToggle) {
            setEditPasswordToggle(false);
            setEditEmailToggle(false);
        } else if (editEmailToggle) {
            setEditEmailToggle(false);
            setEditPasswordToggle(true);
        } else {
            setEditPasswordToggle(true);
        }
    }

    const finalContextValues = {
        editEmailToggle,
        setEditEmailToggle,
        editPasswordToggle,
        setEditPasswordToggle,
        editInfoToggle,
        setEditInfoToggle,
        handleEmailToggle,
        handlePasswordToggle
    };
    return (
        <EditProfileContext.Provider value={finalContextValues}>
            {children}
        </EditProfileContext.Provider>
    );
}

export default EditProfileProvider;

export function useEditProfileCtx() {
    return useContext(EditProfileContext);
}