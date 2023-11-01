<template>
  <main class="main">
    <h1>Simple Clicker</h1>
    <div class="value">Result: {{ result }}</div>
    <div class="time">DateTime: {{ time }}</div>
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

export default {
  data() {
    return {
      result: 0,
      time: "Empty",
    };
  },
  watch: {
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
      this.time = "Empty";
    },
    minus() {
      this.result -= 1;
    },
  },
  beforeMount() {
    this.getData();
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
