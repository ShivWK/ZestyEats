import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';

export default function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
        </Route>
    ))
    return <RouterProvider router={router} />
}