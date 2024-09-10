// import '@progress/kendo-theme-default/dist/all.css';
import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from "./routes/route";

function App() {



  return (
    <div className="w-full h-auto flex justify-center bg-gradient-to-r from-[#6a85b6] to-[#bac8e0]">
      <section className="w-[80rem] h-auto ">
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
