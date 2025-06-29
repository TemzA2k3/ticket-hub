import { SignInForm } from "../features/signIn-form/SignInForm"
import { MainLayout } from "../shared/layouts/MainLayout"


export const SignInPage = () => {
    return (
        <MainLayout>
            <SignInForm />
        </MainLayout>
    )
}