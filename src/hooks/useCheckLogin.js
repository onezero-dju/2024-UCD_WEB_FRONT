import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const useCheckLogin = () => {
    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cookies['token']) {
            navigate('/login');
        }
    }, [cookies['token']]);
}
export default useCheckLogin;