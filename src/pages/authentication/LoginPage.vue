<template>
  <q-page>
    <q-img
      class="fixed background-img"
      fit="contain"
      src="~/assets/radin.png"
      alt="Plataform Mascot"
    />
    <RouterLink to="/" class="home-link">
      <q-icon name="fas fa-arrow-left" />
      Back to home
    </RouterLink>
    <q-form @submit="onSubmit" class="form-container">
      <q-img width="100px" fit="contain" src="~/assets/radinTipo.png" alt="Plataform Name Logo" />
      <h1>{{ $t('authentication.login.HEADER_DESCRIPTION') }}</h1>
      <div class="inputs-container">
        <q-input
          v-for="field in fields"
          v-model="formData[field.key]"
          outlined
          :key="field.label"
          :label="field.label"
          :type="field.type"
          :placeholder="field.placeholder"
          :autocomplete="field.autocomplete"
          lazy-rules
          :rules="field.rules"
          bg-color="black"
          label-color="white"
          input-class="custom-input"
        />
      </div>

      <q-checkbox v-model="remember" :label="$t('authentication.login.REMEMBER_ME')" />

      <q-btn
        class="full-width"
        :label="$t('authentication.login.SUBMIT_BUTTON')"
        type="submit"
        color="grey-8"
        no-caps
        push
      />
      <span>
        {{ $t('authentication.login.DOESNT_HAVE_ACCOUNT_1') }}
        <RouterLink to="/register">
          {{ $t('authentication.login.DOESNT_HAVE_ACCOUNT_2') }}
        </RouterLink>
      </span>
    </q-form>
  </q-page>
</template>

<style scoped lang="css">
.q-page {
  margin: 0 auto;
  padding: 2rem 1rem;
}

.home-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 1rem;
}

a {
  color: rgb(52 211 153);
  text-decoration: none;
}

a:hover {
  color: rgb(110 231 183);
}

a i {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.form-container {
  text-align: center;
  max-width: 35rem;
  background-color: rgb(0 0 0 / 0.4);
  color: white;
  padding: 2rem;
  margin: 0 auto;
  border: 1px solid rgb(6 78 59 / 0.5);
  border-radius: 0.5rem;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.form-container h1 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.form-container .q-checkbox {
  width: 100%;
  margin-bottom: 1rem;
}

:deep(.q-field__control) {
  background-color: rgb(0 0 0 / 0.6) !important;
  border: 1px solid rgb(6 78 59 / 0.5);
  border-radius: 0.5rem;
}

div[aria-checked='true'] :deep(.q-checkbox__svg) {
  background-color: hsl(142.1 70.6% 45.3%);
  color: hsl(144.9 80.4% 10%);
}

:deep(.q-checkbox__bg) {
  border-color: hsl(142.1 70.6% 45.3%);
}

:deep(.custom-input) {
  color: white;
}

.q-btn {
  margin-bottom: 1rem;
}

.background-img {
  z-index: -30;
  height: 100vh;
  opacity: 0.01;
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserStore } from 'src/stores/userStore';
const user = useUserStore();

const { t } = useI18n();

interface FormField {
  key: keyof FormData;
  label: string;
  type: 'email' | 'password';
  placeholder: string;
  autocomplete: string;
  rules: ((val: string | number) => true | string)[];
}

interface FormData {
  email: string;
  password: string;
}

const fields: FormField[] = [
  {
    key: 'email',
    label: t('authentication.fields.mail.LABEL'),
    type: 'email',
    placeholder: 'name@example.com',
    autocomplete: 'email',
    rules: [
      (val) => /\S+@\S+\.\S+/.test(val.toString()) || t('authentication.fields.mail.INVALID'),
    ],
  },
  {
    key: 'password',
    label: t('authentication.fields.password.LABEL'),
    type: 'password',
    placeholder: '••••••',
    autocomplete: 'current-password',
    rules: [
      (val) => (val.toString().length >= 6 ? true : t('authentication.fields.password.INVALID')),
    ],
  },
];

const formData = reactive<FormData>({
  email: '',
  password: '',
});

const remember = ref(false);

const onSubmit = async () => await user.login(formData.email, formData.password);
</script>
