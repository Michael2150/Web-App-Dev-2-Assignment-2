import { useAuth } from "../../contexts/authContext";
import "../templateAuthPage/login.css";
import { getUserSettings, setUserSettings } from "../../database/dataAccess";
import { useQuery } from "react-query";
import Spinner from '../spinner';


export default function AccountPageTemplate() {
    const { currentUser } = useAuth();
    //Make sure the data is retrieved before rendering the page
    const {data: user_settings, error, isLoading, isError }  = useQuery(["user_settings", currentUser.uid], getUserSettings, {cacheTime: 0, staletime: 0});
    
    if (isLoading) {
        return <>
        <br/><br/><br/><Spinner />
        </>
    }
    
    if (isError) {
        return <><br/><br/><br/><h1>{error.message}</h1></>
    }  

    function handleSubmit(event) {
        event.preventDefault();
        const premium = document.getElementById("premium").checked;
        console.log(premium);
        setUserSettings({user_settings: user_settings, premium_enabled: premium});
        console.log("Submitted new settings", user_settings);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    
    return (
        <div className="app">
          <div className="login-form">
            <div className="title"></div>
                <div className="login">
                    <div className="login__container">
                        <h1>Account Details</h1>
                        <h5>Email: {currentUser.email}</h5>
                        <form onSubmit={handleSubmit}>
                            <h3>Enable premium features</h3>
                            {user_settings.premium_enabled ? 
                                <input type="checkbox" id="premium" name="premium" defaultChecked/> : 
                                <input type="checkbox" id="premium" name="premium"/>}
                            <label htmlFor="premium"> Enabled</label>
                            <div className="button-container">
                              <input type="submit" value="Save"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
          </div>
    );
}