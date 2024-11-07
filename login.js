import Amplify, { Auth, Storage } from 'aws-amplify';

// Configuración de Amplify
Amplify.configure({
    Auth: {
        region: 'REGION',
        userPoolId: 'USER_POOL_ID',
        userPoolWebClientId: 'APP_CLIENT_ID',
        oauth: {
            domain: 'YOUR_COGNITO_DOMAIN',
            scope: ['email', 'openid', 'profile'],
            redirectSignIn: 'http://localhost:3000/',
            redirectSignOut: 'http://localhost:3000/',
            responseType: 'code'
        }
    },
    Storage: {
        bucket: 'your-bucket-name',
        region: 'REGION',
        identityPoolId: 'IDENTITY_POOL_ID'
    }
});

// Manejo de autenticación con Google, Amazon y Apple
document.getElementById("google-sign-in").addEventListener("click", async () => {
    try {
        await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
        console.error("Error en la autenticación con Google: ", error);
    }
});

document.getElementById("amazon-sign-in").addEventListener("click", async () => {
    try {
        await Auth.federatedSignIn({ provider: 'LoginWithAmazon' });
    } catch (error) {
        console.error("Error en la autenticación con Amazon: ", error);
    }
});

document.getElementById("apple-sign-in").addEventListener("click", async () => {
    try {
        await Auth.federatedSignIn({ provider: 'SignInWithApple' });
    } catch (error) {
        console.error("Error en la autenticación con Apple: ", error);
    }
});

// Subir archivo a S3
document.getElementById("upload-button").addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        try {
            await Storage.put(file.name, file, {
                contentType: file.type,
            });
            alert("Archivo subido exitosamente");
        } catch (error) {
            console.error("Error al subir el archivo a S3: ", error);
            alert("Error al subir el archivo");
        }
    } else {
        alert("Por favor selecciona un archivo antes de subirlo");
    }
});
