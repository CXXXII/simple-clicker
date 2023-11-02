<template>
  <main class="main">
    <h1>Simple Counter</h1>
    <div class="value">Count: {{ result }}</div>
    <div class="time">Time: {{ time }}</div>
    <time-delta :displayDelta="timedelta"></time-delta>
    <div class="buttons">
      <button @click="reset">Reset</button>
      <button @click="plus">Plus</button>
      <button @click="minus">Minus</button>
    </div>
  </main>
</template>

<script>
import { db } from "@/includes/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import TimeDelta from "./TimeDelta.vue";

export default {
  components: { TimeDelta },
  data() {
    return {
      result: 0,
      time: "00:00",
      isLoaded: false,
      initTime: "",
      timedelta: "00:00",
      timeInterval: "",
    };
  },
  watch: {
    initTime(newVal) {
      this.timedelta = "00:00";
      this.timeInterval = setInterval(() => {
        const now = Date.now();
        const totalSeconds = Math.floor((now - newVal) / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);
        function padTo2Digits(num) {
          return num.toString().padStart(2, "0");
        }
        this.timedelta = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
      }, 1000);
    },
    result(newValue) {
      this.setResult(newValue);
    },

    time(newValue) {
      this.setTime(newValue);
    },
  },
  methods: {
    plus() {
      this.result += 1;
      const newDate = new Date();
      const minutes =
        newDate.getMinutes() < 10
          ? "0" + newDate.getMinutes()
          : newDate.getMinutes();
      this.time = `${newDate.getHours()}:${minutes}`;
      clearInterval(this.timeInterval);
      this.initTime = Date.now();
    },
    async getData() {
      const docRef = doc(db, "data", "1");
      const docSnap = await getDoc(docRef);
      const newData = docSnap.data();
      this.result = newData.result;
      this.time = newData.time;
    },
    async setResult(newValue) {
      const docRef = doc(db, "data", "1");
      await updateDoc(docRef, {
        result: newValue,
      });
    },
    async setTime(newValue) {
      const docRef = doc(db, "data", "1");
      await updateDoc(docRef, {
        time: newValue,
      });
    },
    reset() {
      this.result = 0;
      this.time = "00:00";
      this.timedelta = "00:00";
      clearInterval(this.timeInterval);
    },
    minus() {
      this.result -= 1;
    },
  },
  beforeMount() {
    this.getData();
  },

  beforeUnmount() {
    clearInterval(this.timeInterval);
  },
};
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  font-size: larger;
}
.buttons {
  display: flex;
  gap: 20px;
}

button {
  width: 100px;
  height: 50px;
}
</style>
