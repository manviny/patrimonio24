// AWS Amplify está disponible globalmente desde el CDN como `Amplify`
const { Auth, Storage } = Amplify;

// Configuración de Amplify
Amplify.configure({
    Auth: {
        region: 'REGION', // Región de AWS (ej. 'us-east-1')
        userPoolId: 'USER_POOL_ID', // ID del User Pool de Cognito
        userPoolWebClientId: 'APP_CLIENT_ID', // ID de Cliente de Cognito
        oauth: {
            domain: 'YOUR_COGNITO_DOMAIN', // Dominio configurado en Cognito
            scope: ['email', 'openid', 'profile'], // Alcances requeridos
            redirectSignIn: 'http://yourdomain.com/', // URL de redirección al iniciar sesión
            redirectSignOut: 'http://yourdomain.com/', // URL de redirección al cerrar sesión
            responseType: 'code' // Tipo de respuesta OAuth2 (usualmente 'code')
        }
    },
    Storage: {
        bucket: 'your-bucket-name', // Nombre del bucket S3
        region: 'REGION', // Región del bucket S3
        identityPoolId: 'IDENTITY_POOL_ID' // ID del Identity Pool de Cognito
    }
});

// Autenticación con Google
document.getElementById("google-sign-in").addEventListener("click", async () => {
    try {
        await Auth.federatedSignIn({ provider: 'Google' });
    } catch (error) {
        console.error("Error en la autenticación con Google: ", error);
    }
});

// Autenticación con Amazon
document.getElementById("amazon-sign-in").addEventListener("click", async () => {
    try {
        await Auth.federatedSignIn({ provider: 'LoginWithAmazon' });
    } catch (error) {
        console.error("Error en la autenticación con Amazon: ", error);
    }
});

// Autenticación con Apple
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
            // Subimos el archivo al bucket S3 configurado
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

// Mostrar la sección de subida una vez autenticado
Auth.currentAuthenticatedUser()
    .then(user => {
        document.getElementById("upload-section").style.display = "block";
        console.log("Usuario autenticado: ", user.username);
    })
    .catch(() => {
        console.log("No hay usuario autenticado actualmente");
    });
