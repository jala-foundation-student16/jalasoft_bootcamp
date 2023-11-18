import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { Header } from "./components/Header/Header";
import { About } from "./routes/About";
// Usuários
import { ListUsers } from "./routes/View/ListUsers";
import { CreateUser } from "./routes/Create/CreateUser";
import { DetailUser } from "./routes/Details/DetailUser";
import { UpdateUser } from "./routes/Update/UpdateUser";
// Pesquisa
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { CreateAccount } from "./routes/Create/CreateAccount";
import { ListCustomers } from "./routes/View/ListCustomers";
import { CreateCustomer } from "./routes/Create/CreateCustomer";
import { Container } from "./components/Container/Container";
import { DetailCustomer } from "./routes/Details/DetailCustomer";
import { UpdateCustomer } from "./routes/Update/UpdateCustomer";
import { ListOrderFiltered } from "./routes/View/ListOrderFiltered";
import { CreateOrder } from "./routes/Create/CreateOrder";
import { DetailOrder } from "./routes/Details/DetailOrder";
import { ListAgencies } from "./routes/View/ListAgencies";
import { ListTasks } from "./routes/View/ListTasks";
import { ListRemarks } from "./routes/View/ListRemarks";
import { ListCustomerPlans } from "./routes/View/ListCustomerPlans";
import { ListSchedules } from "./routes/View/ListSchedules";
import { CreateCustomerPlan } from "./routes/Create/CreateCustomerPlan";
import { CreateTask } from "./routes/Create/CreateTask";
import { CreateRemark } from "./routes/Create/CreateRemark";
import { CreateSchedule } from "./routes/Create/CreateSchedule";
import { DetailAgency } from "./routes/Details/DetailAgency";
import { DetailCustomerPlan } from "./routes/Details/DetailCustomerPlan";
import { DetailRemark } from "./routes/Details/DetailRemark";
import { DetailTask } from "./routes/Details/DetailTask";
import { DetailSchedule } from "./routes/Details/DetailSchedule";
import { UpdateTask } from "./routes/Update/UpdateTask";
import { UpdateRemark } from "./routes/Update/UpdateRemark";
import { UpdateSchedule } from "./routes/Update/UpdateSchedule";
import { UpdateCustomerPlan } from "./routes/Update/UpdateCustomerPlan";

function App() {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <ToastContainer />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="" element={<Header />}>
              <Route path="" element={<Login />} />
              <Route path="/register" element={<CreateAccount />} />
              <Route
                path="/home"
                element={
                  <Container>
                    <Home />
                  </Container>
                }
              />
              {/* Customer */}
              <Route
                path="/customer"
                element={
                  <Container>
                    <ListCustomers />
                  </Container>
                }
              />
              <Route
                path="/customer/detail/:id"
                element={
                  <Container>
                    <DetailCustomer />
                  </Container>
                }
              />
              <Route
                path="/customer/update/:id"
                element={
                  <Container>
                    <UpdateCustomer />
                  </Container>
                }
              />
              <Route
                path="/customer/new"
                element={
                  <Container>
                    <CreateCustomer />
                  </Container>
                }
              />

              {/* Orders */}

              <Route
                path="/order"
                element={
                  <Container>
                    <ListOrderFiltered />
                  </Container>
                }
              />

              <Route
                path="/order/new"
                element={
                  <Container>
                    <CreateOrder />
                  </Container>
                }
              />

              <Route
                path="/order/:id"
                element={
                  <Container>
                    <DetailOrder />
                  </Container>
                }
              />
              {/* Agency */}

              <Route
                path="/agency"
                element={
                  <ProtectedRoute>
                    <Container>
                      <ListAgencies />
                    </Container>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agency/detail/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <DetailAgency />
                    </Container>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuario/update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/usuario/new"
                element={
                  <ProtectedRoute>
                    <CreateUser />
                  </ProtectedRoute>
                }
              />

              {/* Tasks */}

              <Route
                path="/task"
                element={
                  <ProtectedRoute>
                    <Container>
                      <ListTasks />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/task/new"
                element={
                  <ProtectedRoute>
                    <Container>
                      <CreateTask />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/task/detail/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <DetailTask />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/task/update/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <UpdateTask />
                    </Container>
                  </ProtectedRoute>
                }
              />

              {/* Remarks */}

              <Route
                path="/remark"
                element={
                  <ProtectedRoute>
                    <Container>
                      <ListRemarks />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/remark/new"
                element={
                  <ProtectedRoute>
                    <Container>
                      <CreateRemark />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/remark/detail/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <DetailRemark />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/remark/update/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <UpdateRemark />
                    </Container>
                  </ProtectedRoute>
                }
              />

              {/* Customer Plan */}

              <Route
                path="/customer_plan"
                element={
                  <ProtectedRoute>
                    <Container>
                      <ListCustomerPlans />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/customer_plan/new"
                element={
                  <ProtectedRoute>
                    <Container>
                      <CreateCustomerPlan />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/customer_plan/detail/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <DetailCustomerPlan />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/customer_plan/update/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <UpdateCustomerPlan />
                    </Container>
                  </ProtectedRoute>
                }
              />

              {/* Schedule */}

              <Route
                path="/schedule"
                element={
                  <ProtectedRoute>
                    <Container>
                      <ListSchedules />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/schedule/new"
                element={
                  <ProtectedRoute>
                    <Container>
                      <CreateSchedule />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/schedule/detail/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <DetailSchedule />
                    </Container>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/schedule/update/:id"
                element={
                  <ProtectedRoute>
                    <Container>
                      <UpdateSchedule />
                    </Container>
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthenticationProvider>
  );
}

export default App;
