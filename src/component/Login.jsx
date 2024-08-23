import React, {useEffect, useState} from 'react';
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, authState } = useAuthContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (authState.isAuthenticated ) {
            navigate('/home');

        }
    }, []);
    // Eğer kullanıcı giriş yapmışsa login sayfasına gitmesin


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/login", {
                username,
                password,
            });

            if (response.status === 200) {
                const token = response.data;

                // Token'ı geçerli olduğunu doğrulamak için bir işlem yapın
                // Örneğin, token'ın belirli bir yapıya sahip olduğunu kontrol edebilirsiniz

                // Token'ı authContext'e kaydedin ve yönlendirin
                login(token);
                navigate('/home');
            } else {
                console.error('Login failed: Invalid credentials');
                // Kullanıcıya hata mesajı gösterin
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Kullanıcıya hata mesajı gösterin
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};

export default Login;
