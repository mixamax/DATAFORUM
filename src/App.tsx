import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { PageLayout } from "./components/PageLayout";
import { useRoomStore } from "./store";

function App() {
    useRoomStore.getState().getInitData();

    return (
        <PageLayout>
            <Header />
            <Main />
        </PageLayout>
    );
}

export default App;
