import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const useCheckLogin = () => {
    const {cookies, setCookie} = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        if(cookies === undefined) {
            navigate('/main');
        }
    }, [cookies]);
}
export default useCheckLogin;