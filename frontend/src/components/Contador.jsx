import {useState} from "react";

function Contador(){

    const [clicks, setClicks] = useState(0);

    return (
        <div style={{textAlign: 'center', marginTop: '20px'}}>
            <h3>Contador de Clicks</h3>
            <p>Has hecho clic {clicks} veces </p>
            <button onClick={() => setClicks(clicks+1)}
                style= {{padding: '10 px 20px', cursor: 'pointer', background: 'blue', color: 'white', border: 'none', borderRadius:'4px'}}
                >
                    Incrementar 
            </button>
        </div>
    );

}