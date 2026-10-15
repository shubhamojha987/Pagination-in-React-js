import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import './App.css'


function App() {

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);

  // const url = 'https://dummyjson.com/products?limit=5&skip=0';
  const url = `https://dummyjson.com/products?limit=5&skip=${skip}`;

  useEffect(()=>{
    async function fetchProductDetails()
    {
      setLoading(true);
        try{
          const response = await fetch(url);
          const data = await response.json();
          setTotal(data.total);
          setProducts(data.products);
        }
        catch(error)
        {
          console.log("Error in fetching Products", error)
        }
        finally{
         setLoading(false);
        }
      
    }
    fetchProductDetails();
  },[skip])


 
  return (
   
    <div
      style={{
      backgroundColor: theme === "light" ? "white" : "black",
      color: theme === "light" ? "black" : "white",
      minHeight: "100vh",
      padding: "20px"
    }}>
     
       <h1>Product Dashboard</h1>

       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
       </button>

        { 
         isLoading ? <p>products data is loading.....</p> :
        <div>
            <div>
              {
                products.map((data)=>(
                  <div key={data.id}>
                    <h2>{data.id}</h2>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <p>Price: ${data.price}</p>
                  </div>
                ))
              }
            </div>

            <div>
              <button onClick={() => setSkip(skip - 5)} disabled={skip === 0}> Previous </button>
              &nbsp; &nbsp;
              <button onClick={() => setSkip(skip + 5)} disabled={skip + 5 >= total}> Next </button>
            </div>  
        </div>
        }

    </div>
   
  )
}

export default App



// below code without useContext directly change theme


// function App() {

//   const [products, setProducts] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [isLoading, setLoading] = useState(true);
//   const [total, setTotal] = useState(0);
//   const [theme, setTheme] = useState("light");

//   // const url = 'https://dummyjson.com/products?limit=5&skip=0';
//   const url = `https://dummyjson.com/products?limit=5&skip=${skip}`;

//   useEffect(()=>{
//     async function fetchProductDetails()
//     {
//       setLoading(true);
//         try{
//           const response = await fetch(url);
//           const data = await response.json();
//           setTotal(data.total);
//           setProducts(data.products);
//         }
//         catch(error)
//         {
//           console.log("Error in fetching Products", error)
//         }
//         finally{
//          setLoading(false);
//         }
      
//     }
//     fetchProductDetails();
//   },[skip])


 
//   return (
//     <div style={{
//       backgroundColor: theme === "light" ? "white" : "black",
//       color: theme === "light" ? "black" : "white",
//       minHeight: "100vh",
//       padding: "20px"}}>
     
//       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Toggle Theme
//       </button>
//        <h1>Product Dashboard</h1>

//         { 
//          isLoading ? <p>products data is loading.....</p> :
//         <div>
//             <div>
//               {
//                 products.map((data)=>(
//                   <div key={data.id}>
//                     <h2>{data.id}</h2>
//                     <h3>{data.title}</h3>
//                     <p>{data.description}</p>
//                     <p>Price: ${data.price}</p>
//                   </div>
//                 ))
//               }
//             </div>

//             <div>
//               <button onClick={() => setSkip(skip - 5)} disabled={skip === 0}> Previous </button>
//               &nbsp; &nbsp;
//               <button onClick={() => setSkip(skip + 5)} disabled={skip + 5 >= total}> Next </button>
//             </div>  
//         </div>
//         }
//       {/* </div>   */}
//     </div>
//   )
// }

// export default App


