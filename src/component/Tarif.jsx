import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';

const Tarif = () => {
    const [tarifler, setTarifler] = useState([]);
    const { authState } = useAuthContext();

    useEffect(() => {
        // Tarifleri getirmek için API çağrısı
        const fetchTarifler = async () => {
            try {
                const response = await fetch('https://your-api-url.com/tarifler', {
                    headers: {
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTarifler(data);
                } else {
                    console.error('Tarifler getirilemedi');
                }
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchTarifler();
    }, [authState.token]);

    return (
        <div>
            <h1>Tarifler</h1>
            {tarifler.length > 0 ? (
                <ul>
                    {tarifler.map((tarif) => (
                        <li key={tarif.id}>
                            <h2>{tarif.baslik}</h2>
                            <p>{tarif.aciklama}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
};

export default Tarif;