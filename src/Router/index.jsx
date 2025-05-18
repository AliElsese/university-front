import { BrowserRouter, Route, Routes } from "react-router-dom"
import LayoutWraper from "../Layout/LayoutWraper";
import LoginPage from "../Pages/Auth/LoginPage";
import ProfilePage from "../Pages/ProfilePage";
import StudyYearsPage from "../Pages/StudyYearsPage";
import SubjectsPage from './../Pages/SubjectsPage';
import DoctorsPage from './../Pages/DoctorsPage';
import StudentsPage from './../Pages/StudentsPage';
import Error from "../Pages/Error";
import MSectionsPage from "../Pages/MSectionsPage";
import SingleSubject from "../Pages/SingleSubject";
import MarkesPage from "../Pages/MarkesPage";
import { useStore } from "../Store";
import DoctorSubjects from "../Pages/DoctorSubjects";
import LayoutLoader from "../Layout/LayoutLoader";
import Finance from "../Pages/Finance";
import StudentSubjects from "../Pages/StudentSubjects";
import ChartPage from "../Pages/ChartPage";
import GeneralGPAPage from "../Pages/GeneralGPAPage";

const Router = () => {
  const { user, token } = useStore();

  if (token && !user) {
    return (
      <LayoutLoader />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {
          token && user
          &&
          <Route path="/">
            <Route
              index
              element={
                user.role === "employee"
                  ?
                  <MSectionsPage />
                  :
                  <LayoutWraper>
                    <ProfilePage />
                  </LayoutWraper>
              }
            />
            {
              user.role === "employee"
                ?
                <Route path=":mSection">
                  <Route
                    index
                    element={
                      <LayoutWraper>
                        <ProfilePage />
                      </LayoutWraper>
                    }
                  />
                  <Route
                    path="chart"
                    element={
                      <LayoutWraper>
                        <ChartPage />
                      </LayoutWraper>
                    }
                  />
                  <Route
                    path="study-years"
                  >
                    <Route
                      index
                      element={
                        <LayoutWraper>
                          <StudyYearsPage />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path=":yearId/finance"
                      element={
                        <LayoutWraper>
                          <Finance />
                        </LayoutWraper>
                      }
                    />
                  </Route>
                  <Route path="subjects">
                    <Route
                      index
                      element={
                        <LayoutWraper>
                          <SubjectsPage />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path=":subjectsName"
                    >
                      <Route
                        index
                        element={
                          <LayoutWraper>
                            <SingleSubject />
                          </LayoutWraper>
                        }
                      />
                      <Route
                        path="markes"
                        element={
                          <LayoutWraper>
                            <MarkesPage />
                          </LayoutWraper>
                        }
                      />
                    </Route>
                  </Route>
                  <Route
                    path="doctors"
                    element={
                      <LayoutWraper>
                        <DoctorsPage />
                      </LayoutWraper>
                    }
                  />
                  <Route
                    path="students"
                    element={
                      <LayoutWraper>
                        <StudentsPage />
                      </LayoutWraper>
                    }
                  />
                </Route>
                :
                user.role === "doctor"
                  ?
                  <Route
                    path="/doctor-subjects"
                  >
                    <Route
                      index
                      element={
                        <LayoutWraper>
                          <DoctorSubjects />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path=":subjectsName/markes"
                      element={
                        <LayoutWraper>
                          <MarkesPage />
                        </LayoutWraper>
                      }
                    />
                  </Route>
                  :
                  <Route
                    path="/:yearId"
                  >
                    <Route
                      index
                      element={
                        <LayoutWraper>
                          <StudentSubjects />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path="general-gpa"
                      element={
                        <LayoutWraper>
                          <GeneralGPAPage />
                        </LayoutWraper>
                      }
                    />
                    <Route
                      path=":subjectsName/markes"
                      element={
                        <LayoutWraper>
                          <MarkesPage />
                        </LayoutWraper>
                      }
                    />
                  </Route>
            }
          </Route>
        }
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/error"
          element={
            <LayoutWraper>
              <Error
                message="حدث خطاء اثناء التحميل تفقد الانترنت او حاول تسجيل الدخول مره اخري!"
              />
            </LayoutWraper>
          }
        />
        <Route
          path="*"
          element={
            <LayoutWraper>
              <Error
                message="تعذر الوصول للصفحة التي تبحث عنها، ربما تغير اسمها او لم تكن موجودة من الاساس"
              />
            </LayoutWraper>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router