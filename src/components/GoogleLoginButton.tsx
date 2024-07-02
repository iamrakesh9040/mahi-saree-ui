import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import axios from 'axios';

const GoogleLoginButton = () => {
    const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        // Check if the response is a GoogleLoginResponse
        if ('tokenId' in response) {
            try {
                // Extract the tokenId
                const tokenId = response.tokenId;
                // Send the tokenId to the backend
                const res = await axios.post('/api/auth/google', { tokenId });
                console.log(res.data); // Handle response from backend as needed
            } catch (error) {
                console.error('Google login error:', error);
            }
        } else {
            console.error('Google login failed: no tokenId present.');
        }
    };

    return (
        <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID ?? ''}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;
