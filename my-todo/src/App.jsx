import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './component/Navbar';
function App() {
  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])


useEffect (()=> {
 let todoString = localStorage.getItem("todos")
 if(todoString){
   let todos = JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
 }
},[])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
      let t = todos.filter(i=>i.id===id)
      setTodo(t[0].todo)

      let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      saveToLS()
    }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
//  const handleCheckbox = (e) => {
//    let id = e.target.name;
//    let index = todos.findIndex(item=>{
//     return item.id === id;
//    })
//    let newTodos = [...todos];
//    newTodos[index].isCompleted = !newTodos[index].isCompleted;
//    setTodos[newTodos]
//    console.log(newTodos, todos)
//    saveToLS()
//  }
 
  return (
    <div  className='bg-slate-500 h-screen'>
      <Navbar/>
      {/* <h1><br /></h1> */}
      <div className='container mx-auto  rounded-xl bg-violet-300 my-5 p-5 min-h-[87vh] '>
        <h1 className='flex justify-center w-full font-bold text-xl mb-6 '>ENTER  YOUR  TODO'S ITEMS</h1>
        <div className="addTodo flex justify-center">
          <input onChange={handleChange} value={todo} type="text" placeholder='Write Your Work' className='w-2/3 rounded-md px-5  text-violet-900 outline-none border border-gray-400  focus:border-blue-800' />
          <button  onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 text-white p-4 py-1 rounded-md text-sm hover:bg-violet-900 hover:font-bold mx-3'>Add</button>
        </div>

        <div className=" flex justify-center text-xl font-bold m-7 ">Your Todo's List</div>
     
        <div className="todos lg:mx-5 ">
          {todos.length===0 && <div className='m-5'>No Todos display</div>}
          {todos.map(item => {


        return  <div  key={item.id} className="todo w-full my-2   flex justify-between">
          <div className='flex gap-5'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  id="" />
              
              <div className={item.isCompleted?"line-through  bg-green-400 px-10 py-[1.5px] border border-r-2 rounded-md":""}>{item.todo}</div>
          </div>


              <div className="button">
                <button onClick={(e)=>{handleEdit(e , item.id)}} 
                className='bg-violet-800 text-white p-3 py-1 rounded-md text-sm hover:bg-violet-900 hover:font-bold mx-1'>Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}}
                 className='bg-violet-800 text-white p-3 py-1 rounded-md text-sm hover:bg-violet-900 hover:font-bold mx-1'>Delete</button>
              </div>

            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default App
