import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../../features/api";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
    // const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);

    const [profileData, setProfileData] = useState({
        name: user.name || "",
        email: user.email || "",
        isAdmin: user.isAdmin || false,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [updatingPassword, setUpdatingPassword] = useState(false);

    useEffect(() => {
        setProfileData({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }, [user]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setUpdatingProfile(true);

        try {
            const res = await axios.put(
                `${url}/users/${user._id}`,
                { ...profileData },
                setHeaders()
            );
            setProfileData({ ...res.data });
            toast.success("Profile updated...");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile...");
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setUpdatingPassword(true);

        try {
            await axios.put(
                `${url}/password-change/${user._id}/password`,
                { ...passwordData },
                setHeaders()
            );
            setPasswordData({ currentPassword: "", newPassword: "" });
            toast.success("Password updated...");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update password...");
        } finally {
            setUpdatingPassword(false);
        }
    };

    return (
        <StyledProfile>
            <ProfileContainer>
                <FormContainer>
                    <form onSubmit={handleProfileSubmit}>
                        <h3>User Profile</h3>
                        <div>
                            {profileData.isAdmin ? (
                                <Admin>Admin</Admin>
                            ) : (
                                <Customer>Customer</Customer>
                            )}
                        </div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={profileData.name}
                            onChange={(e) =>
                                setProfileData({ ...profileData, name: e.target.value })
                            }
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            value={profileData.email}
                            onChange={(e) =>
                                setProfileData({ ...profileData, email: e.target.value })
                            }
                        />
                        <button type="submit">
                            {updatingProfile ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </FormContainer>
                <FormContainer>
                    <form onSubmit={handlePasswordSubmit}>
                        <h3>Change Password</h3>
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, currentPassword: e.target.value })
                            }
                        />
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, newPassword: e.target.value })
                            }
                        />
                        <button type="submit">
                            {updatingPassword ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </FormContainer>
            </ProfileContainer>
        </StyledProfile>
    );
};

export default Profile;

const StyledProfile = styled.div`
    margin: 3rem;
    display: flex;
    justify-content: center;
`;

const ProfileContainer = styled.div`
    max-width: 500px;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    padding: 2rem;
`;

const FormContainer = styled.div`
    flex: 1;
    margin: 0 1rem;

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h3 {
            margin-bottom: 0.5rem;
        }
        label {
            margin-bottom: 0.2rem;
            color: gray;
        }
        input {
            margin-bottom: 1rem;
            outline: none;
            border: none;
            border-bottom: 1px solid gray;
        }
    }
`;

const Admin = styled.div`
    color: rgb(253, 181, 40);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 1rem;
`;

const Customer = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgba(38, 198, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 1rem;
`;
