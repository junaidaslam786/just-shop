import React, {useEffect} from "react";
import man from "../../../assets/images/dashboard/man.png";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../features/user/userThunk';

const UserPanel = () => {
	const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /*
    Header component is responsible for fetching
   the user's details once the broswer finds a token
  */
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails('profile'));
    }
  }, [userToken, dispatch]);
	return (
		<div>
			<div className="sidebar-user text-center">
				<div>
					<img
						className="img-60 rounded-circle lazyloaded blur-up"
						src={man}
						alt="#"
					/>
				</div>
				<h6 className="mt-3 f-14">{userInfo?.name}</h6>
				<p>general manager.</p>
			</div>
		</div>
	);
};

export default UserPanel;
