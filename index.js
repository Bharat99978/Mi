import { useState } from "react";

export default function Home() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");

    const executeCode = async () => {
        const response = await fetch("https://mi-back-end-vojz.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: "python",
                code: code,
            }),
        });

        const data = await response.json();
        if (data.error) {
            setOutput(data.error);
        } else {
            setOutput(data.output);
        }
    };

    return (
        <div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here"
            ></textarea>
            <button onClick={executeCode}>Run Code</button>
            <pre>{output}</pre>
        </div>
    );
}
