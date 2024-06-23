<template>
    <div class="container mt-4">
        <h1>Form Input Data Klaim</h1>

        <form @submit.prevent="submitForm">
        <!-- Input untuk LOB -->
        <div class="mb-3">
            <label for="lobInput" class="form-label">LOB</label>
            <input type="text" class="form-control" id="lobInput" v-model="formData.lob" required>
        </div>

        <!-- Input untuk Penyebab Klaim -->
        <div class="mb-3">
            <label for="penyebabKlaimInput" class="form-label">Penyebab Klaim</label>
            <input type="text" class="form-control" id="penyebabKlaimInput" v-model="formData.penyebab_klaim" required>
        </div>

        <!-- Input untuk Jumlah Nasabah -->
        <div class="mb-3">
            <label for="jumlahNasabahInput" class="form-label">Jumlah Nasabah</label>
            <input type="number" class="form-control" id="jumlahNasabahInput" v-model="formData.jumlah_nasabah" required>
        </div>

        <!-- Input untuk Beban Klaim -->
        <div class="mb-3">
            <label for="bebanKlaimInput" class="form-label">Beban Klaim</label>
            <input type="number" step="0.01" class="form-control" id="bebanKlaimInput" v-model="formData.nilai_beban_klaim" required>
        </div>

        <!-- Tombol Submit -->
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FormInputKlaim',
    data() {
        return {
        formData: {
            lob: '',
            penyebab_klaim: '',
            jumlah_nasabah: 0,
            nilai_beban_klaim: 0.00,
            periode: ''
        },
        };
    },
    methods: {
        submitForm() {
        this.formData.periode = new Date().toISOString().substr(0, 10);
        axios.post('http://localhost:3000/api/klaim', this.formData)
            .then((res) => {
                console.log('Data klaim berhasil disimpan:', res.data);
                this.resetForm();
            })
            .catch((error) => {
                console.error('Error saat menyimpan data klaim:', error);
            });
        },

        resetForm() {
            this.formData = {
                lob: '',
                penyebab_klaim: '',
                jumlah_nasabah: 0,
                nilai_beban_klaim: 0.00,
                periode: ''
            };
        },
    },
};
</script>
  