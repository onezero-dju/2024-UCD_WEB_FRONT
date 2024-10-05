import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const useCheckLogin = (name) => {
    const [cookies, setCookie, removeCookie] = useCookies([name]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies[name]){
            navigate('/main');
        }
        else{
            navigate('/login')
        }
    }, [cookies[name]]);

    return [cookies, setCookie, removeCookie];
}
export default useCheckLogin;