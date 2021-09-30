import { useState } from "react";
import { useHistory } from "react-router-dom";

function App() {
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerUser(event) {
		event.preventDefault();

		const response = await fetch("http://localhost:1337/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});

		const data = await response.json();

		if (data.status === "ok") {
			history.push("/login");
		}
	}

	return (
		// <div>
		// 	<h1>Register</h1>
		// 	<form onSubmit={registerUser}>
		// 		<input
		// 			value={name}
		// 			onChange={(e) => setName(e.target.value)}
		// 			type="text"
		// 			placeholder="Name"
		// 		/>
		// 		<br />
		// 		<input
		// 			value={email}
		// 			onChange={(e) => setEmail(e.target.value)}
		// 			type="email"
		// 			placeholder="Email"
		// 		/>
		// 		<br />
		// 		<input
		// 			value={password}
		// 			onChange={(e) => setPassword(e.target.value)}
		// 			type="password"
		// 			placeholder="Password"
		// 		/>
		// 		<br />
		// 		<input type="submit" value="Register" />
		// 	</form>
		// </div>

		<div className="container">
			<form onSubmit={registerUser}>
				<h1 className="h3 mb-3 fw-normal">Please register</h1>

				<input
					value={name}
					className="form-control"
					placeholder="Name"
					required
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					value={email}
					type="email"
					className="form-control"
					placeholder="Email address"
					required
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					value={password}
					type="password"
					className="form-control"
					placeholder="Password"
					required
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-20 btn btn-lg btn-primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default App;
