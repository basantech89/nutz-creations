import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../src/store";
import {getItem} from "../../src/utils/common";

const Profile = () => {
	const user = useSelector((state: RootState) => state.user)
	const [email, setEmail] = React.useState(user.email);

	React.useEffect(() => {
		if (!email) {
			setEmail(getItem('user'))
		}
	}, [])

	return (
		<p> { email } </p>
	)
}

export default Profile;