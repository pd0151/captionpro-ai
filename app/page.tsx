"use client";
import { useState } from "react";

export default function Home() {
const [business, setBusiness] = useState("");
const [product, setProduct] = useState("");
const [offer, setOffer] = useState("");
const [customer, setCustomer] = useState("");
const [platform, setPlatform] = useState("Instagram");
const [tone, setTone] = useState("Bold");
const [result, setResult] = useState("");

async function generateAd() {
const prompt = `
Create a business ad for:
Business: ${business}
Product: ${product}
Offer: ${offer}
Customer: ${customer}
Platform: ${platform}
Tone: ${tone}

Return:
CAPTIONS
---
VIDEO IDEAS
---
REEL SCRIPT
---
SHOT LIST
---
CALL TO ACTION
`;

const res = await fetch("/api/generate", {
method: "POST",
body: JSON.stringify({ prompt }),
});

const data = await res.json();
setResult(data.text);
}

function section(title: string, start: string, end: string | null) {
if (!result.includes(start)) return null;

let content = result.split(start)[1];
if (end && content.includes(end)) {
content = content.split(end)[0];
}

return (
<div style={card}>
<h3>{title}</h3>
<pre style={text}>{content.trim()}</pre>
</div>
);
}

return (
<main style={container}>
<h1>Business Ad Creator AI 🚀</h1>
<p>Create captions, video ideas, scripts, and ads in seconds 🔥</p>

<input placeholder="Business name" onChange={(e) => setBusiness(e.target.value)} style={input}/>
<input placeholder="What do you sell?" onChange={(e) => setProduct(e.target.value)} style={input}/>
<input placeholder="Offer" onChange={(e) => setOffer(e.target.value)} style={input}/>
<input placeholder="Target customer" onChange={(e) => setCustomer(e.target.value)} style={input}/>

<button onClick={generateAd} style={button}>
Generate Business Ad
</button>

{result && (
<div>
{section("Captions", "CAPTIONS", "---")}

{/* 🔥 VIDEO PREVIEW */}
<div style={card}>
<h3>🎥 Example Ad Video</h3>
<video
controls
style={{ width: "100%", borderRadius: "12px" }}
src="https://www.w3schools.com/html/mov_bbb.mp4"
/>
<p style={{ fontSize: "14px", color: "#666" }}>
Example preview of how your ad could look
</p>
</div>

{section("Video Ideas", "VIDEO IDEAS", "---")}
{section("Reel Script", "REEL SCRIPT", "---")}
{section("Shot List", "SHOT LIST", "---")}
{section("Call To Action", "CALL TO ACTION", null)}
</div>
)}
</main>
);
}

/* STYLES */
const container = {
maxWidth: "600px",
margin: "auto",
padding: "20px",
fontFamily: "Arial",
};

const input = {
width: "100%",
padding: "10px",
marginTop: "10px",
borderRadius: "8px",
border: "1px solid #ddd",
};

const button = {
width: "100%",
padding: "12px",
marginTop: "15px",
borderRadius: "10px",
background: "black",
color: "white",
cursor: "pointer",
};

const card = {
background: "#fff",
padding: "15px",
borderRadius: "12px",
marginTop: "20px",
border: "1px solid #eee",
};

const text = {
whiteSpace: "pre-wrap" as const,
};