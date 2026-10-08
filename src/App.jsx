import { useState, useEffect } from "react";
import missions from "./data/missions";
import PlantProgress from "./components/PlantProgress";

function App() {

  const [page, setPage] = useState("home");
  const [missionList, setMissionList] = useState(() => {
 
const savedMissions =
localStorage.getItem("missions");
 
return savedMissions
? JSON.parse(savedMissions)
: missions;
 
});
  const [selectedMission, setSelectedMission] = useState(null);
  const completedMissions =
  missionList.filter((mission) => mission.completed).length;
  useEffect(() => {
 
localStorage.setItem(
"missions",
JSON.stringify(missionList)
);
 
}, [missionList]);

return (
<div
style={{
backgroundColor: "#F5F1E8",
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "20px",
}}
>
{page === "home" && (
<div
style={{
textAlign: "center",
maxWidth: "700px",
width: "100%",
}}
>
<PlantProgress completed={completedMissions} />
 
<h1
style={{
color: "#44513D",
fontSize: "clamp(2rem, 8vw, 3.2rem)",
marginBottom: "10px",
lineHeight: "1.2",
}}
>
O Primeiro Dia
<br />
do Resto das
<br />
Nossas Vidas
</h1>
 
<p
style={{
color: "#6B7A52",
fontSize: "clamp(1rem, 4vw, 1.3rem)",
}}
>
Parabéns piki!!❤️
</p>
 
<button
onClick={() => setPage("letter")}
style={{
marginTop: "30px",
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "15px 30px",
borderRadius: "12px",
cursor: "pointer",
}}
>
Começar
</button>
</div>
)}

{page === "letter" && (
<div
style={{
maxWidth: "700px",
width: "100%",
textAlign: "center",
color: "#44513D",
}}
>
<h1>❤️</h1>
 
<h2
style={{
color: "#44513D",
fontSize: "clamp(1.5rem, 5vw, 2rem)",
}}
>
Parabéns Piki!!
</h2>
 
<p
style={{
lineHeight: "1.8",
fontSize: "clamp(1rem, 4vw, 1.3rem)",
}}
>
Tenho uma surpresa para ti.
<br /><br />
 
Mas antes de a descobrires ou tentares adivinhar, quero que
façamos algo antes.
<br /><br />
 
Ao longo dos próximos meses vais encontrar dates 
em forma de missões.
<br /><br />
 
Cada missão concluída vai aproximar-nos do nosso próximo date
e dizer uma pista da surpresa final!!
<br /><br />
 
Boa sorte 🌿
</p>
 
<button
onClick={() => setPage("missions")}
style={{
marginTop: "30px",
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "15px 30px",
borderRadius: "12px",
cursor: "pointer",
}}
>
Aceito o desafio 🌿
</button>
</div>
)}
 
{page === "missions" && (
<div
style={{
width: "100%",
maxWidth: "600px",
}}
>
 
<PlantProgress completed={completedMissions} />
 
<h1
style={{
color: "#44513D",
textAlign: "center",
}}
>
Missões da Aventura
</h1>
<button
onClick={() => setPage("album")}
style={{
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "10px 20px",
borderRadius: "10px",
cursor: "pointer",
marginBottom: "20px",
}}
>
📚 Ver Álbum
</button>
<p
style={{
textAlign: "center",
color: "#6B7A52",
}}
>
{completedMissions} / {missionList.length} concluídas
{completedMissions === missionList.length && (
<button
onClick={() => setPage("final")}
style={{
backgroundColor: "#8B6F47",
color: "white",
border: "none",
padding: "12px 24px",
borderRadius: "10px",
cursor: "pointer",
marginBottom: "20px",
}}
>
🌸 Revelação Final
</button>
)}
</p>
 
<div
style={{
backgroundColor: "#D8CBB8",
borderRadius: "20px",
overflow: "hidden",
marginBottom: "30px",
}}
>
<div
style={{
width: `${(completedMissions / missionList.length) * 100}%`,
height: "15px",
backgroundColor: "#6B7A52",
}}
/>
</div>
 
{missionList.map((mission) => (
<div
key={mission.id}
onClick={() => {
setSelectedMission(mission);
setPage("mission");
}}
style={{
backgroundColor: "#D8CBB8",
padding: "15px",
marginBottom: "10px",
borderRadius: "12px",
color: "#44513D",
cursor: "pointer",
transition: "0.2s",
}}
>
<>
{mission.completed ? "✅ " : "❌ "}
{mission.title}
</>
</div>
))}
</div>
)}
{page === "mission" && selectedMission && (
<div
style={{
maxWidth: "700px",
width: "100%",
textAlign: "center",
color: "#44513D",
}}
>
<h1
style={{
color: "#44513D",
fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
}}
>
{selectedMission.title}
</h1>
 
<p>
Estado:
{selectedMission.completed ? " ✅ Concluída" : " ❌ Por concluir"}
</p>
<input
type="file"
accept="image/*"
onChange={(event) => {
 
const file = event.target.files[0];
 
if (!file) return;
 
const reader = new FileReader();
 
reader.onload = () => {
 
const updatedMissions = missionList.map((mission) => {
 
if (mission.id === selectedMission.id) {
return {
...mission,
photo: reader.result,
};
}
 
return mission;
});
 
setMissionList(updatedMissions);
 
setSelectedMission({
...selectedMission,
photo: reader.result,
});
 
};
 
reader.readAsDataURL(file);
 
}}
/>
{selectedMission.photo && (
<img
src={selectedMission.photo}
alt="Missão"
style={{
width: "100%",
maxWidth: "400px",
marginTop: "20px",
borderRadius: "10px",
}}
/>
)}
{!selectedMission.completed && (
<button
onClick={() => {
 
const updatedMissions = missionList.map((mission) => {
 
if (mission.id === selectedMission.id) {
return {
...mission,
completed: true,
};
}
 
return mission;
});
 
setMissionList(updatedMissions);
 
setSelectedMission({
...selectedMission,
completed: true,
});
 
}}
style={{
marginTop: "20px",
backgroundColor: "#A4B494",
color: "white",
border: "none",
padding: "12px 24px",
borderRadius: "10px",
cursor: "pointer",
}}
>
✅ Marcar como concluída
</button>
)}
 
<div
style={{
backgroundColor: "#D8CBB8",
padding: "20px",
borderRadius: "15px",
marginTop: "20px",
}}
>
<h3>🧩 Pista</h3>
 
<p>
{selectedMission.completed
? selectedMission.clue
: "Pista bloqueada 🔒"}
</p>
</div>
 
<button
onClick={() => setPage("missions")}
style={{
marginTop: "30px",
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "12px 24px",
borderRadius: "10px",
cursor: "pointer",
}}
>
Voltar
</button>
</div>
)}

{page === "album" && (
 
<div
style={{
width: "100%",
maxWidth: "900px",
textAlign: "center",
}}
>
 
<h1
style={{
color: "#44513D",
}}
>
📚 Álbum dos dates
</h1>
 
<button
onClick={() => setPage("missions")}
style={{
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "10px 20px",
borderRadius: "10px",
cursor: "pointer",
marginBottom: "30px",
}}
>
Voltar
</button>
 
<div
style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
gap: "20px",
}}
>
 
{missionList
.filter((mission) => mission.photo)
.map((mission) => (
 
<div
key={mission.id}
style={{
backgroundColor: "#D8CBB8",
padding: "15px",
borderRadius: "15px",
}}
>
 
<h3
style={{
color: "#44513D",
}}
>
{mission.title}
</h3>
 
<img
src={mission.photo}
alt={mission.title}
style={{
width: "100%",
borderRadius: "10px",
marginTop: "10px",
}}
/>
</div>

 
))}
 
</div>
 
</div>
 
)}
{page === "final" && (
 
<div
style={{
width: "100%",
maxWidth: "700px",
textAlign: "center",
color: "#44513D",
}}
>
 
<h1
style={{
fontSize: "clamp(2rem, 8vw, 4rem)",
}}
>
🌸
</h1>
 
<h2
style={{
color: "#44513D",
fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
}}
>
Parabéns Piki ❤️
</h2>
 
<p
style={{
lineHeight: "1.8",
fontSize: "clamp(1rem, 4vw, 1.3rem)",
}}
>
Todas as missões foram concluídas.
<br /><br />
 
Ao longo destes meses tiveste a paciência para me aturar,
tivemos dates diferenciados e contruímos memórias
que vão ficar connosco para sempre.
<br /><br />
 
Mas a principal memória está prestes a começar.
</p>
 
<div
style={{
backgroundColor: "#D8CBB8",
padding: "25px",
borderRadius: "15px",
marginTop: "30px",
}}
>
<h3>✈️ Partida</h3>
 
<p>24 de Março de 2027</p>
 
<h3>📍 Destino</h3>
 
<p>????????</p>
</div>
 
<button
onClick={() => setPage("missions")}
style={{
marginTop: "30px",
backgroundColor: "#6B7A52",
color: "white",
border: "none",
padding: "12px 24px",
borderRadius: "10px",
cursor: "pointer",
}}
>
Voltar
</button>
 
</div>
 
)}

</div>
);
}

export default App;