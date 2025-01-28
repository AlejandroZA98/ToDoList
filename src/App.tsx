
import './App.css'
import Form from './components/Form';
import './index.css';

function App() {

  return (
    <>
     <header className="bg-red-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-center items-center">
          <h1 className="text-center  text-lg font-bold text-white uppercase">Lista de Actividades diaria</h1>
          
          
        </div>
      </header>
      <section className="bg-amber-100 py-20 px-20 gap-1.5 mx-auto grid md:grid-cols-3">

      <div className="">
          <h2 className="text-4xl font-black text-center ">Añade Actividades</h2>
          <div className="space-y-3">
          <Form></Form>
          </div>
    
      </div>






      <div className="">
          <h2 className="text-4xl font-black text-center ">Actividades pendientes</h2>
          <div className="space-y-3">
           ee
          </div>
    
      </div>

      <div className="">
          <h2 className="text-4xl font-black text-center ">Actividades terminadas</h2>
          <div className="space-y-3">
           ee
          </div>
    
      </div>
        

      </section>


    </>
  )
}

export default App
