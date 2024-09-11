// import '@progress/kendo-theme-default/dist/all.css';
import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from "./routes/route";

function App() {


  // TODO: Adding Jestjs in this system
  // TODO: Adding some library in your case error of datagrid layout
  // TODO: Trying to setup the enviroment in the jestjs
  //? We have to using babel for that?
  //? Do we need to using ts in this case?
  //? With CRA project do we need to install the jestjs CLI in this case?
  // TODO: Trying to adding 2-3 jest test in this project 
  return (
    <div className="w-full h-auto flex justify-center bg-gradient-to-r from-[#6a85b6] to-[#bac8e0]">
      <section className="w-full h-auto ">
        <BrowserRouter>
          <Routes>
            {
              routes.map((val, index) => {
                const Layout = val.layout
                const Page = val.component
                return (
                  < Route key={index}
                    path={val.path}
                    element={<Layout >
                      <Page />
                    </Layout>}
                  />
                )
              })
            }
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
