import React, { Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import {  useNavigate } from "react-router-dom";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const LoginTabset = () => {
	const history = useNavigate();



	const clickActive = (event) => {
		document.querySelector(".nav-link").classList.remove("show");
		event.target.classList.add("show");
	};


	return (
		<div>
			<Fragment>
				<Tabs>
					<TabList className="nav nav-tabs tab-coupon">
						<Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<User />
							Login
						</Tab>
						<Tab className="nav-link" onClick={(e) => clickActive(e)}>
							<Unlock />
							Register
						</Tab>
					</TabList>

					<TabPanel>
						<LoginForm />
					</TabPanel>
					<TabPanel>
						<RegisterForm />
					</TabPanel>
				</Tabs>
			</Fragment>
		</div>
	);
};

export default LoginTabset;
