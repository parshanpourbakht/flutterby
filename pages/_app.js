import '@/styles/globals.css'
import { Children } from 'react'
import Layout from '../components/layout'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }) {
  return(
    <Layout>
      <ToastContainer limit={1}></ToastContainer>
      <Component {...pageProps} />
    </Layout>


  )
}
