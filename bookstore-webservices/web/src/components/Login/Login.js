import { useState } from "react";

const getRequestOptions = (data) => ({
    method: 'POST',
    body: JSON.stringify(data), // send a string, rather than an object
    headers: {
        'content-type': 'application/json'
    }
});

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const submit = async ($event) => {
        $event.preventDefault();

        try {
            let response = await fetch('/api/v1/auth/login', getRequestOptions(formData))
        
            if(!response.ok) {
                throw new Error('Error logging in')
            }
            let responseData = await response.json(); // parse the body into a JSON
            localStorage.setItem('jsonwebtoken', responseData.token); // save into local-storage
        } catch(err) {
            console.error(err)
        }
    };

	const onInputChange = ($event) => {
        const {target: { name, value }} = $event;
        setFormData({
            ...formData,
            [name]: value
        })
    };
	return (
		<form onSubmit={submit}>
			<label>
				<span>Email</span>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={onInputChange}
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={onInputChange}
				/>
			</label>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
