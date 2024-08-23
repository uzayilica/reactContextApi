import React, {useEffect, useState} from 'react';
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("Error state değişti:", error);
    }, [error]);

    const Yolla = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/register", {
                username: username,
                password: password,
            });
            console.log(response.data);
            if (response.data === "user eklendi") {
                setError(""); // Başarılı kayıt durumunda hata mesajını temizle
                // Başarılı kayıt mesajını göster
                alert("Kayıt başarılı!");
            } else {
                // Diğer durumlar için (örneğin "user zaten var" veya "bilinmeyen bir hata")
                setError(response.data);
            }
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
                console.log("Hata mesajı ayarlanıyor:", err.response.data);
                setError(err.response.data);
            } else {
                console.log("Genel hata mesajı ayarlanıyor");
                setError("Bir hata oluştu.");
            }
        }
    }

    return (
        <>
            <form className={"container"} onSubmit={Yolla}>
                <label className={"form-label"}>Username:</label>
                <input type={"text"} className={"form-control"} value={username} onChange={(e) => setUsername(e.target.value)} />
                <label className={"form-label"}>Password:</label>
                <input type={"password"} className={"form-control"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type={"submit"} className={"btn btn-danger "} value={"Kayıt Ol"} />
            </form>

            {error && (
                <div style={{ backgroundColor: 'pink', padding: '10px', margin: '10px 0' }}>
                    <h3 style={{ color: 'red' }}>{error}</h3>
                </div>
            )}
        </>
    );
};

export default Register;
