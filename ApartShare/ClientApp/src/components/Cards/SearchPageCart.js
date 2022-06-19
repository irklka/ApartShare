import classes from './SearchPageCart.module.css';

const SearchPageCart = (props) => {
    return <div className={`${classes['flex-column']} ${classes['result-card']}`}>
        <img className={classes['result-card--img']} src={props.img} alt="House image" />
        <div className={`${classes['flex-column']} ${classes['result-card--info']}`}>
            <div className={classes['location-info']}>
                <p>{props.address}</p>
                <div>
                    <span>{`${props.distance} to center`}</span>
                    <span>{`${props.beds} beds`}</span>
                </div>
            </div>
            <p className={classes['result-card--desc']}>{props.description}</p>
            <div className={classes['result-card--bot']}>
                <button className={`btn btn--full ${classes['btn--book-now']}`}>Book now</button>
            </div>
        </div>
    </div>
}

export default SearchPageCart;