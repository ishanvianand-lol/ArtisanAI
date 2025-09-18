import { AuthProvider } from '../web/utils/auth';
import '../app/globals.css';
import { styles } from '../web/styles/styles';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <style jsx global>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            background-color: #fdfaf7;
            color: #333;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;