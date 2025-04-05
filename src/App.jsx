import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            
        </Route>
    ))
    return <RouterProvider router={router} />
}