<template>
  <section class="section">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
          <div class="card card-primary">
            <div class="card-header">
              <h4>Register</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="register" method="POST">
                <div class="row">
                  <div class="form-group col-12">
                    <label for="frist_name">Full Name</label>
                    <input v-model="form.name" id="frist_name" type="text" class="form-control" name="frist_name" autofocus />
                    <span class="text-danger" v-if="errors?.name">{{ errors.name[0] }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-6">
                    <label for="email">Email</label>
                    <input v-model="form.email" id="email" type="email" class="form-control" name="email" />
                    <span class="text-danger" v-if="errors?.email">{{ errors.email[0] }}</span>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group col-6">
                    <label for="phone">Phone</label>
                    <input v-model="form.phone" id="phone" type="phone" class="form-control" name="phone" />
                    <span class="text-danger" v-if="errors?.phone">{{ errors.phone[0] }}</span>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-6">
                    <label for="password" class="d-block">Password</label>
                    <input v-model="form.password" id="password" type="password" class="form-control pwstrength"
                      name="password" />
                    <span class="text-danger" v-if="errors?.password">{{ errors.password[0] }}</span>
                  </div>
                  <div class="form-group col-6">
                    <label for="password2" class="d-block">Password Confirmation</label>
                    <input v-model="data.password_confirmation" id="password2" type="password" class="form-control" name="password-confirm" />
                    <span class="text-danger" v-if="errors?.password_confirmation">{{ errors.password_confirmation[0] }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="agree" class="custom-control-input" id="agree" />
                    <label class="custom-control-label" for="agree">I agree with the terms and conditions</label>
                  </div>
                </div>
                <div class="form-group">
                  <button :disabled="disableSubmitBtn" type="submit" class="btn btn-primary btn-lg btn-block">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-5 text-muted text-center">
            Already have an account?
            <router-link :to="{ name: 'login' }">Login Here</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
      },
      errors: [],
      disableSubmitBtn: false
    };
  },
  methods: {
    async register() {
      this.errors = [];
      this.disableSubmitBtn = true;
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/register', this.form)
        .then(res=>{
          this.$router.push('/')
        }). catch(err=>{
          this.disableSubmitBtn = false;
          this.errors = err?.response?.data?.errors
        })
    },
  },
};
</script>