<template>
  <q-page>
    <div class="main-container q-mx-sm">
      <header class="q-mt-sm">
        <q-img width="50px" fit="contain" src="~/assets/radinTipo.png" alt="Plataform Name Logo" />
        <div class="right">
          <q-btn label="Login" flat />
          <q-btn label="Sign Up" color="green" />
        </div>
      </header>

      <div class="main-content">
        <div class="left">
          <h2>Connect with friends in a <span>beautiful</span> way</h2>
          <p>
            Experience a new way to connect with friends, join groups, and share moments in a sleek,
            modern interface designed for today's social experience.
          </p>
          <div class="buttons">
            <q-btn icon-right="arrow_right_alt" label="Get Started" color="green" />
            <q-btn label="Learn More" color="white" outline />
          </div>
        </div>
        <div class="right">
          <q-img fit="contain" src="~/assets/radin.png" alt="Plataform Mascot" />
        </div>
      </div>

      <section class="badges">
        <div class="badge">
          <q-icon name="forum" size="1.2rem" />
          <h3>Real-time Messaging</h3>
          <p>Connect with friends instantly with our lightning-fast messaging system.</p>
        </div>
        <div class="badge">
          <q-icon name="groups" size="1.2rem" />
          <h3>Find Groups</h3>
          <p>Create and join groups with like-minded people to share common interests.</p>
        </div>
        <div class="badge">
          <q-icon name="fas fa-paint-brush" size="1.2rem" />
          <h3>Customizable Themes</h3>
          <p>Personalize your experience with custom themes and profile settings.</p>
        </div>
      </section>
    </div>

    <footer>
      <div class="left">
        <q-img width="30px" fit="contain" src="~/assets/radinTipo.png" alt="Plataform Name Logo" />
        <span>© 2025 RADIN. All rights reserved.</span>
      </div>
      <div class="right">
        <q-btn flat label="Terms" no-caps />
        <q-btn flat label="Privacy" no-caps />
        <q-btn flat label="Contact" no-caps />
      </div>
    </footer>
  </q-page>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

header img {
  width: 100px;
  height: auto;
}

header .right {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 6rem;
  gap: 2em;
}

.main-content .left h2 {
  text-align: center;
  font-size: 3rem;
  line-height: 1;
  font-weight: 700;
}

.main-content .left h2 span {
  color: rgb(52 211 153);
}

.main-content .left p {
  color: rgb(209 213 219);
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.main-content .left .buttons {
  display: flex;
  justify-content: center;
  gap: 2em;
}

.main-content .right {
  width: 90%;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 0 #0000,
    0 0 #0000,
    0 25px 50px -12px rgb(0 0 0 / 0.25);
  border: solid 1px rgb(6 95 70 / 0.5);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.badges {
  display: grid;
  gap: 2rem;
  padding: 4rem 0;
  grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
  justify-content: center;
}

.badges .badge {
  padding: 1.5rem;
  background-color: rgb(0 0 0 / 0.4);
  border: solid 1px rgb(6 78 59 / 0.5);
  border-radius: 0.5rem;
}

.badges .badge i {
  background-color: rgb(6 78 59);
  border-radius: 9999px;
  color: rgb(52 211 153);
  padding: 0.8rem;
}

.badges .badge h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: white;
}

.badges .badge p {
  color: rgb(209 213 219);
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  justify-content: space-between;
  padding: 2rem 2rem;
  border-top: 1px solid rgb(6 78 59 / 0.5);
  margin-top: 3rem;

  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(156 163 175);
}

footer .left {
  display: flex;
  align-items: center;
  gap: 1em;
}

@media only screen and (min-width: 320px) {
  .main-container {
    margin: 0 2em;
  }
}

@media only screen and (min-width: 600px) {
  footer {
    flex-direction: row;
  }
}

@media only screen and (min-width: 780px) {
  .main-content {
    flex-direction: row;
  }

  .main-content .left .buttons {
    justify-content: start;
  }
}
</style>
