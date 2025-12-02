import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccountPage() {
    return (
        <div className="form-page">
            <div className="form-card">
                <h1>Create An Account</h1>
                <CreateAccountForm />
            </div>
        </div>
    );
}

export default CreateAccountPage;