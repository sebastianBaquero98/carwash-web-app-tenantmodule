import '@styles/globals.css'
import '@styles/styles.sass'

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <div className='main'>

        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout