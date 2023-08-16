// These styles apply to every route in the application
import '../src/index.css'
 
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}