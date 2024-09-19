import '@progress/kendo-theme-default/dist/all.css';
// import "./App.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from "./routes/route";
import mainBackground from './images/sndbackground.jpg'
import ModalForm from './components/modalForm/page';

function App() {
  // Todo: restyle the popup
  // Todo: restyle the header
  // Todo: remmeber to change the text color 
  // todo: Data grid must be scale when user typing to much
  // todo: making slide for presend this project
  // todo: create the storybook for everyone
  // todo: fix the gap of the button on header in userManagerment grid
  // todo: fix context of the column
  // todo: fix context of the header

  return (
    <>
      <div data-testid="container" className="w-full h-auto flex justify-center bg-center bg-cover bg-no-repeat" style={{
        backgroundImage: `url(${mainBackground})`
      }}>
        <section className="w-full h-auto overflow-x-hidden">
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
