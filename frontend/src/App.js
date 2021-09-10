import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";
import ProjectDetails from "./pages/ProjectDetails";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/project/:id">
            <ProjectDetails />
          </Route>
          <Route path="/">
            <ProjectsList />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
