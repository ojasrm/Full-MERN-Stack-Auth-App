import { useState } from "react";

function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function loginUser(event) {
		event.preventDefault();

		const response = await fetch("http://localhost:1337/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();

		if (data.user) {
			localStorage.setItem("token", data.user);
			alert("Login successful");
			window.location.href = "/dashboard";
		} else {
			alert("Please check your username and password");
		}
	}

	return (
		<div className="container">
			{/* <form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form> */}

			<form onSubmit={loginUser}>
				<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
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
					Sign in
				</button>
			</form>
		</div>
	);
}

export default App;
