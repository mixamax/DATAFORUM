import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { PageLayout } from "./components/PageLayout";

function App() {
    return (
        <PageLayout>
            <Header />
            <Main />
        </PageLayout>
    );
}

export default App;
