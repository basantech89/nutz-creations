import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../src/store";
import {getItem} from "../../src/utils/common";
import {useRouter} from "next/router";

const Profile = () => {
	const router = useRouter()
	const loggedInUser = useSelector((state: RootState) => state.user)
	const [user, setUser] = React.useState(loggedInUser);

	React.useEffect(() => {
		if (!user.email) {
			const currentUser = getItem('user')
			if (currentUser) {
				setUser(currentUser)
			} else {
				router.push('/signin')
			}
		}
	}, [])

	return (
		<p> Hello {user?.firstName} </p>
	)
}

export default Profile;