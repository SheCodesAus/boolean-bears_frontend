// --- Function Definition and URL Construction ---
async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;

    // --- Making the Authentication Request ---
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        "username": username,
        "password": password,
        }),
    });

     // --- Error Handling and Token Retrieval ---
     // A: Failure Path
    if(!response.ok) {
        const fallbackError =  `Error trying to login`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
    // B: Success Path
    return await response.json();
}

export default postLogin;