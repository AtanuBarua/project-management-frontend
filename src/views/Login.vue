<template>
    <section class="section">
      <!-- {{ store.token != null }} -->
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
            <div class="card card-primary">
              <div class="card-header">
                <h4>Login</h4>
              </div>
              <div class="card-body">
                <form @submit.prevent="login" method="POST" action="#" >
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input v-model="form.email" id="email" type="email" class="form-control" name="email" tabindex="1" autofocus>
                    <span class="text-danger" v-if="errors?.email">{{ errors.email[0] }}</span>
                  </div>
                  <div class="form-group">
                    <div class="d-block">
                      <label for="password" class="control-label">Password</label>
                      <div class="float-right">
                        <a href="#" class="text-small">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <input v-model="form.password" id="password" type="password" class="form-control" name="password" tabindex="2">
                    <span class="text-danger" v-if="errors?.password">{{ errors.password[0] }}</span>
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox">
                      <input type="checkbox" name="remember" class="custom-control-input" tabindex="3" id="remember-me">
                      <label class="custom-control-label" for="remember-me">Remember Me</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <button :disabled="disableSubmitBtn" type="submit" class="btn btn-primary btn-lg btn-block" tabindex="4">
                      Login
                    </button>
                  </div>
                </form>
                <div class="text-center mt-4 mb-3">
                  <div class="text-job text-muted">Login With Social</div>
                </div>
                <div class="row sm-gutters">
                  <div class="col-6">
                    <a class="btn btn-block btn-social btn-facebook">
                      <span class="fab fa-facebook"></span> Facebook
                    </a>
                  </div>
                  <div class="col-6">
                    <a class="btn btn-block btn-social btn-twitter">
                      <span class="fab fa-twitter"></span> Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 text-muted text-center">
              Don't have an account? 
              <router-link :to="{name: 'register'}">Create One</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useUserStore } from '@/stores/user';

export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        errors: [],
        disableSubmitBtn: false,
      }
    },
    setup(){
      const store = new useUserStore();
      return { store }
    },
    methods: {
      async login(){
        this.errors = [];
        this.disableSubmitBtn = true;
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/api/login', this.form)
          .then(res=>{
            this.store.setToken(res.data.token)
            this.$toast.success(res.data.message, {
              position: 'top-right'
            })
            this.$router.push('/')
          }).catch(err=>{
            this.disableSubmitBtn = false
            this.errors = err?.response?.data?.errors
          })
      }
    },
    mounted(){
      this.$toast = useToast();
    }
}
</script>