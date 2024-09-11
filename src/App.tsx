// import '@progress/kendo-theme-default/dist/all.css';
import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from "./routes/route";

function App() {


  //TODO: In header component, using useMatch to find out the current route, and showing kind of different actions in header
  // TODO: Adding header to protected layout.
  // TODO: Adding the tabe of grid layout using mobx mix kendo ui
  // TODO: Adding Jestjs in this system
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
