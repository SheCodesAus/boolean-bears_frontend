import postCreateImageURL from "./post-createimageurl";

export async function handleFileUpload(file, courseId, token) {
    try {
        const presign = await postCreateImageURL(
            { file_name: file.name, file_type: file.type, file_size: file.size },
            token
        );

        const form = new FormData();
        Object.entries(presign.fields).forEach(([key, value]) => form.append(key, value));
        form.append("file", file);

        const s3Response = await fetch(presign.upload_url, { method: "POST", body: form });
        if (s3Response.status !== 204) {
            throw new Error("S3 upload failed");
        }

        const registerResponse = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}/files/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                file_name: file.name,
                file_size: file.size,
                file_type: file.type,
                file_key: presign.file_key,
                public_url: presign.public_url,
            }),
        });

        if (!registerResponse.ok) {
            throw new Error("Failed to register file with backend");
        }

        return await registerResponse.json(); // Return the registered file metadata
    } catch (error) {
        console.error("File upload failed:", error);
        throw error;
    }
}