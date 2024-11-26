import React from 'react'
import useCheckLogin from "../../hooks/useCheckLogin";
import "./SignOutButton.css"
import { useCookies } from "react-cookie";

const SignOutButton = () => {
  const [cookies, setCookie, removeCookie] = useCheckLogin('token');


  function handleSignOut() {
    removeCookie('token');
    console.log("Removed token")
  }

  return (
    <>
      <button className="logout-wrapper" onClick={handleSignOut}>
        <img src='/assets/icons/logout.png' alt='Logout Button' />
      </button>
    </>
  )
}
export default SignOutButton;