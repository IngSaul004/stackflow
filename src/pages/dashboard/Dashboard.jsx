import Sidebar from "./components/Sidebar/Sidebar"

function Dashboard() {
  return (
   <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ padding: "20px", flex: 1 }}>
        <h1>Contenido principal</h1>
      </main>
    </div>
  )
}

export default Dashboard
