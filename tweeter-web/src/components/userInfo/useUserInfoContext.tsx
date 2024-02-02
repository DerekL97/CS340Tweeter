import { useContext } from "react"
import { UserInfoContext } from "./UserInfoProvider"



const useUserInfoContext = () => {
	const { currentUser,
		displayedUser,
		authToken,
		setDisplayedUser,
		updateUserInfo,
		clearUserInfo
	} = useContext(UserInfoContext)
	return { currentUser,
		displayedUser,
		authToken,
		setDisplayedUser,
		updateUserInfo,
		clearUserInfo }
}

export default useUserInfoContext