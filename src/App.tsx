import '@progress/kendo-theme-default/dist/all.css';
// import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from "./routes/route";
import mainBackground from './images/sndbackground.jpg'
import ModalForm from './components/modalForm/page';

function App() {
  //todo: viet test lai cho no
  //todo: viet lai story book
  //todo: responsive

  return (
    <>
      <div data-testid="container" className="w-full h-auto flex justify-center bg-center bg-cover bg-no-repeat" style={{
        backgroundImage: `url(${mainBackground})`
      }}>
        <section className="w-full h-auto overflow-x-hidden font-interFont">
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
      <ModalForm />
    </>
  );
}

export default App;
