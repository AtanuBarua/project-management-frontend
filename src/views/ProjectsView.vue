<template>
  <div class="main-wrapper main-wrapper-1">
    <div class="navbar-bg"></div>

    <NavBar />

    <SideBar />

    <!-- Main Content -->
    <div class="main-content">
      <section class="section">
        <div class="row">
          <div class="col-12 col-md-12 col-lg-12">
            <div class="card">
              <div class="card-header">
                <h4>Projects</h4>
                <div class="card-header-form">
                  <form>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search"
                      />
                      <div class="input-group-btn">
                        <button class="btn btn-primary">
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <tr>
                      <th class="text-center">
                        <div
                          class="custom-checkbox custom-checkbox-table custom-control"
                        >
                          <input
                            type="checkbox"
                            data-checkboxes="mygroup"
                            data-checkbox-role="dad"
                            class="custom-control-input"
                            id="checkbox-all"
                          />
                          <label for="checkbox-all" class="custom-control-label"
                            >&nbsp;</label
                          >
                        </div>
                      </th>
                      <th>Title</th>
                      <th>Code</th>
                      <th>Type</th>
                      <th>Total Rate</th>
                      <th>Lead By</th>
                      <th>Start Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                    <tr v-for="project in projects" :key="project.id">
                      <td class="p-0 text-center">
                        <div class="custom-checkbox custom-control">
                          <input
                            type="checkbox"
                            data-checkboxes="mygroup"
                            class="custom-control-input"
                            id="checkbox-1"
                          />
                          <label for="checkbox-1" class="custom-control-label"
                            >&nbsp;</label
                          >
                        </div>
                      </td>
                      <td>{{ project.title }}</td>
                      <td>{{ project.code }}</td>
                      <td>
                        <div :class="getTypeClass(project.type)">
                          {{ project.type }}
                        </div>
                      </td>
                      <td>{{ project.total_rate ?? "-" }}</td>
                      <td>{{ project.lead_by }}</td>
                      <td>{{ project.start_date ?? "-" }}</td>
                      <td>{{ project.end_date ?? "-" }}</td>
                      <td>
                        <div :class="getStatusClass(project.status)">
                          {{ project.status }}
                        </div>
                      </td>
                      <td><a href="#" class="btn btn-primary">Detail</a></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SidebarSetting />
    </div>

    <Footer />
  </div>
</template>

<script>
  import SideBar from "../components/SideBar.vue";
  import NavBar from "../components/NavBar.vue";
  import Footer from "../components/Footer.vue";
  import SidebarSetting from "../components/SidebarSetting.vue";
  import axios from "axios";
  import { useUserStore } from "@/stores/user";

  export default {
    setup() {
      const store = new useUserStore();
      return { store };
    },
    components: {
      SideBar,
      NavBar,
      Footer,
      SidebarSetting,
    },
    data() {
      return {
        projects: [],
      };
    },
    mounted() {
      feather.replace();
      this.getProjects();
    },
    methods: {
      async getProjects() {
        await axios
          .get("/api/project")
          .then((res) => {
            this.projects = res.data.data;
          })
          .catch((err) => {
            if (err.response.status == 401) {
              this.store.removeToken();
              this.$router.push("login");
            }
          });
      },
      getStatusClass(status) {
        switch (status) {
          case "Not Started":
            return "badge badge-warning";
          case "In Progress":
            return "badge badge-primary";
          case "On Hold":
            return "badge badge-secondary";
          case "Cancelled":
            return "badge badge-danger";
          case "Finished":
            return "badge badge-success";
          default:
            return "";
        }
      },
      getTypeClass(type) {
        if (type == 'Client Project') {
            return 'badge badge-success'
        } 
        return 'badge badge-primary'
      }
    },
  };
</script>
