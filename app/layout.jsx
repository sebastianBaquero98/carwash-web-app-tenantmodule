import "@styles/globals.css";
import "@styles/styles.sass";

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div
          style={{
            backgroundColor: "#14141C",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
