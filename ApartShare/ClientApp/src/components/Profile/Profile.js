import classes from "./Profile.module.css";

const UserProfile = (props) => {
    return <div className={`container ${classes['text-align-left']}`}>
        <h1 className="page-heading">Profile</h1>
        <div className={`grid grid--2-cols ${classes['profile-form-container']}`}>
            <div className={`${classes['user-img-container']}`}>
                <img className={classes['user-profile-img']} src={props.image} alt="User's profile photo" />
            </div>
            <div className={`text-align-left ${classes['profile-form']}`}>
                <div>
                    <p className={classes.label}>Full Name:</p>
                    <p className={classes.info}>{props.fullName}</p>
                </div>
                <div>
                    <p className={classes.label}>Username:</p>
                    <p className={classes.info}>{props.username}</p>
                </div>
                <div>
                    <p className={classes.label}>Email:</p>
                    <p className={classes.info}>{props.email}</p>
                </div>
            </div>
        </div>
    </div>
};


export default UserProfile;