function PlantProgress({ completed }) {
let plant = "🌱";
 
if (completed >= 3) {
plant = "🌿";
}
 
if (completed >= 6) {
plant = "🌳";
}
 
if (completed >= 10) {
plant = "🌸";
}
 
return (
<div
style={{
fontSize: "6rem",
marginBottom: "20px",
}}
>
{plant}
</div>
);
}
 
export default PlantProgress;