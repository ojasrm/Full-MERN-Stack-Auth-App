import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
	const history = useHistory();
	const [quote, setQuote] = useState("");
	const [tempQuote, setTempQuote] = useState("");

	async function uploadFunction() {
		const req = await fetch("http://localhost:1337/api/quote", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const data = await req.json();
		if (data.status === "ok") {
			setQuote(data.quote);
		} else {
			alert(data.error);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode(token);
			if (!user) {
				localStorage.removeItem("token");
				history.replace("/login");
			} else {
				uploadFunction();
			}
		}
	}, []);

	// async function updateQuote(event) {
	// 	event.preventDefault();

	// 	const req = await fetch("http://localhost:1337/api/quote", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"x-access-token": localStorage.getItem("token"),
	// 		},
	// 		body: JSON.stringify({
	// 			quote: tempQuote,
	// 		}),
	// 	});

	// 	const data = await req.json();
	// 	if (data.status === "ok") {
	// 		setQuote(tempQuote);
	// 		setTempQuote("");
	// 	} else {
	// 		alert(data.error);
	// 	}
	// }

	return (
		// <div className="container">
		// 	<h1>Welcome to our Website</h1>

		// 	<button className="w-20 btn btn-md btn-success m-2">Upload Photo</button>
		// 	<br />
		// 	<button className="w-20 btn btn-md btn-success m-2">Upload CV</button>
		// </div>

		<div className="container">
			<div className="row">
				<h1>Welcome to our Website</h1>
				<form>
					<div className="form-group">
						<input type="file" />
					</div>
					<div className="form-group">
						<button className="w-20 btn btn-md btn-success m-2" type="submit">
							Upload Photo
						</button>
					</div>
				</form>
				<form>
					<div className="form-group">
						<input type="file" />
					</div>
					<div className="form-group">
						<button className="w-20 btn btn-md btn-success m-2" type="submit">
							Upload CV
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Dashboard;
