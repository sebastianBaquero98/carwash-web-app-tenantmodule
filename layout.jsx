import '@styles/globals.css'
import '@styles/styles.sass'

import Provider from "@components/Provider";

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        <Provider>
          <div className='main'>

          </div>
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout