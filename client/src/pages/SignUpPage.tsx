import { SignUpForm } from "../features/signUp-form/SignUpForm"
import { MainLayout } from "../shared/layouts/MainLayout"


export const SignUpPage = () => {
    return (
        <MainLayout>
            <SignUpForm />
        </MainLayout>
    )
}