import classes from "./Profile.module.css";

const Profile = (props) => {
    return <div className="container">
        <h1 className="page-heading">Profile</h1>
        <div className={`grid grid--2-cols ${classes['profile-form-container']} userprofile-container`}>
            <div className={`${classes['user-img-container']}`}>
                <img className={classes['user-profile-img']} src={props.image} alt="User's profile photo" />
            </div>
            <div className={`${classes['profile-form']}`}>
                <div className="flex-column">
                    <p className={classes.label}>Full Name:</p>
                    <p className={classes.info}>{props.fullName}</p>
                </div>
                <div className="flex-column">
                    <p className={classes.label}>Username:</p>
                    <p className={classes.info}>{props.username}</p>
                </div>
                <div className="flex-column">
                    <p className={classes.label}>Email:</p>
                    <p className={classes.info}>{props.email}</p>
                </div>
            </div>
        </div>
    </div>
};


export default Profile;