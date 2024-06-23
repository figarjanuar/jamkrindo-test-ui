<template>
  <div class="home">
    <h1>Data Klaim</h1>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">LOB</th>
          <th scope="col">Penyebab Klaim</th>
          <th scope="col">Jumlah Nasabah</th>
          <th scope="col">Beban Klaim</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="isLoading">
          <td v-if="error" colspan="4">{{error}}</td>
          <td v-else colspan="4">Loading...</td>
        </tr>

        <template v-else v-for="(lob, index) in Object.keys(groupKlaim)" :key="index">
          <tr v-for="(dataKlaim, i) in groupKlaim[lob]" :key="i">
            <td>{{ dataKlaim.lob }}</td>
            <td>{{ dataKlaim.penyebab_klaim }}</td>
            <td>{{ dataKlaim.jumlah_nasabah }}</td>
            <td>{{ dataKlaim.nilai_beban_klaim }}</td>
          </tr>

          <tr>
            <td colspan="2">Subtotal {{ lob }}</td>
            <td>{{ calculateTotalNasabah(lob) }}</td>
            <td>{{ calculateTotalBeban(lob) }}</td>
          </tr>
        </template>
      </tbody>
    </table>

    <button class="btn btn-primary" @click="sendKlaim()">kirim data</button>
    <div v-if="sendSuccess" @click="sendSuccess=''" class="alert alert-success mt-4" role="alert">
      {{ sendSuccess }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      klaim: [],
      groupKlaim: {},
      isLoading: true,
      error: '',
      sendSuccess: ''
    };
  },
  methods: {
    getKlaim() {
      axios.get('http://localhost:3000/api/klaim')
        .then((res) => {
          this.klaim = res.data.data;
          this.groupByLOB(this.klaim);
          this.isLoading = false
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message
        })
    },

    sendKlaim() {
      axios.post('http://localhost:3000/api/klaim/send-to-penampungan')
        .then((res) => {
          this.sendSuccess = res.data.message
        })
        .catch((error) => {
          console.log(error.message);
        })
    },

    groupByLOB(data) {
      this.groupKlaim = data.reduce((acc, obj) => {
        const key = obj.lob;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    },

    calculateTotalNasabah(lob) {
      return this.groupKlaim[lob].reduce((acc, dataKlaim) => acc + dataKlaim.jumlah_nasabah, 0);
    },

    calculateTotalBeban(lob) {
      return this.groupKlaim[lob].reduce((acc, dataKlaim) => acc + parseFloat(dataKlaim.nilai_beban_klaim), 0).toFixed(2);
    },
  },
  mounted() {
    this.getKlaim();
  },
};
</script>
