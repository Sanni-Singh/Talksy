
import './App.css'
import HomePage from '../src/pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SettingPage from './pages/SettingPage'
import {Provider, useDispatch, useSelector} from 'react-redux'
import appStore from './store/appStore'
import NavbarComponent from './components/NavbarComponent'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast'

function App() {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(fetchData());
  //   },[])

  const router = createBrowserRouter([

    {
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/setting",
          element:<SettingPage/>
        },
      ]
    },
    {
      path:"/signup",
      element:<SignUpPage/>
    },
  ])
  

  return (
    <>
    <Provider store={appStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
    <Toaster />
    </>
  )
}

export default App
