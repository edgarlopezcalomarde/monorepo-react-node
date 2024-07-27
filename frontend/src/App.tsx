import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ImagePage from "./pages/ImagePage";
// import FilePage from "./pages/FilePage";
import RootLayout from "./layout/RootLayout";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<ImagePage />} />
      {/* <Route path="/file" element={<FilePage />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
